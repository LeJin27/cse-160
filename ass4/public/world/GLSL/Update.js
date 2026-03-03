
const updateFrame = () => {
  g_seconds = performance.now() / 1000.0 - g_startTime;

  updateInput();
  updateAnimationAngles();
  updateLightPos();
  updateScene();

  requestAnimationFrame(updateFrame);
};

const updateLightPos =() => {
  g_lightPos[0] = Math.cos(g_seconds);
}


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
  if (g_keyPressed['escape']) g_cameraMovement = false;
}

const updateScene = () => {
  let startTime = performance.now();
  setupMatrixCamera();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.uniform1i(u_LightOn, g_lightOn ? 1 : 0);
  gl.uniform3f(u_LightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  gl.uniform3f(u_CameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);


  drawFoxy();




  //updateWallMesh();
  //drawRocks()

  // floor
  //var floor = new Cube();
  //floor.setColor(GRASS_COLOR)
  //floor.matrix.scale(10, 0, 10);
  //floor.matrix.translate(-0.5, -0.5, -0.5);
  //floor.isPlane = true;
  //floor.render();

  // sky

  var sky = new Cube();
  sky.setColor(SKY_COLOR);
  if (g_normalOn) {
    sky.textureType = -3;
  }
  sky.matrix.scale(5,5 , 5);
  sky.matrix.translate(-0.5, 0, -0.5);
  sky.specularSetting = 0;
  sky.invertNormals = true;
  sky.render();

  var light =new Cube();
  light.textureType = TEXTURE_TYPE_COLOR;
  light.color = [2, 2, 0, 1];
  light.matrix.translate(g_lightPos[0], g_lightPos[1], g_lightPos[2]);
  light.matrix.scale(-.1, -.1, -.1, );
  light.matrix.translate(-0.5, -0.5, -0.5, );
  light.render();

  var sphere = new Sphere();
  sphere.setColor(GRASS_COLOR)
  if (g_normalOn) {
    sphere.textureType = -3;
  }
  sphere.matrix.scale(-2, -2, -2);
  sphere.matrix.translate(0, -2, 0.0);
  sphere.render();

  if (!g_Teapot) {
    g_Teapot = new Model("teapot.obj");
    g_Teapot.color = [1.0, 0.5, 0.5, 1.0];
    g_Teapot.matrix.setScale(0.3, 0.3, 0.3);
    g_Teapot.matrix.rotate(67, 0, 1, 1);
    g_Teapot.matrix.translate(0, 0, 0);
  }
  g_Teapot.render();





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



