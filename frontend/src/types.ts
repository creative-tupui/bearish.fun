export interface User {
  rank: number,
  username: string,
  avatar: string,
  bets: number,
  wins: number,
  winRate: number,
  topSteak: number,
  roi: number,
  netProfit: number,
  depositedAmount: number,
  walletAddress: string,
}

export interface JackpotUser {
  id: number,
  reward: number,
  investors: Array<{ avatar: string }>,
}