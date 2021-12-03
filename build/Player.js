import GameItem from './GameItem.js';
import KeyListener from './KeyListener.js';
export default class Player extends GameItem {
    xVelocity;
    yVelocity;
    keyboard;
    constructor(maxX, maxY) {
        super('./assers/img/character_robot_walk0.png', maxX - 72, maxY - 96);
        this.keyboard = new KeyListener();
        this.xVelocity = 5;
        this.yVelocity = 5;
    }
    isCleaning() {
        return this.keyboard.isKeyDown(KeyListener.KEY_SPACE);
    }
    collidesWith(other) {
        return this.xPos < this.xPos + this.img.width
            && this.xPos + this.img.width > this.xPos
            && this.yPos < this.yPos + this.img.height
            && this.yPos + this.img.height > this.yPos;
    }
    move(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.xPos + this.img.width < canvas.width
            || this.keyboard.isKeyDown(KeyListener.KEY_D)
                && this.xPos + this.img.width < canvas.width) {
            this.xPos += this.xVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.xPos > 0 || this.keyboard.isKeyDown(KeyListener.KEY_A)
            && this.xPos > 0) {
            this.xPos -= this.xVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.yPos > 0 || this.keyboard.isKeyDown(KeyListener.KEY_W)
            && this.yPos > 0) {
            this.yPos -= this.yVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.yPos + this.img.height < canvas.height
            || this.keyboard.isKeyDown(KeyListener.KEY_S)
                && this.yPos + this.img.height < canvas.height) {
            this.yPos += this.yVelocity;
        }
    }
}
//# sourceMappingURL=Player.js.map