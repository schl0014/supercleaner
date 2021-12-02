import ScoringObject from './ScoringObject.js';
export default class PowerUp extends ScoringObject {
    applyTo(player) {
        player.increaseSpeed(3);
    }
}
//# sourceMappingURL=PowerUp.js.map