export default class Roll {
  public betCount: number = 0;
  public redBetCount: number = 0;
  public blackBetCount: number = 0;
  public greenBetCount: number = 0;
  public win: number = 0;
  public lose: number = 0;
  public amount: number = 0;

  constructor(
    private _value: number,
    private _color: string,
  ) {}

  get value() {
    return this._value;
  }

  get color() {
    return this._color;
  }

  static fromJson(json: any): Roll {
    const roll = new Roll(json.value, json.color);

    roll.betCount = json.bet_count;
    roll.redBetCount = json.red_bet_count;
    roll.blackBetCount = json.black_bet_count;
    roll.greenBetCount = json.green_bet_count;
    roll.win = json.win;
    roll.lose = json.lose;
    roll.amount = json.amount;

    return roll;
  }
}
