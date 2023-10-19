import type Roll from "@/interfaces/roll";

export default class Bet {
  public id: number = 0;

  constructor(
    private _color: string,
    private _amount: number,
    private _user: string,
    private _createdAt?: Date,
    private _isWin?: boolean,
    private _roll?: Roll
  ) {}

  get color(): string {
    return this._color;
  }

  get amount(): number {
    return this._amount;
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
      this._roll = await RollProvider.fetchRollFromBet(this.id);
    }

    return this._roll;
  }

  static fromJson(json: any): Bet {
    const bet = new Bet(
      json.color,
      json.amount,
      json.user,
      json.created_at ? new Date(json.created_at) : undefined,
      json.is_win
    );

    bet.id = json.id;

    return bet;
  }
}
