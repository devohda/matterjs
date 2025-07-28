export class Random {
  private seed = 0;
  private _seededRandom = () => {
    // https://en.wikipedia.org/wiki/Linear_congruential_generator
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  };

  constructor() {
    this.seed = this.setSeedRandom();
  }

  private setSeedRandom = () => {
    return Math.random();
  };

  public getRandomInt = (min: number, max: number) => {
    return Math.floor(min + this._seededRandom() * (max - min));
  };

  public getRandFloat = (min: number, max: number) => {
    return min + this._seededRandom() * (max - min);
  };
}
