import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';
export default class Player extends GameItem {
    xVel;
    yVel;
    keyboard;
    constructor(maxX, maxY) {
        super('./assets/img/character_robot_walk0.png', maxX - 76, maxY - 92);
        this.xVel = 3;
        this.yVel = 3;
        this.keyboard = new KeyListener();
    }
    move(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.xPos + this.img.width < canvas.width) {
            this.xPos += this.xVel;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.xPos > 0) {
            this.xPos -= this.xVel;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.yPos > 0) {
            this.yPos -= this.yVel;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.yPos + this.img.height < canvas.height) {
            this.yPos += this.yVel;
        }
    }
    isCleaning() {
        return this.keyboard.isKeyDown(KeyListener.KEY_SPACE);
    }
    collidesWith(other) {
        return this.xPos < other.getXPos() + other.getImageWidth()
            && this.xPos + this.img.width > other.getXPos()
            && this.yPos < other.getYPos() + other.getImageHeight()
            && this.yPos + this.img.height > other.getYPos();
    }
    increaseSpeed(size) {
        this.xVel += size;
        this.yVel += size;
    }
}
//# sourceMappingURL=Player.js.map