export default class Player {
    constructor(x, y, width, height, aspectRatio, world) {
        this.x = x;
        this.y = y;
        this.width = width * aspectRatio;
        this.height = height * aspectRatio;
        this.velocityY = 0;
        this.speed = 2 * aspectRatio;
        this.jumpPower = 8 * aspectRatio;
        this.gravity = 0.3 * aspectRatio;
        this.onGround = false;
        this.world = world;
    }

    update(input) {
        // Horizontal movement with world boundary checks
        if (input.keys.left) this.x -= this.speed;
        if (input.keys.right) this.x += this.speed;

        // Log the player's X position
        console.log(`Player X position: ${this.x}`);

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

    draw(ctx) {
        ctx.strokeStyle = "#000";
        ctx.strokeRect(this.x - this.world.scrollX, this.y, this.width, this.height);
    }
}
