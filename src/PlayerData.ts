export default class PlayerData {
  private name: string;

  private score: number;

  private level: number;

  /**
   * Creates a new instance of this class
   */
  public constructor() {
    this.level = 0;
    this.score = 0;
    this.name = PlayerData.generateName(3);
  }

  /**
   * getName
   *
   * @returns the name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * setName
   *
   * @param name the name to set
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * getScore
   *
   * @returns the score
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * addScore
   *
   * @param points the amount of points to add to the score
   */
  public addScore(points: number): void {
    this.score += points;
  }

  /**
   * getLevel
   *
   * @returns the current level
   */
  public getLevel(): number {
    return this.level;
  }

  /**
   * increaseLevel
   */
  public increaseLevel(): void {
    this.level += 1;
  }

  private static generateName(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random()
        * charactersLength));
    }
    return result;
  }
}
