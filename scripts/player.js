//player.js
export default class Player {
    constructor(x, y, width, height, aspectRatio, world, playerImage) {
        this.x = x;
        this.y = y;
        this.width = width * aspectRatio;
        this.height = height * aspectRatio;
        this.velocityY = 0;
        this.speed = 0.75 * aspectRatio;
        this.jumpPower = 8 * aspectRatio;
        this.gravity = 0.5 * aspectRatio;
        this.onGround = false;
        this.world = world;
        this.image = playerImage; // Store the player image
    }

    update(input) {
        // Horizontal movement with world boundary checks
        if (input.keys.left) this.x -= this.speed;
        if (input.keys.right) this.x += this.speed;

        // Log the player's X position
        console.log(`Player X position: ${this.x}`);
        console.log(`Player y position: ${this.y}`);

        // Jumping
        if (input.keys.jump && this.onGround) {
            this.velocityY = -this.jumpPower;
            this.onGround = false;
        }

        // Gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Collision detection with the ground
        if (this.y + this.height > this.world.groundY) {
            this.y = this.world.groundY - this.height;
            this.velocityY = 0;
            this.onGround = true;
        }

        // Collision detection with walls
        this.world.detectCollision(this);
    }

    draw(context) {
        // Draw the player image with cropping
        context.drawImage(
            this.image,          // Source image
            0, 8,                // Crop start at x=0, y=8
            16, 16,              // Crop width and height (16x16 pixels)
            this.x - this.world.scrollX, this.y, // Destination x, y
            this.width, this.height // Destination width, height on the canvas
        );

        // Draw a stroke rectangle around the player
        context.strokeStyle = "#000";
        context.strokeRect(this.x - this.world.scrollX, this.y, this.width, this.height);
    }
}
