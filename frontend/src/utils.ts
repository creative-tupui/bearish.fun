// utils.ts
import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";

const PLATFORM_CONFIG = "platform_config";
const PLATFORM_VAULT = "platform_vault";
const USER = "user";
const ROUND = "round";
const USER_BET = "user_bet";

const PROGRAM_ID = new PublicKey("FVkDSzbkhPjoB6Jxe5aFx6ExAZq8RzBRVVSebmqRg9Py");

const usdt_address = "7JgcbkD1DnWm2xAvy6SSUqpVt3u2eC9vtNXEAVBFWnjV"; // mock usdt (stable coin)

export const getUserUsdtAccount = async (wallet: PublicKey) => {
  return await getAssociatedTokenAddress(new PublicKey(usdt_address), wallet);
};

export const getUsdtAta = async (wallet: PublicKey) => {
  return await getAssociatedTokenAddress(new PublicKey(usdt_address), wallet, true);
};

export const getPlatformConfig = async () => {
  const [platformConfig] = await PublicKey.findProgramAddress(
    [Buffer.from(PLATFORM_CONFIG)],
    PROGRAM_ID
  );
  return platformConfig;
};

export const getPlatformVault = async () => {
  const [platformVault] = await PublicKey.findProgramAddress(
    [Buffer.from(PLATFORM_VAULT)],
    PROGRAM_ID
  );
  return platformVault;
};

export const getUserInfo = async (userKey: PublicKey) => {
  const [userInfo] = await PublicKey.findProgramAddress(
    [Buffer.from(USER), userKey.toBuffer()],
    PROGRAM_ID
  );
  return userInfo;
};

export const getRound = async (roundIndex: number) => {
  return await PublicKey.findProgramAddressSync(
    [Buffer.from(ROUND), new anchor.BN(roundIndex).toArrayLike(Buffer, "be", 8)],
    PROGRAM_ID
  )[0];
};

export const getUserBet = async (
  user: anchor.web3.PublicKey,
  roundIndex: number,
) => {
  return anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from(USER_BET),
      user.toBuffer(),
      new anchor.BN(roundIndex).toArrayLike(Buffer, "be", 8),
    ],
    PROGRAM_ID
  )[0];
}