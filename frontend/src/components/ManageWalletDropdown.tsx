import * as anchor from "@coral-xyz/anchor";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import Button from "./ui/Button";
import { useModalOpenContext } from "../contexts/ModalOpenContext";
import { useWalletBalanceContext } from "../contexts/WalletBalanceContext";
import { useState } from "react";
import {
  clusterApiUrl,
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import idl from "../idl.json"; // Assuming your IDL is in a JSON file
import { BearishDotFun } from "../idlTypes";
import { getPlatformConfig, getRound, getUserBet } from "../utils";

const ManageWalletDropdown = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const wallet = useAnchorWallet();

  const connectedWallet = publicKey?.toBase58();
  const {
    setIsManageWalletDropdownVisible,
    setDepositModalVisible,
    setWithdrawModalVisible,
  } = useModalOpenContext();
  const { walletBalance } = useWalletBalanceContext();
  const [claimableAmount, setClaimableAmount] = useState(0);

  const handleDeposit = () => {
    setIsManageWalletDropdownVisible(false);
    setDepositModalVisible(true);
  };

  const handleWithdraw = () => {
    setIsManageWalletDropdownVisible(false);
    setWithdrawModalVisible(true);
  };

  const handleClaim = async () => {
    console.log("Claiming amount:", claimableAmount);
    setClaimableAmount(0);

    try {
      if (!publicKey || !signTransaction || !signAllTransactions) {
        return;
      }

      const connection = new Connection(clusterApiUrl("devnet"), {
        commitment: "confirmed",
        confirmTransactionInitialTimeout: 60 * 1000,
      });
      console.log(connection);

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

      // const usdtAmount = new anchor.BN(Number(claimableAmount) * 1e6); // Convert to smallest unit
      const platformConfigAccount = await getPlatformConfig();
      console.log(
        ">>> platformConfigAccountAdd : ",
        platformConfigAccount.toBase58()
      );
      const roundIndex =
        (
          await program.account.platformConfig.fetch(platformConfigAccount)
        ).globalRoundInfo?.round.toNumber() - 1;

      const instruction = await program.methods
        .claimUserWinnings(new anchor.BN(roundIndex))
        .accounts({
          user: publicKey,
          round: await getRound(roundIndex + 1),
          userBet: await getUserBet(publicKey, roundIndex + 1),
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

      // txSignature = program.methods
      //   .claimAffiliateWinnings(new anchor.BN(roundIndex))
      //   .accounts({
      //     user: backendWallet.publicKey,
      //     affiliate: affiliate.publicKey,
      //     stablecoin,
      //     round: await getRound(program, roundIndex + 1),
      //     userBet: await getUserBet(program, backendWallet.publicKey, roundIndex + 1),
      //     affiliateTokenAccount: (
      //       await spl.getOrCreateAssociatedTokenAccount(
      //         provider.connection,
      //         affiliate,
      //         stablecoin,
      //         affiliate.publicKey
      //       )
      //     ).address,
      //     tokenProgram: tokenProgramId,
      //   })
      //   .signers([backendWallet.payer])
      //   .rpc();
      // console.log("claimAffiliateWinnings txSignature : ", txSignature);

      console.log(`Transaction successful: ${txHash}`);
    } catch (err) {
      console.error("claimUserWinnings failed", err);
    } finally {
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-[431px] bg-card-primary z-20 rounded-lg p-4 border border-card-stroke">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-primary">
              Manage Wallet
            </p>
            <img
              src="/src/assets/icons/power-off.png"
              alt=""
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsManageWalletDropdownVisible(false)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center bg-card-secondary rounded-lg p-3 text-gray-secondary text-base">
              <p className="">Connected Wallet</p>
              <div className="flex items-center gap-2">
                {connectedWallet && (
                  <p>{`${connectedWallet.substring(
                    0,
                    4
                  )}...${connectedWallet.substring(
                    connectedWallet.length - 4
                  )}`}</p>
                )}
                <img
                  src="/src/assets/icons/copy.png"
                  alt=""
                  className="w-4 h-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-card-secondary rounded-lg p-3">
              <div className="flex justify-between items-center text-gray-secondary text-base">
                <p>Balance</p>
                <p>${(walletBalance*100).toFixed(2)}</p>
              </div>
              {/* <div className="flex justify-between items-center text-gray-secondary text-base">
                <p>Claimable Amount</p>
                <p>${claimableAmount.toFixed(2)}</p>
              </div> */}
              <div className="flex gap-2">
                {/* <Button title="Claim" style="accent" onClick={handleClaim} /> */}
                <Button
                  title="Withdraw"
                  style="dark"
                  onClick={handleWithdraw}
                />
                <Button
                  title="Deposit"
                  style="accent"
                  onClick={handleDeposit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-bg bg-opacity-50 z-10"></div>
    </>
  );
};

export default ManageWalletDropdown;
