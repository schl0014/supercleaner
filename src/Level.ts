import Game from './Game.js';
import Scene from './Scene.js';
import Garbage from './Garbage.js';
import Player from './Player.js';

export default class Level extends Scene {
  // Garbage items (the player needs to pick these up)
  private garbageItems: Garbage[];

  // Player
  private player: Player;

  // Amount of frames until the next item
  private countUntilNextItem: number;

  /**
   * Creates a new instance of this class
   *
   * @param game the game object where this scene will be a part of
   */
  public constructor(game: Game) {
    super(game);
    this.garbageItems = [];

    // Create garbage items
    for (let i = 0; i < Game.randomNumber(3, 10); i++) {
      this.garbageItems.push(this.createGarbage());
    }

    // Create player
    this.player = new Player(this.game.canvas.width, this.game.canvas.height);

    // Take about 5 seconds on a decent computer to show next item
    this.countUntilNextItem = 300;
  }

  private createGarbage(): Garbage {
    return new Garbage(this.game.canvas.width, this.game.canvas.height);
  }

  /**
   * Removes garbage items from the game based on box collision detection.
   *
   * Read for more info about filter function: https://alligator.io/js/filter-array-method/
   */
  private cleanUpGarbage() {
    // create a new array with garbage item that are still on the screen
    // (filter the clicked garbage item out of the array garbage items)
    this.garbageItems = this.garbageItems.filter(
      (element) => {
        const collides = this.player.collidesWith(element);
        if (collides) {
          this.game.user.addScore(element.getScore());
        }
        return !collides;
      },
    );
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move the player
    this.player.move(this.game.canvas);
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order). The return value of this method determines what the `GameLoop`
   * that is animating this object will do next. If `null` is returned, the
   * GameLoop will render this scene and proceeds to the next animation frame.
   * If this methods returns a `Scene` (subclass) object, it will NOT render this
   * scene but will start considering that object as the current scene to animate.
   * In other words, by returning a Scene object, you can set the next scene to
   * animate.
   *
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns a new `Scene` object if the game should start animating that scene
   *   on the next animation frame. If the game should just continue with the
   *   current scene, just return `null`
   */
  public update(elapsed: number): Scene {
    // Player cleans up garbage
    if (this.player.isCleaning()) {
      this.cleanUpGarbage();
    }
    // Create new items if necessary
    if (this.countUntilNextItem <= 0) {
      const choice = Game.randomNumber(0, 10);

      if (choice < 5) {
        this.garbageItems.push(this.createGarbage());
      }

      // Reset the timer with a count between 2 and 4 seconds on a
      // decent computer
      this.countUntilNextItem = Game.randomNumber(120, 240);
    }

    // Lower the count until the next item with 1
    this.countUntilNextItem -= elapsed;

    return null;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Clear the screen
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // Show score
    const score = `Score: ${this.game.user.getScore()}`;
    this.game.writeTextToCanvas(score, 36, 120, 50);

    this.garbageItems.forEach((element) => {
      element.draw(this.game.ctx);
    });
    this.player.draw(this.game.ctx);
  }
}
