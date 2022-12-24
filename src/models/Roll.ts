export default class Roll {
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
}


