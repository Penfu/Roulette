export default interface Roll {
  id: number;
  betCount: number;
  redBetCount: number;
  blackBetCount: number;
  greenBetCount: number;
  value: number;
  color: string;
  win: number;
  lose: number;
  amount: number;
}
