import GameItem from './GameItem.js';

export default class Garbage extends GameItem {
  private score: number;

  public constructor(maxX: number, maxY: number) {
    super('./assets/img/icecream.png', maxX - 32, maxY - 32);
    this.score = 1;
  }

  public getScore(): number {
    return this.score;
  }
}
