import type Roll from "./roll";

export default interface Bet {
  id?: number;
  color: string;
  amount: number;
  user: string;
  createdAt?: Date;
  isWin?: boolean;
  roll?: Roll;
};
