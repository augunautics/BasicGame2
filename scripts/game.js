import Player from './player.js';
import World from './world.js';
import InputHandler from './input.js';
import { getAspectRatioScale } from './utils.js';

window.onload = () => {
  const canvas = document.getElementById('gameCanvas');
  const baseWidth = 800;
  const baseHeight = 600;
  const aspectRatio = getAspectRatioScale(16, 16); // 16px base sprites

  canvas.width = baseWidth * aspectRatio;
  canvas.height = baseHeight * aspectRatio;

  const world = new World(canvas, aspectRatio);
  const player = new Player(
    50 * aspectRatio,
    world.groundY - 16 * aspectRatio,
    16,
    16,
    aspectRatio,
    world
  );
  const input = new InputHandler();

  function gameLoop() {
    world.context.clearRect(0, 0, canvas.width, canvas.height);
    world.drawBackground();

    player.update(input);
    player.draw(world.context);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
};
  