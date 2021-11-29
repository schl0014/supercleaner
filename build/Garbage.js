import GameItem from './GameItem.js';
export default class Garbage extends GameItem {
    score;
    constructor(maxX, maxY) {
        super('./assets/img/icecream.png', maxX - 32, maxY - 32);
        this.score = 1;
    }
}
//# sourceMappingURL=Garbage.js.map