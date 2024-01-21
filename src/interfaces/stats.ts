interface BetStats {
  count: number;
  amount: number;
}

interface ColorStats {
  bet: BetStats;
  won: BetStats;
}

interface OverallStats {
  count: number;
  amount: number;
}

export default interface Stats {
  red: ColorStats;
  black: ColorStats;
  green: ColorStats;
  bet: OverallStats;
  won: OverallStats;
}
