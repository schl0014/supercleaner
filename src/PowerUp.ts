import Player from './Player.js';
import ScoringObject from './ScoringObject.js';

export default class PowerUp extends ScoringObject {
  /**
   * apply
   * @param player
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line class-methods-use-this
  public applyTo(player: Player): void {
    player.increaseSpeed(3);
  }
}
