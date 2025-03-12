// utils.ts
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const USER_STATE_SEED = "USER-STATE-SEED";
const GLOBAL_STATE_SEED = "GLOBAL-STATE-SEED";
const PROGRAM_ID = new PublicKey("Cjc3RL6hzMzK77HsNyr9z6VTpejWYWaGnk9qcGbkLVE");

const usdt_address = "EYbjsWiZyfKCuq9VJh6qL9UJ4KPhoLaxUq5aafTw68Q5";

export const getUserUsdtAccount = async (wallet: PublicKey) => {
  return await getAssociatedTokenAddress(new PublicKey(usdt_address), wallet);
};

export const getUsdtAta = async (wallet: PublicKey) => {
  return await getAssociatedTokenAddress(new PublicKey(usdt_address), wallet, true);
};

export const getUserStateKey = async (user: PublicKey) => {
  const [userStateKey] = await PublicKey.findProgramAddress(
    [Buffer.from(USER_STATE_SEED), user.toBuffer()],
    PROGRAM_ID
  );
  return userStateKey;
};

export const getGlobalStateKey = async () => {
  const [globalState] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_STATE_SEED)],
    PROGRAM_ID
  );
  return globalState;
};