import axios from "axios";
import Bet from "@/models/bet";

export default class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _balance: number,
    private _created_at: Date,
    private _updated_at: Date
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get balance() {
    return this._balance;
  }

  get createdAt() {
    return this._created_at;
  }

  get formatedCreatedAt() {
    return this._created_at.toLocaleString("fr-CH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  get updatedAt() {
    return this._updated_at;
  }

  async fetchStats() {
    const stats = (await axios.get(`http://localhost:8000/api/users/${this.name}/stats`)).data;
    return stats;
  }

  async fetchBets(offset = 0, limit = 10): Promise<Bet[]> {
    const bets = (
      await axios.get(
        `http://localhost:8000/api/users/${this.name}/bets?offset=${offset}&limit=${limit}`
      )
    ).data;
    return bets.map((bet: JSON) => Bet.fromJson(bet));
  }

  static fromJson(json: any): User {
    return new User(
      json.id,
      json.name,
      json.email,
      json.balance,
      new Date(json.created_at),
      new Date(json.updated_at)
    );
  }
}
