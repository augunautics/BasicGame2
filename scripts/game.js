import Player from './player.js';
import World from './world.js';
import InputHandler from './input.js';
import { getAspectRatioScale, loadImage } from './utils.js';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const baseWidth = 500;
    const baseHeight = 300;
    const aspectRatio = 2; // Scaling factor

    canvas.width = baseWidth * aspectRatio; // Canvas width scaled by aspect ratio
    canvas.height = baseHeight * aspectRatio; // Canvas height scaled by aspect ratio

    const imageSources = [
        '../images/world1-1.png',
        '../images/mario.png',
    ];

    const loadImages = (srcArray) => {
        const promises = srcArray.map(src => loadImage(src));
        return Promise.all(promises);
    };

    loadImages(imageSources)
        .then(([backgroundImage, playerImage]) => {
            const world = new World(canvas, aspectRatio, backgroundImage);
            const player = new Player(50 * aspectRatio, 100, 16, 16, aspectRatio, world, playerImage);
            const input = new InputHandler();

            function gameLoop() {
                world.context.clearRect(0, 0, canvas.width, canvas.height);
                world.drawBackground();

                player.update(input);
                world.scroll(player.x); // Update scrolling based on player position
                player.draw(world.context);

                requestAnimationFrame(gameLoop);
            }

            gameLoop();
        })
        .catch((error) => {
            console.error('Failed to load images:', error);
        });
};
