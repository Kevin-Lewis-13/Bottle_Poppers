"use strict";

// Bottle Cap (player) prefab
class BottleCap extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;                              // track bottle firing status
        this.moveSpeed = 2;                                 // pixels per frame
        this.CapPop = scene.sound.add('cap_pop');           // add cap popping sfx
        this.currentFrame = 1;                              // variable holding the current frame of the cap animation
        this.counter = 0;                                   // counter used in the code
        this.counter2 = 0;                                  // 2nd counter used in the code
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width + 36) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width - 40) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if(keyF.isDown && !this.isFiring) {
            this.isFiring = true;
            this.alpha = 1;
            this.CapPop.play();  // play sfx
        }

        // if fired, move the bottle cap up
        if(this.isFiring && this.y >= borderPadding) {
            if (this.counter2 <= 50)
            {
                this.counter2 += 1;
            }
            else if (this.counter2 >= 50)
            {
                this.y -= this.moveSpeed;
            }
        }

        // update the cap frame at a set interval to create the spinning animation
        if (this.counter < 25)
        {
            this.counter += 1;
        }
        else if (this.counter >= 25)
        {
            this.updateFrame();
        }

        // reset on miss
        if (this.y <= borderPadding*3) {
            this.reset();
        }
    }

    updateFrame()
    {
        // check which is current frame and change it, then set the counter back to zero
        if (this.currentFrame == 0)
        {
            this.setFrame('CapFrame2');
            this.currentFrame = 1;
            this.counter = 0;
        }
        else if (this.currentFrame == 1)
        {
            this.setFrame('CapFrame3');
            this.currentFrame = 2;
            this.counter = 0;
        }
        else
        {
            this.setFrame('CapFrame1');
            this.currentFrame = 0;
            this.counter = 0;
        }
    }

    reset() 
    {
        // reset cap to "ground"
        this.alpha = 0;
        this.isFiring = false;
        this.counter2 = 0;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}