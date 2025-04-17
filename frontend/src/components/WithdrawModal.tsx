import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import {
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { usdt_address } from "../config";
import idl from "../idl.json"; // Assuming your IDL is in a JSON file
import { getUserUsdtAccount } from "../utils";
import { BearishDotFun } from "../idlTypes";
import { usePoolContext } from "../contexts/PoolContext";

const WithdrawModal = ({ callback, setOpen }: Props) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [_loading, setLoading] = useState<boolean>(false);
  const [_error, setError] = useState<string | null>(null);
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const wallet = useAnchorWallet();
  const { setDemoUsers } = usePoolContext();

  const handleCancel = () => {
    setOpen(false);
  };

  const handlewithdraw = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!publicKey || !signTransaction || !signAllTransactions) {
        setError("Wallet not fully connected");
        setLoading(false);
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
      const program = new anchor.Program(idl as unknown as BearishDotFun, {
        connection,
      });

      const usdtAmount = new anchor.BN(Number(withdrawAmount) * 1e6); // Convert to smallest unit

      const instruction = await program.methods
        .withdraw(usdtAmount)
        .accounts({
          user: publicKey,
          stablecoin: new PublicKey(usdt_address),
          userTokenAccount: await getUserUsdtAccount(publicKey),
          tokenProgram: TOKEN_PROGRAM_ID,
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

      // Update the first user's depositedAmount after successful withdrawal
      setDemoUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        if (updatedUsers.length > 0) {
          updatedUsers[0] = {
            ...updatedUsers[0],
            depositedAmount: updatedUsers[0].depositedAmount - Number(withdrawAmount)
          };
        }
        return updatedUsers;
      });

      console.log(`Transaction successful: ${txHash}`);
      setOpen(false);
      callback(
        true,
        Number(withdrawAmount),
        `https://explorer.solana.com/tx/${txHash}?cluster=devnet`
      );
    } catch (err) {
      console.error("Withdraw failed", err);
      setError("Withdraw failed. Please try again.");
      callback(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Withdraw" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-base text-gray-secondary">
            <div>
              <p>Withdraw amount</p>
            </div>
            <div className="flex gap-2">
              <p>$ 15</p>
              <p className="font-bold text-accent">Max</p>
            </div>
          </div>
          <div className="flex justify-between items-center border border-gray-tertiary rounded-lg p-2 text-base">
            <div className="flex items-center gap-2 text-gray-secondary">
              <p>$</p>
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full"
              />
            </div>
            <p className="text-gray-tertiary">USDC</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Balance</p>
          <div className="flex items-center gap-2 text-gray-secondary">
            <p>$ 14.29</p>
            <img src="/src/assets/icons/arrow-right.png" alt="" className="" />
            <p>$ 0.15</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            title="Cancel"
            style="dark"
            className="py-4"
            onClick={handleCancel}
          />
          <Button
            title="Withdraw"
            style="accent"
            className="py-4"
            onClick={handlewithdraw}
          />
        </div>
      </div>
    </Modal>
  );
};

interface Props {
  callback: (
    result: boolean,
    withdrawedAmount?: number,
    transactionLink?: string
  ) => void;
  setOpen: (open: boolean) => void;
}

export default WithdrawModal;
