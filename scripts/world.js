export default class World {
    constructor(canvas, aspectRatio, backgroundImage) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.aspectRatio = aspectRatio;
        this.backgroundImage = backgroundImage; // Add background image

        // Crop the image height in half
        this.croppedHeight = backgroundImage.height / 2;

        this.groundY = this.canvas.height - 30 * this.aspectRatio; // Ground level
        this.worldWidth = backgroundImage.width * this.aspectRatio; // World width scaled by background image width
        this.wallThickness = 20 * this.aspectRatio; // Wall thickness scaled by aspect ratio
        this.scrollX = 0; // Horizontal scrolling position

        // Adjust canvas height to match the cropped image
        this.canvas.height = this.croppedHeight * this.aspectRatio;
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
        // Draw the cropped background image (top half)
        this.context.drawImage(
            this.backgroundImage, // Source image
            0, 0, // Source x, y (top-left corner of the crop)
            this.backgroundImage.width, this.croppedHeight, // Crop width and height
            -this.scrollX, 0, // Destination x, y on the canvas (left justified)
            this.worldWidth, this.canvas.height // Destination width and height on the canvas
        );

        // Draw ground
        this.context.fillStyle = '#8B4513'; // Brown ground
        this.context.fillRect(-this.scrollX, this.groundY, this.worldWidth, this.canvas.height - this.groundY);

        // Draw left wall
        this.context.fillStyle = '#8B4513'; // Brown wall
        this.context.fillRect(0 - this.scrollX, 0, this.wallThickness, this.groundY);

        // Draw right wall
        this.context.fillRect(this.worldWidth - this.wallThickness - this.scrollX, 0, this.wallThickness, this.groundY);
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
    }
}
