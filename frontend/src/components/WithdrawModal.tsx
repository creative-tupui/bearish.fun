import { useState } from "react";
import Modal from "./ui/Modal"
import Button from "./ui/Button";
import { Connection, PublicKey, clusterApiUrl, SystemProgram, VersionedTransaction, TransactionMessage } from "@solana/web3.js";
import { AnchorProvider, Program, BN, Idl } from '@project-serum/anchor';
import { getAssociatedTokenAddress, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from '@solana/wallet-adapter-react';
import { PROGRAM_ID, usdt_address } from '../config';
import IDL from '../idl.json'; // Assuming your IDL is in a JSON file
import { getGlobalStateKey, getUserUsdtAccount, getUsdtAta, getUserStateKey } from '../utils';


const WithdrawModal = ({ callback, setOpen }: Props) => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey, signTransaction, signAllTransactions } = useWallet();

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

      const provider = new AnchorProvider(
        connection,
        { publicKey, signTransaction, signAllTransactions },
        AnchorProvider.defaultOptions()
      );
      const program = new Program(IDL as Idl, PROGRAM_ID, provider);

      const globalState = await getGlobalStateKey();
      const usdtAmount = new BN(Number(withdrawAmount) * 1e6); // Convert to smallest unit

      const instruction = await program.methods
        .withdrawUsdt(usdtAmount)
        .accounts({
          admin: publicKey,
          globalState: globalState,
          usdtAddress: new PublicKey(usdt_address),
          adminUsdtAta: await getUserUsdtAccount(publicKey),
          usdtAta: await getUsdtAta(globalState),
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId
        }).instruction();

      const tx = new VersionedTransaction(
        new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
          instructions: [instruction]
        }).compileToV0Message()
      );

      const signedTx = await signTransaction(tx);
      const txHash = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txHash);

      console.log(`Transaction successful: ${txHash}`);
      setOpen(false);
      callback(true, Number(withdrawAmount), `https://explorer.solana.com/tx/${txHash}?cluster=devnet`);
    } catch (err) {
      console.error('Withdraw failed', err);
      setError('Withdraw failed. Please try again.');
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
            <div><p>Withdraw amount</p></div>
            <div className="flex gap-2">
              <p>$ 14.14</p>
              <p className="font-bold text-accent">Max</p>
            </div>
          </div>
          <div className="flex justify-between items-center border border-gray-tertiary rounded-lg p-2 text-base">
            <div className="flex items-center gap-2 text-gray-secondary">
              <p>$</p>
              <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full" />
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
          <Button title="Cancel" style="dark" className="py-4" onClick={handleCancel} />
          <Button title="Withdraw" style="accent" className="py-4" onClick={handlewithdraw} />
        </div>
      </div>
    </Modal>
  )
}

interface Props {
  callback: (result: boolean, withdrawedAmount?: number, transactionLink?: string) => void;
  setOpen: (open: boolean) => void
}

export default WithdrawModal