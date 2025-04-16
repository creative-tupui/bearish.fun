import BetButton from "./ui/BetButton";
import BetAmountSetSection from "./BetAmountSetSection";
import { useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import idl from "../idl.json"; // Assuming your IDL is in a JSON file
import type { BearishDotFun } from "../idlTypes";
import { getPlatformConfig, getRound, getUserBet } from "../utils";
import { usePoolContext } from "../contexts/PoolContext";
import avatar1 from "../assets/images/users/avatar1.png";

const BetButtonSection = () => {
  const [selectedBetAmount, setSelectedBetAmount] = useState<number>(5);
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const wallet = useAnchorWallet();
  const { updateUpPool, updateDownPool } = usePoolContext();

  const connection = new Connection(clusterApiUrl("devnet"), {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 60 * 1000,
  });
  
  const provider = new anchor.AnchorProvider(
    connection,
    wallet as anchor.Wallet,
    {}
  );
  anchor.setProvider(provider);
  const program: anchor.Program<BearishDotFun> = new anchor.Program(
    idl as unknown as BearishDotFun,
    {
      connection,
    }
  );

  console.log(Object.keys(program.account));

  const betFunction = async (betType: "up" | "down") => {
    console.log(betType, selectedBetAmount);
    try {
      if (!publicKey || !signTransaction || !signAllTransactions) {
        return;
      }

      // const platformConfig = await getPlatformConfig();
      const amount = new anchor.BN(Number(selectedBetAmount) * 1e6); // Convert to smallest unit

      const platformConfigAccount = await getPlatformConfig();
      const roundIndex =
        (
          await program.account.platformConfig.fetch(platformConfigAccount)
        ).globalRoundInfo?.round.toNumber() + 1;

      const isLong = betType == "up" ? true : false;
     
      console.log(
        ">>> platformConfigAccountAdd : ",
        platformConfigAccount.toBase58()
      );
      console.log(">>> roundIndex : ", roundIndex);
      console.log(
        ">>> round account : ",
        (await getRound(roundIndex)).toBase58()
      );
      console.log(
        ">>> userBet account : ",
        (await getUserBet(publicKey, roundIndex)).toBase58()
      );
      const instruction = await program.methods
        .placeBet(amount, isLong)
        .accounts({
          user: publicKey,
          round: await getRound(roundIndex),
          userBet: await getUserBet(publicKey, roundIndex),
        })
        .instruction();

      const tx = new VersionedTransaction(
        new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
          instructions: [instruction],
        }).compileToV0Message()
      );

      const signedTx = await signTransaction(tx);
      const txHash = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txHash);
      if (isLong) {
        updateUpPool(selectedBetAmount, avatar1);
      } else {
        updateDownPool(selectedBetAmount, avatar1);
      }
      console.log(`Transaction successful: ${txHash}`);

      // Assuming you have a way to determine the bet amount and new investor
    
     
    } catch (err) {
      console.error("Place Bet failed", err);
    }
  };

  return (
    <>
      <BetAmountSetSection setSelectedBetAmount={setSelectedBetAmount} />
      <div className="flex gap-2">
        <BetButton betType="up" betFunction={() => betFunction("up")} />
        <BetButton betType="down" betFunction={() => betFunction("down")} />
      </div>
    </>
  );
};

export default BetButtonSection;
