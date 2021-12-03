import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';

export default class Player extends GameItem {
  private xVelocity: number;

  private yVelocity: number;

  private keyboard: KeyListener;

  /**
   * @param maxX
   * @param maxY
   */
  public constructor(maxX: number, maxY: number) {
    super('./assers/img/character_robot_walk0.png', maxX - 72, maxY - 96);
    this.keyboard = new KeyListener();
    this.xVelocity = 5;
    this.yVelocity = 5;
  }

  /**
   *
   */
  public isCleaning(): boolean {
    return this.keyboard.isKeyDown(KeyListener.KEY_SPACE);
  }

  /**
   * @param other
   */
  public collidesWith(other: GameItem): boolean {
    return this.xPos < this.xPos + this.img.width

      && this.xPos + this.img.width > this.xPos
      && this.yPos < this.yPos + this.img.height
      && this.yPos + this.img.height > this.yPos;
  }




  /**
   * @param canvas
   */
  public move(canvas: HTMLCanvasElement): void {
    // Moving right
    if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
      && this.xPos + this.img.width < canvas.width
      || this.keyboard.isKeyDown(KeyListener.KEY_D)
      && this.xPos + this.img.width < canvas.width) {
      this.xPos += this.xVelocity;
    }

    // Moving left
    if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
    && this.xPos > 0 || this.keyboard.isKeyDown(KeyListener.KEY_A)
      && this.xPos > 0) {
      this.xPos -= this.xVelocity;
    }
    // Moving up
    if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
      && this.yPos > 0 || this.keyboard.isKeyDown(KeyListener.KEY_W)
      && this.yPos > 0) {
      this.yPos -= this.yVelocity;
    }
    // Moving down
    if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
      && this.yPos + this.img.height < canvas.height
      || this.keyboard.isKeyDown(KeyListener.KEY_S)
      && this.yPos + this.img.height < canvas.height) {
      this.yPos += this.yVelocity;
    }
  }
}
