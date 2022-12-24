export default class Bet {
  constructor(
    private _value: number,
    private _color: string,
    private _user: string,
    private _created_at?: Date,
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

  get created_at() {
    return this._created_at;
  }
}
