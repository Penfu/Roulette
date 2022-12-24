import axios from "axios";

export default class RollProvider {
  public static async getRolls(max: number = 10) {
    return (await axios.get("http://localhost:8000/api/rolls")).data;
  }
}
