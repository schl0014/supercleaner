import GameItem from './GameItem.js';

export default class Garbage extends GameItem {
  private score: number;

  /**
   *
   * @param maxX the max value of the X position
   * @param maxY the max value of the X position
   */
  public constructor(maxX: number, maxY: number) {
    super('./assets/img/icecream.png', maxX - 32, maxY - 32);
    this.score = 1;
  }

  /**
   * getScore
   *
   * @returns the score
   */
  public getScore(): number {
    return this.score;
  }
}
