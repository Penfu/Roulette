import Roll from "@/models/roll";
import axios from "axios";

export default class RollProvider {
  public static async fetchRollFromBet(bet: number) : Promise<Roll> {
    const roll = (await axios.get(`http://localhost:8000/api/bets/${bet}/roll`)).data;
    return Roll.fromJson(roll);
  }

  public static async fetchRolls(max: number = 10) {
    const rolls = (await axios.get("http://localhost:8000/api/rolls")).data;
    return rolls.map((roll: any) => Roll.fromJson(roll));
  }
}
