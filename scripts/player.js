export default class Player {
    constructor(x, y, width, height, aspectRatio, world, image) {
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
        this.image = image;
        this.context = world.context; // Pulling the context from the world
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

    draw() {
        // Draw the cropped portion of the image at the player's position
        this.context.drawImage(
            this.image,            // Source image
            0, 8,                  // Source x, y (top-left corner of the crop)
            16, 16,                // Source width, height (size of the crop)
            this.x - this.world.scrollX, this.y, // Destination x, y on the canvas
            this.width, this.height // Destination width, height (size on the canvas)
        );


        //this.context.strokeStyle = "#000";
        //this.context.strokeRect(this.x - this.world.scrollX, this.y, this.width, this.height);
    }
}
