import type Roll from "@/models/roll";
import RollProvider from "@/providers/roll";

export default class Bet {
  constructor(
    private _id: number,
    private _value: number,
    private _color: string,
    private _user: string,
    private _createdAt?: Date,
    private _isWin?: boolean,
    private _roll?: Roll
  ) {}

  get value(): number {
    return this._value;
  }

  get color(): string {
    return this._color;
  }

  get user(): string {
    return this._user;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get formattedCreatedAt(): string {
    return (
      this._createdAt?.toLocaleString("fr-CH", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }) || ""
    );
  }

  get isWin(): boolean | undefined {
    return this._isWin;
  }

  public async roll(): Promise<Roll> {
    if (!this._roll) {
      this._roll = await RollProvider.fetchRollFromBet(this._id);
    }

    return this._roll;
  }

  static fromJson(json: any): Bet {
    return new Bet(
      json.id,
      json.value,
      json.color,
      json.user,
      json.created_at ? new Date(json.created_at) : undefined,
      json.is_win
    );
  }
}
