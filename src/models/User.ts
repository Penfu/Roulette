import axios from "axios";
import type Bet from "./Bet";

export default class User {
  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _balance: number,
    private _created_at: Date,
    private _updated_at: Date,
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

  get created_at() {
    return this._created_at;
  }

  get updated_at() {
    return this._updated_at;
  }

  async getBets(): Promise<Bet[]> {
    return (await axios.get(`http://localhost:8000/api/users/${this.name}/bets`)).data;
  }

  static async fromName(name: string) {
    return await axios.get(`http://localhost:8000/api/users/${name}`)
      .then((response) => User.fromJSON(response.data));
  }

  static fromJSON(json: any): User {
    return new User(
      json.id,
      json.name,
      json.email,
      json.balance,
      new Date(json.created_at),
      new Date(json.updated_at),
    );
  }
}
