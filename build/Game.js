import KeyListener from './KeyListener.js';
import UserData from './UserData.js';
import Player from './Player.js';
export default class Game {
    user;
    canvas;
    ctx;
    keyboard;
    garbageItems;
    player;
    countUntilNextItem;
    constructor(canvas) {
        this.player = new Player(50, 50);
        this.user = new UserData();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboard = new KeyListener();
        this.garbageItems = [];
        for (let i = 0; i < Game.randomNumber(3, 10); i++) {
            this.garbageItems.push({
                img: Game.loadNewImage('./assets/img/icecream.png'),
                xPos: Game.randomNumber(0, this.canvas.width - 32),
                yPos: Game.randomNumber(0, this.canvas.height - 32),
            });
        }
        this.countUntilNextItem = 300;
        this.loop();
    }
    loop = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.move(this.canvas);
        this.draw();
        if (this.keyboard.isKeyDown(KeyListener.KEY_SPACE)) {
            this.cleanUpGarbage();
        }
        this.writeTextToCanvas(`Score: ${this.user.getScore()}`, 36, 120, 50);
        if (this.countUntilNextItem === 0) {
            const choice = Game.randomNumber(0, 10);
            if (choice < 5) {
                this.garbageItems.push({
                    img: Game.loadNewImage('./assets/img/icecream.png'),
                    xPos: Game.randomNumber(0, this.canvas.width - 32),
                    yPos: Game.randomNumber(0, this.canvas.height - 32),
                });
            }
            this.countUntilNextItem = Game.randomNumber(120, 240);
        }
        this.countUntilNextItem -= 1;
        requestAnimationFrame(this.loop);
    };
    draw() {
        this.garbageItems.forEach((element) => {
            this.ctx.drawImage(element.img, element.xPos, element.yPos);
        });
        this.player.draw(this.ctx);
    }
    cleanUpGarbage() {
        this.garbageItems = this.garbageItems.filter((element) => {
            if (this.player.getXPos() < element.xPos + element.img.width
                && this.player.getXPos() + this.player.getImageWidth() > element.xPos
                && this.player.getYPos() < element.yPos + element.img.height
                && this.player.getYPos() + this.player.getImageHeight() > element.yPos) {
                this.user.addScore(1);
                return false;
            }
            return true;
        });
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