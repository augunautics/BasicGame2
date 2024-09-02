export default class InputHandler {
  constructor() {
    this.keys = {
      left: false,
      right: false,
      jump: false,
    };

    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'Space':
          this.keys.jump = true;
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'Space':
          this.keys.jump = false;
          break;
      }
    });
  }
}
