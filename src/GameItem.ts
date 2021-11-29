import Game from './Game.js';

export default abstract class GameItem {
  protected img: HTMLImageElement;

  protected xPos: number;

  protected yPos: number;

  /**
   * Creates a new instance
   *
   * @param imageSrc the src of the image
   * @param xPos the initial X-position
   * @param yPos the initial Y-position
   */
  public constructor(imageSrc: string, xPos: number, yPos: number) {
    this.img = Game.loadNewImage(imageSrc);
    this.xPos = xPos;
    this.yPos = yPos;
  }

  /**
   * getImageHeight
   *
   * @returns the current height of the image.
   */
  public getImageHeight(): number {
    return this.img.height;
  }

  /**
   * getImageWidth
   *
   * @returns the current width of the image.
   */
  public getImageWidth(): number {
    return this.img.width;
  }

  /**
   * getXPos
   *
   * @returns the current X-position
   */
  public getXPos(): number {
    return this.xPos;
  }

  /**
   * getYPos
   *
   * @returns the current Y-position
   */
  public getYPos(): number {
    return this.yPos;
  }

  /**
   * draw
   *
   * @param ctx the rendering context to draw on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.img, this.xPos, this.yPos);
  }
}
