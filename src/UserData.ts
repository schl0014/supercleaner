export default class UserData {
  private name: string;

  private score: number;

  private level: number;

  /**
   * construct a new instance of this class
   */
  public constructor() {
    this.name = 'Player 1';
    this.score = 0;
    this.level = 1;
  }

  /**
   * get the name
   *
   * @returns the name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * set the name
   *
   * @param name name of the player
   */
  public setName(name: string):void {
    this.name = name;
  }

  /**
   * get the score
   *
   * @returns the score
   */
  public getScore() :number {
    return this.score;
  }

  /**
   * add score
   *
   * @param points points+1;
   */
  public addScore(points: number):void {
    this.score += points;
  }

  /**
   *get the level
   *
   * @returns the level
   */
  public getLevel(): number {
    return this.level;
  }

  /**
   *
   */
  public increaseLevel(): void {
    this.level += 1;
  }
}
