import Garbage from './Garbage.js';
import Player from './Player.js';
export default class Game {
    canvas;
    ctx;
    garbageItems;
    player;
    countUntilNextItem;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.garbageItems = [];
        for (let i = 0; i < Game.randomNumber(3, 10); i++) {
            this.garbageItems.push(this.createGarbage());
        }
        this.player = new Player(this.canvas.width, this.canvas.height);
        this.countUntilNextItem = 300;
        this.loop();
    }
    loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.move(this.canvas);
        this.draw();
        if (this.player.isCleaning()) {
            this.cleanUpGarbage();
        }
        this.writeTextToCanvas('Score: 0', 36, 120, 50);
        if (this.countUntilNextItem === 0) {
            const choice = Game.randomNumber(0, 10);
            if (choice < 5) {
                this.garbageItems.push(this.createGarbage());
            }
            this.countUntilNextItem = Game.randomNumber(120, 240);
        }
        this.countUntilNextItem -= 1;
        requestAnimationFrame(this.loop);
    };
    createGarbage() {
        return new Garbage(this.canvas.width, this.canvas.height);
    }
    draw() {
        this.garbageItems.forEach((element) => {
            element.draw(this.ctx);
        });
        this.player.draw(this.ctx);
    }
    cleanUpGarbage() {
        this.garbageItems = this.garbageItems.filter((element) => !this.player.collidesWith(element));
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Game.js.map