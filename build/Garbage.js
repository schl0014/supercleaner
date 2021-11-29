import GameItem from './GameItem.js';
export default class Garbage extends GameItem {
    score;
    constructor(xPos, yPos) {
        super('./assets/img/icecream.png', xPos, yPos);
        this.score = 1;
    }
}
//# sourceMappingURL=Garbage.js.map