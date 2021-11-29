import Game from './Game.js';
import Scene from './Scene.js';
import Garbage from './Garbage.js';
import Player from './Player.js';
export default class Level extends Scene {
    garbageItems;
    player;
    countUntilNextItem;
    constructor(game) {
        super(game);
        this.garbageItems = [];
        for (let i = 0; i < Game.randomNumber(3, 10); i++) {
            this.garbageItems.push(this.createGarbage());
        }
        this.player = new Player(this.game.canvas.width, this.game.canvas.height);
        this.countUntilNextItem = 300;
    }
    createGarbage() {
        return new Garbage(this.game.canvas.width, this.game.canvas.height);
    }
    cleanUpGarbage() {
        this.garbageItems = this.garbageItems.filter((element) => {
            const collides = this.player.collidesWith(element);
            if (collides) {
                this.game.getUser().addScore(element.getScore());
            }
            return !collides;
        });
    }
    processInput() {
        this.player.move(this.game.canvas);
    }
    update(elapsed) {
        if (this.player.isCleaning()) {
            this.cleanUpGarbage();
        }
        if (this.countUntilNextItem <= 0) {
            const choice = Game.randomNumber(0, 10);
            if (choice < 5) {
                this.garbageItems.push(this.createGarbage());
            }
            this.countUntilNextItem = Game.randomNumber(120, 240);
        }
        this.countUntilNextItem -= elapsed;
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        const score = `Score: ${this.game.getUser().getScore()}`;
        this.game.writeTextToCanvas(score, 36, 120, 50);
        this.garbageItems.forEach((element) => {
            element.draw(this.game.ctx);
        });
        this.player.draw(this.game.ctx);
    }
}
//# sourceMappingURL=Level.js.map