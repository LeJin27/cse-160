import Render from "./render.js";

const main = async() => {
  console.log("test");
  const canvasWidth = 1280;
  const canvasHeight = 720;

  const world = new Render();
  world.setCanvasSize(canvasWidth, canvasHeight);
  await world.renderScene();






}


await main();