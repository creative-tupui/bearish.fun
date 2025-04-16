import { useState, useEffect } from "react";
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
import { useWalletBalanceContext } from "../contexts/WalletBalanceContext";

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { usdt_address } from "../config";
import idl from "../idl.json"; // Assuming your IDL is in a JSON file
import type { BearishDotFun } from "../idlTypes";

import {
  getUserUsdtAccount,
} from "../utils";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { usePoolContext } from "../contexts/PoolContext";

const DepositModal = ({
  callback,
  setOpen,
  insufficientBalance = false,
}: Props) => {
  const [depositAmount, setDepositAmount] = useState<string>("100");
  const [insufficientWalletBalance, _setInsufficientWalletBalance] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { walletBalance, refreshBalance } = useWalletBalanceContext();

  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const wallet = useAnchorWallet();
  const { setDemoUsers } = usePoolContext();

  useEffect(() => {
    refreshBalance();
  }, [publicKey]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeposit = async () => {
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
      const program = new anchor.Program(idl as unknown as BearishDotFun, { connection });

      // const platformConfig = await getPlatformConfig();
      const usdtAmount = new anchor.BN(Number(depositAmount) * 1e6); // Convert to smallest unit

      const instruction = await program.methods
        .deposit(usdtAmount)
        .accounts({
          user: publicKey,
          // globalState: globalState,
          stablecoin: new PublicKey(usdt_address),
          userTokenAccount: await getUserUsdtAccount(publicKey),
          // usdtAta: await getUsdtAta(globalState),
          // userState: await getUserStateKey(publicKey),
          // associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          // systemProgram: SystemProgram.programId,
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

      // Update the first user's depositedAmount after successful deposit
      setDemoUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        if (updatedUsers.length > 0) {
          updatedUsers[0] = {
            ...updatedUsers[0],
            depositedAmount: updatedUsers[0].depositedAmount + Number(depositAmount)
          };
        }
        return updatedUsers;
      });

      console.log(`Transaction successful: ${txHash}`);
      setOpen(false);
      callback(
        true,
        Number(depositAmount),
        `https://explorer.solana.com/tx/${txHash}?cluster=devnet`
      );
    } catch (err) {
      console.error("Deposit failed", err);
      setError("Deposit failed. Please try again.");
      callback(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Deposit" onClose={() => setOpen(false)}>
      <div className="flex flex-col gap-6">
        {insufficientBalance && (
          <p className="text-base leading-tight text-negative-light">
            You don't have enough funds in your balance to place this bet.
            Deposit more or reduce your bet to continue.
          </p>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-base leading-tight text-gray-secondary">
            <div>
              <p>Deposit amount</p>
            </div>
            <div className="flex gap-2">
              <p>${(walletBalance*100).toFixed(2)}</p>
              <p className="font-bold text-accent">Max</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={`flex justify-between items-center border ${
                insufficientWalletBalance
                  ? "border-negative-light"
                  : "border-gray-tertiary"
              } rounded-lg p-2 text-base leading-tight`}
            >
              <div className="flex items-center gap-2 text-gray-secondary">
                <p>$</p>
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full"
                />
              </div>
              <p className="text-gray-tertiary">USDC</p>
            </div>
            {insufficientWalletBalance && (
              <p className="text-xs text-negative-light text-left">
                Not enough funds in your connected wallet.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center text-base leading-tight">
          <p>Balance</p>
          <div className="flex items-center gap-2 text-gray-secondary">
            <p>$ 0.15</p>
            <img src="/src/assets/icons/arrow-right.png" alt="" className="" />
            <p>$ 14.29</p>
          </div>
        </div>
        {loading && (
          <p className="text-base text-accent">Processing transaction...</p>
        )}
        {error && <p className="text-base text-negative-light">{error}</p>}
        <div className="flex gap-4">
          <Button
            title="Cancel"
            style="dark"
            className="py-4"
            onClick={handleCancel}
          />
          <Button
            title="Deposit"
            style="accent"
            className="py-4"
            disable={insufficientWalletBalance || loading}
            onClick={handleDeposit}
          />
        </div>
        <div className="flex justify-between text-xs font-semibold">
          <p className="text-gray-secondary">Don't have USDC on Solana?</p>
          <p className="text-accent">Swap or bridge here</p>
        </div>
      </div>
    </Modal>
  );
};

interface Props {
  callback: (
    result: boolean,
    depositedAmount?: number,
    transactionLink?: string
  ) => void;
  setOpen: (open: boolean) => void;
  insufficientBalance?: boolean;
}

export default DepositModal;
