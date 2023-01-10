import type Roll from "@/models/roll";

export default class Bet {
  constructor(
    private _value: number,
    private _color: string,
    private _user: string,
    private _createdAt?: Date,
    private _isWin?: boolean,
    private _roll?: Roll
  ) {}

  get value() {
    return this._value;
  }

  get color() {
    return this._color;
  }

  get user() {
    return this._user;
  }

  get createdAt() {
    return this._createdAt;
  }

  get isWin() {
    return this._isWin;
  }

  get roll() {
    return this._roll;
  }

  static fromJson(json: any): Bet {
    const roll = json.roll;
    roll.betCount = json.roll.bet_count;
    roll.redBetCount = json.roll.red_bet_count;
    roll.blackBetCount = json.roll.black_bet_count;
    roll.greenBetCount = json.roll.green_bet_count;

    return new Bet(
      json.value,
      json.color,
      json.user,
      json.created_at ? new Date(json.created_at) : undefined,
      json.is_win,
      roll,
    );
  }
}
