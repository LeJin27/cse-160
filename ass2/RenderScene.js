
const renderScene = () => {
  let startTime = performance.now();

  let globalRotMat = new Matrix4();
  globalRotMat.rotate(g_globalAngleX, 0, 1, 0);
  globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
  globalRotMat.scale(g_globalZoom, g_globalZoom, g_globalZoom);
  globalRotMat = globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // body
  var body = new Cube();
  body.setColor([255, 158, 92, 255]);
  body.matrix.translate(0, 0, 0.0);
  body.matrix.rotate(0, 0, 1, 0);
  const bodyCoordinates = new Matrix4(body.matrix);
  body.matrix.scale(0.4, 0.3, 0.6);
  body.matrix.scale(1 + animationList.ANIMATION_BODY_SIZE, 1 + animationList.ANIMATION_BODY_SIZE, 1 + animationList.ANIMATION_BODY_SIZE);
  body.render();

  drawFur(bodyCoordinates, animationList.ANIMATION_FUR, animationList.ANIMATION_BODY_SIZE);

  var frontFace = new Cube(); 
  frontFace.setColor([255, 158, 92, 255]);
  frontFace.matrix = new Matrix4(bodyCoordinates);
  frontFace.matrix.translate(0, 0.1, -0.4);
  frontFace.matrix.rotate(animationList.ANIMATION_FACE, 1, 1, 0);
  frontFace.matrix.scale(1 + animationList.ANIMATION_HEAD_SIZE, 1 + animationList.ANIMATION_HEAD_SIZE, 1 + animationList.ANIMATION_HEAD_SIZE);
  const frontFaceCoordinates = new Matrix4(frontFace.matrix);
  frontFace.matrix.scale(0.4, 0.4, 0.4);
  frontFace.render();

  drawNose(frontFaceCoordinates, animationList.ANIMATION_NOSE_TWITCH, animationList.ANIMATION_NOSE_TWITCH)


  drawEye(frontFaceCoordinates, false)
  drawEye(frontFaceCoordinates, true)
  
  drawEar(frontFaceCoordinates, false, animationList.ANIMATION_LEFT_EAR)
  drawEar(frontFaceCoordinates, true, animationList.ANIMATION_RIGHT_EAR)

  //drawHat(frontFaceCoordinates, true)



  // right
  drawFrontLeg(bodyCoordinates, false, animationList.ANIMATION_RIGHT_FRONT_LEG )
  drawFrontLeg(bodyCoordinates, true, animationList.ANIMATION_LEFT_FRONT_LEG)
  drawHindLeg(bodyCoordinates, false, animationList.ANIMATION_LEFT_BACK_LEG, animationList.ANIMATION_LEFT_BACK_LEG_JOINT)
  drawHindLeg(bodyCoordinates, true, animationList.ANIMATION_RIGHT_BACK_LEG, animationList.ANIMATION_RIGHT_BACK_LEG_JOINT)

  drawBodyTail(bodyCoordinates, animationList.ANIMATION_TAIL_ONE, animationList.ANIMATION_TAIL_TWO, animationList.ANIMATION_TAIL_THREE)


  drawCone(frontFaceCoordinates, 30);


  let duration = performance.now() - startTime;
  const len = "placeholder";
  sendTextToHtml(
    `numdo: ${len} ms: ${Math.floor(duration)} fps: ${Math.floor(10000 / duration)}`,
    "numdot",
  );
};