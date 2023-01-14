import User from "@/models/user";
import axios from "axios";

export default class RollProvider {
  public static async fetchUser(name: string) {
    const user = (await axios.get(`http://localhost:8000/api/users/${name}`)).data;
    return User.fromJson(user);
  }
}
