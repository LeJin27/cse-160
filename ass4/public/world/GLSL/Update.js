
const updateFrame = () => {
  g_seconds = performance.now() / 1000.0 - g_startTime;

  updateInput();
  updateAnimationAngles();
  updateScene();
  requestAnimationFrame(updateFrame);
};



const updateInput = () => {
  const step = 0.05;
  if (g_keyPressed['w']) g_camera.forward(step);
  if (g_keyPressed['s']) g_camera.backward(step);
  if (g_keyPressed['a']) g_camera.left(step);
  if (g_keyPressed['d']) g_camera.right(step);
  if (g_keyPressed['q']) g_camera.rotate(30 * step );
  if (g_keyPressed['e']) g_camera.rotate(-30 * step);
  if (g_keyPressed['z']) g_camera.rotateY(30 * step );
  if (g_keyPressed['x']) g_camera.rotateY(-30 * step);
  if (g_keyPressed[' ']) g_camera.ascend(step);
  if (g_keyPressed['shift']) g_camera.descend(step);
}

const updateScene = () => {
  let startTime = performance.now();
  setupMatrixCamera();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  //drawFoxy();




  //updateWallMesh();
  //drawRocks()

  // floor
  var floor = new Cube();
  floor.setColor(GRASS_COLOR)
  floor.matrix.translate(0, -0.5, 0.0);
  floor.matrix.scale(32, 1, 32);
  floor.matrix.translate(0, -1, 0.0);
  floor.render();

  // sky
  var sky = new Cube();
  sky.setColor(SKY_COLOR);
  sky.matrix.scale(10, 10, 10);
  sky.render();

  let duration = performance.now() - startTime;
  const len = "placeholder";
  sendTextToHtml(
    `numdo: ${len} ms: ${Math.floor(duration)} fps: ${Math.floor(10000 / duration)}`,
    "numdot",
  );
};

const sendTextToHtml = (text, htmlID) => {
  const htmlElem = document.getElementById(htmlID);
  if (!htmlElem) {
    console.log(`Failed to get ${htmlID} from HTML`);
    return;
  }
  htmlElem.innerHTML = text;
};

const setupMatrixCamera = ( ) => {
  let projMatrix = new Matrix4;
  // fov, aspect ratio, near plane and far plane
  projMatrix.setPerspective(60, 1 * canvas.width / canvas.height, 1, 100);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMatrix.elements);

  let viewMatrix = new Matrix4;

  const g_eye = g_camera.eye.elements
  const g_at = g_camera.at.elements
  const g_up = g_camera.up.elements
  viewMatrix.setLookAt(g_eye[0],g_eye[1], g_eye[2], g_at[0], g_at[1], g_at[2], g_up[0], g_up[1], g_up[2])
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  let globalRotMat = new Matrix4();
  globalRotMat.rotate(g_globalAngleX, 0, 1, 0);
  globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
  globalRotMat.scale(g_globalZoom, g_globalZoom, g_globalZoom);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

}

const updateAnimationAngles = () => {
  const speed = Date.now() / 90;
  animationList.ANIMATION_RIGHT_FRONT_LEG = 30 * Math.sin(speed);
  animationList.ANIMATION_LEFT_FRONT_LEG = 30 * Math.sin(speed + 30);

  animationList.ANIMATION_RIGHT_BACK_LEG = 30 * Math.sin(speed);
  animationList.ANIMATION_LEFT_BACK_LEG = 30 * Math.sin(speed + 30);

  animationList.ANIMATION_RIGHT_BACK_LEG_JOINT = 40 * Math.sin(speed);
  animationList.ANIMATION_LEFT_BACK_LEG_JOINT = 40 * Math.sin(speed + 30);

  animationList.ANIMATION_NOSE_TWITCH = 10 * Math.sin(speed);

  animationList.ANIMATION_RIGHT_EAR = 30 * Math.sin(speed);
  animationList.ANIMATION_LEFT_EAR = 30 * Math.sin(speed + 30);
  animationList.ANIMATION_FACE = 30 * Math.sin(speed + 30);

  animationList.ANIMATION_FUR = 0.05 * ((Math.sin(speed) + 1) / 2);

  animationList.ANIMATION_TAIL_ONE = 30 * Math.sin(speed + 30);
  animationList.ANIMATION_TAIL_TWO = 30 * Math.sin(speed + 30);
  animationList.ANIMATION_TAIL_THREE = 30 * Math.sin(speed + 30);
  //else if (g_controller_play === CONTROLLER_CUSTOM_ANIM) {
  //  animationList.ANIMATION_NOSE_TWITCH = 10 * Math.sin(speed);
  //  animationList.ANIMATION_HEAD_SIZE =((Math.sin(speed) + 1) / 2);
  //  animationList.ANIMATION_BODY_SIZE =((Math.sin(speed) + 1) / 2);
  //}
};