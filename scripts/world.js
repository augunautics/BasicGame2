export default class World {
  constructor(canvas, aspectRatio) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.aspectRatio = aspectRatio;
    this.groundY = this.canvas.height - 30 * this.aspectRatio; // Ground level
  }

  drawBackground() {
    this.context.fillStyle = '#8B4513'; // Brown ground
    this.context.fillRect(
      0,
      this.groundY,
      this.canvas.width,
      this.canvas.height - this.groundY
    );
  }
}
