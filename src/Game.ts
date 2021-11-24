import KeyListener from './KeyboardListener.js';

export default class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboard: KeyListener;

  // Garbage items (the player needs to pick these up)
  private garbageItems: any[]; // TODO switch to correct type

  // Player
  private player: any; // TODO switch to correct type

  // Amount of frames until the next item
  private countUntilNextItem: number;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.keyboard = new KeyListener();

    this.garbageItems = [];

    // Create garbage items
    for (let i = 0; i < Game.randomNumber(3, 10); i++) {
      this.garbageItems.push({
        img: Game.loadNewImage('./assets/img/icecream.png'),
        xPos: Game.randomNumber(0, this.canvas.width - 32),
        yPos: Game.randomNumber(0, this.canvas.height - 32),
      });
    }

    // Create player
    this.player = {
      img: Game.loadNewImage('./assets/img/character_robot_walk0.png'),
      xPos: Game.randomNumber(0, this.canvas.width - 76),
      xVel: 3,
      yPos: Game.randomNumber(0, this.canvas.height - 92),
      yVel: 3,
    };

    // Take about 5 seconds on a decent computer to show next item
    this.countUntilNextItem = 300;

    // Start the game cycle
    this.loop();
  }

  /**
   * Game cycle, basically loop that keeps the game running. It contains all
   * the logic needed to draw the individual frames.
   */
  private loop = () => {
    // Clear the screen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Move the player
    this.movePlayer();

    // Draw everything
    this.draw();

    // Player cleans up garbage
    if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
      this.cleanUpGarbage();
    }

    // Show score
    // TODO: fix actual score system
    this.writeTextToCanvas('Score: 0', 36, 120, 50);

    // Create new items if necessary
    if (this.countUntilNextItem === 0) {
      const choice = Game.randomNumber(0, 10);

      if (choice < 5) {
        this.garbageItems.push({
          img: Game.loadNewImage('./assets/img/icecream.png'),
          xPos: Game.randomNumber(0, this.canvas.width - 32),
          yPos: Game.randomNumber(0, this.canvas.height - 32),
        });
      }

      // Reset the timer with a count between 2 and 4 seconds on a
      // decent computer
      this.countUntilNextItem = Game.randomNumber(120, 240);
    }

    // Lower the count until the next item with 1
    this.countUntilNextItem -= 1;

    // Make sure the game actually loops
    requestAnimationFrame(this.loop);
  };

  /**
   * Draw all the necessary items to the screen
   */
  private draw() {
    this.garbageItems.forEach((element) => {
      this.ctx.drawImage(element.img, element.xPos, element.yPos);
    });
    this.ctx.drawImage(this.player.img, this.player.xPos, this.player.yPos);
  }

  /**
   * Moves the player depending on which arrow key is pressed. Player is bound
   * to the canvas and cannot move outside of it
   */
  private movePlayer() {
    // Moving right
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
      && this.player.xPos + this.player.img.width < this.canvas.width
    ) {
      this.player.xPos += this.player.xVel;
    }

    // Moving left
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
      && this.player.xPos > 0
    ) {
      this.player.xPos -= this.player.xVel;
    }

    // Moving up
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_UP)
      && this.player.yPos > 0
    ) {
      this.player.yPos -= this.player.yVel;
    }

    // Moving down
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
      && this.player.yPos + this.player.img.height < this.canvas.height
    ) {
      this.player.yPos += this.player.yVel;
    }
  }

  /**
   * Removes garbage items from the game based on box collision detection.
   *
   * Read for more info about filter function: https://alligator.io/js/filter-array-method/
   */
  private cleanUpGarbage() {
    // create a new array with garbage item that are still on the screen
    // (filter the clicked garbage item out of the array garbage items)
    this.garbageItems = this.garbageItems.filter((element) => {
      // check if the player is over (collided with) the garbage item.
      if (
        this.player.xPos < element.xPos + element.img.width
        && this.player.xPos + this.player.img.width > element.xPos
        && this.player.yPos < element.yPos + element.img.height
        && this.player.yPos + this.player.img.height > element.yPos
      ) {
        // Do not include this item.
        return false;
      }
      return true;
    });
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param fontSize - Font size in pixels
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param alignment - Where to align the text
   * @param color - The color of the text
   */
  private writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'white',
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  private static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Returns a random number between min and max
   *
   * @param min - lower boundary
   * @param max - upper boundary
   * @returns a random number between min and max
   */
  private static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
