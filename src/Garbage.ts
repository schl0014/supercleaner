import GameItem from './GameItem.js';

export default class Garbage extends GameItem {
  private score: number;

  /**
   *
   * @param xPos the initial X-position
   * @param yPos the initial Y-position
   */
  public constructor(xPos: number, yPos: number) {
    super('./assets/img/icecream.png', xPos, yPos);
    this.score = 1;
  }
}
