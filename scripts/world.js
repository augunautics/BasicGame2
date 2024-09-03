export default class World {
    constructor(canvas, aspectRatio, worldImage) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.aspectRatio = aspectRatio;
        this.worldImage = worldImage;
        this.originalWorldHeight = this.worldImage.height / 2; // Original cropped world height (top half)
        this.croppedHeight = this.originalWorldHeight - 16; // Top half minus 16 pixels
        this.worldHeight = this.croppedHeight * this.aspectRatio; // Final height adjusted by aspect ratio
        this.worldWidth = this.worldImage.width * this.aspectRatio; // World width scaled by aspect ratio
        this.groundY = this.worldHeight - 30 * this.aspectRatio + 16; // Adjusted ground level (moved down by 16 pixels)
        this.wallThickness = 20 * this.aspectRatio; // Wall thickness scaled by aspect ratio
        this.scrollX = 0; // Horizontal scrolling position

        // Adjust the canvas height to match the new world height
        this.canvas.height = this.worldHeight; // Adjust canvas height
    }

    scroll(playerX) {
        const maxScrollX = this.worldWidth - this.canvas.width; // Maximum scroll position
        const leftEdge = this.canvas.width / 2;

        if (playerX > leftEdge && playerX < this.worldWidth - leftEdge) {
            this.scrollX = playerX - leftEdge;
        } else if (playerX <= leftEdge) {
            this.scrollX = 0; // Scroll to the far left
        } else if (playerX >= this.worldWidth - leftEdge) {
            this.scrollX = maxScrollX; // Scroll to the far right
        }
    }

    drawBackground() {
        // Draw the cropped portion of the background image with 16 pixels less in height
        this.context.drawImage(
            this.worldImage,                // Source image
            0, 0,                           // Source x, y (top-left corner of the crop)
            this.worldImage.width, this.croppedHeight, // Source width and height (top half minus 16 pixels)
            -this.scrollX, 0,               // Destination x, y on the canvas (start at 0)
            this.worldWidth, this.worldHeight // Destination width and height on the canvas
        );

        // Draw left wall
        this.context.fillStyle = '#8B4513'; // Brown wall
        this.context.fillRect(0 - this.scrollX, 0, this.wallThickness, this.groundY);

        // Draw right wall
        this.context.fillRect(this.worldWidth - this.wallThickness - this.scrollX, 0, this.wallThickness, this.groundY);

        // Draw ground collision box
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 2;
        this.context.strokeRect(
            0 - this.scrollX,                      // x-coordinate
            this.groundY - 16 * this.aspectRatio + 16,  // y-coordinate (16 pixels above the ground, now moved down by 16 pixels)
            this.worldWidth,                       // width of the box
            16 * this.aspectRatio                  // height of the box (16 pixels)
        );
    }

    detectCollision(player) {
        // Check collision with left wall
        if (player.x < this.wallThickness) {
            player.x = this.wallThickness;
        }

        // Check collision with right wall
        if (player.x + player.width > this.worldWidth - this.wallThickness) {
            player.x = this.worldWidth - this.wallThickness - player.width;
        }

        const groundTolerance = 1; // Allowable margin of error
        if (player.y + player.height > this.groundY - groundTolerance) {
            player.y = this.groundY - player.height;
            player.velocityY = 0; // Stop the player from falling
            player.isOnGround = true; // Indicate that the player is on the ground
        } else {
            player.isOnGround = false; // Indicate that the player is not on the ground
        }
    }
}
