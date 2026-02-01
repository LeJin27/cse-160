
const drawFrontLeg = (bodyCoordinates, isFlipped, animationAngle) => {
  let flipValue;
  if (isFlipped) {
    flipValue = -1;
  } else {
    flipValue = 1;
  }
    // front right leg
  var frontHindLeg = new Cube();
  frontHindLeg.setColor([255, 158, 92, 255]);
  frontHindLeg.matrix = new Matrix4(bodyCoordinates);
  frontHindLeg.matrix.translate(0.18 * flipValue, -0.1, -0.2);
  frontHindLeg.matrix.rotate(animationAngle, 1, 0, 0);
  const frontHindLegCoordinates = new Matrix4(frontHindLeg.matrix);
  frontHindLeg.matrix.scale(0.15, 0.2, 0.2);
  frontHindLeg.render();

  var frontFurLeg = new Cube();
  frontFurLeg.setColor([255, 255, 255, 255]);
  frontFurLeg.matrix = new Matrix4(frontHindLegCoordinates);
  frontFurLeg.matrix.translate(0, -0.1, -0.06);
  frontFurLeg.matrix.rotate(30, 1, 0, 0);
  const frontFurLegCoordinates = new Matrix4(frontFurLeg.matrix);
  frontFurLeg.matrix.scale(0.11, 0.3, 0.12);
  frontFurLeg.render();

  var frontLimbLeg = new Cube();
  frontLimbLeg.setColor([50, 50, 50, 255]);
  frontLimbLeg.matrix = new Matrix4(frontHindLegCoordinates);
  frontLimbLeg.matrix.translate(0, -0.2, -0.12);
  frontLimbLeg.matrix.rotate(30, 1, 0, 0);
  const frontLimbLegCoordinates = new Matrix4(frontLimbLeg.matrix);
  frontLimbLeg.matrix.scale(0.08, 0.3, 0.05);
  frontLimbLeg.render();

  var frontFoot = new Cube();
  frontFoot.setColor([50, 50, 50, 255]);
  frontFoot.matrix = new Matrix4(frontLimbLegCoordinates);
  frontFoot.matrix.translate(0, -0.16, 0);
  frontFoot.matrix.rotate(30+ -1 *animationAngle, 1, 0, 0);
  const frontFootCoordinates = new Matrix4(frontFoot.matrix);
  frontFoot.matrix.scale(0.1, 0.1, 0.05);
  frontFoot.render();
}

const drawHindLeg = (bodyCoordinates, isFlipped, animationAngle, animationAngle2) => {
    let flipValue;
  if (isFlipped) {
    flipValue = -1;
  } else {
    flipValue = 1;
  }
  // back right leg
  var rightHindLeg = new Cube();
  rightHindLeg.setColor([255, 158, 92, 255]);
  rightHindLeg.matrix = new Matrix4(bodyCoordinates);
  rightHindLeg.matrix.translate(0.18 * flipValue, -0.1, 0.3);
  rightHindLeg.matrix.rotate(animationAngle, 1, 0, 0);
  const rightHindLegCoordinates = new Matrix4(rightHindLeg.matrix);
  rightHindLeg.matrix.scale(0.2, 0.23, 0.2);
  rightHindLeg.render();

  var rightHindLimb = new Cube();
  rightHindLimb.setColor([255, 255, 255, 255]);
  rightHindLimb.matrix = new Matrix4(rightHindLegCoordinates);
  rightHindLimb.matrix.translate(0, -0.15, 0.02);
  rightHindLimb.matrix.rotate(-40, 1, 0, 0);
  const rightHindLimbCoordinates = new Matrix4(rightHindLimb.matrix);
  rightHindLimb.matrix.scale(0.1, 0.2, 0.1);
  rightHindLimb.render();

  var rightHindLimbTwo = new Cube();
  rightHindLimbTwo.setColor([70, 70, 70, 255]);
  rightHindLimbTwo.matrix = new Matrix4(rightHindLimbCoordinates);
  rightHindLimbTwo.matrix.translate(0, -0.08, -0.1);
  rightHindLimbTwo.matrix.rotate(70, 1, 0, 0);
  rightHindLimbTwo.matrix.rotate(animationAngle2, 1, 0, 0);
  const rightHindLimbTwoCoordinates = new Matrix4(rightHindLimbTwo.matrix);
  rightHindLimbTwo.matrix.scale(0.06, 0.2, 0.05);
  rightHindLimbTwo.render();

  var rightHindFoot = new Cube();
  rightHindFoot.setColor([50, 50, 50, 255]);
  rightHindFoot.matrix = new Matrix4(rightHindLimbTwoCoordinates);
  rightHindFoot.matrix.translate(0, -0.12, 0);
  rightHindFoot.matrix.rotate(-30, 1, 0, 0);
  const rightHindFootCoordinates = new Matrix4(rightHindFoot.matrix);
  rightHindFoot.matrix.scale(0.08, 0.04, 0.08);
  rightHindFoot.render();

}

const drawEye = (frontFaceCoordinates, isFlipped) => {
  let flipValue;
  if (isFlipped) {
    flipValue = -1;
  } else {
    flipValue = 1;
  }
  var frontEye = new Cube(); 
  frontEye.setColor([50, 50, 50, 255]);
  frontEye.matrix = new Matrix4(frontFaceCoordinates);
  frontEye.matrix.translate(0.11 * flipValue, 0.05, -0.2);
  frontEye.matrix.rotate(0, 0, 1, 0);
  const frontEyeCoordinates = new Matrix4(frontEye.matrix);
  frontEye.matrix.scale(0.15, 0.05, 0.05);
  frontEye.render();
}
const drawEar = (frontFaceCoordinates, isFlipped, animationAngle) => {
  let flipValue;
  if (isFlipped) {
    flipValue = -1;
  } else {
    flipValue = 1;
  }
  var frontEar = new Cube(); 
  frontEar.setColor([255, 158, 92, 255]);
  frontEar.matrix = new Matrix4(frontFaceCoordinates);
  frontEar.matrix.translate(0.15 * flipValue, 0.2, -0.12);
  frontEar.matrix.rotate(50 * flipValue, 0, 0, 1);
  frontEar.matrix.rotate(animationAngle, 1, 0, 0);
  const frontEarCoordinates = new Matrix4(frontEar.matrix);
  frontEar.matrix.scale(0.20, 0.20, -0.05);
  frontEar.render();
}

const drawHat = (frontFaceCoordinates, isFlipped) => {
  var frontEar = new Cube(); 
  frontEar.setColor([0, 0, 255, 255]);
  frontEar.matrix = new Matrix4(frontFaceCoordinates);
  frontEar.matrix.translate(0.15, 0.2, 0.1);
  frontEar.matrix.rotate(-30, 0, 0, 1);
  frontEar.matrix.rotate(30, 1, 0, 0);
  const frontEarCoordinates = new Matrix4(frontEar.matrix);
  frontEar.matrix.scale(0.5, 0.1, 0.5);
  frontEar.render();
}

const drawBodyTail = (bodyCoordinates, animationAngle1, animationAngle2, animationAngle3) => {
  var bodyTail = new Cube();
  bodyTail.setColor([255, 158, 92, 255]);
  bodyTail.matrix = new Matrix4(bodyCoordinates);
  bodyTail.matrix.translate(0, 0, 0.4);
  bodyTail.matrix.rotate(animationAngle1, 1, 0, 0);
  const bodyTailCoordinates = new Matrix4(bodyTail.matrix);
  bodyTail.matrix.scale(0.2, 0.2, 0.2);
  bodyTail.render();

  var tailSegmentOne = new Cube();
  tailSegmentOne.setColor([255, 158, 92, 255]);
  tailSegmentOne.matrix = new Matrix4(bodyTailCoordinates);
  tailSegmentOne.matrix.translate(0, 0, 0.2);
  tailSegmentOne.matrix.rotate(animationAngle2, 1, 0, 0);
  const tailSegmentOneCoordinates = new Matrix4(tailSegmentOne.matrix);
  tailSegmentOne.matrix.scale(0.25, 0.25, 0.25);
  tailSegmentOne.render();

  var tailSegmentTwo = new Cube();
  tailSegmentTwo.setColor([255, 255, 255, 255]);
  tailSegmentTwo.matrix = new Matrix4(tailSegmentOneCoordinates);
  tailSegmentTwo.matrix.translate(0, 0, 0.2);
  tailSegmentTwo.matrix.rotate(animationAngle3, 1, 0, 0);
  const tailSegmentTwoCoordinates = new Matrix4(tailSegmentTwo.matrix);
  tailSegmentTwo.matrix.scale(0.20, 0.20, 0.20);
  tailSegmentTwo.render();

}

const drawNose = (frontFaceCoordinates, animationAngle, animationAngle2) => {
  var frontNose = new Cube(); 
  frontNose.setColor([255, 255, 255, 255]);
  frontNose.matrix = new Matrix4(frontFaceCoordinates);
  frontNose.matrix.translate(0, -0.08, -0.3);
  frontNose.matrix.rotate(animationAngle, 1, 0, 0);
  const frontNoseCoordinates = new Matrix4(frontNose.matrix);
  frontNose.matrix.scale(0.2, 0.2, 0.28);
  frontNose.render();


  var frontnostril = new Cube(); 
  frontnostril.setColor([50, 50, 50, 255]);
  frontnostril.matrix = new Matrix4(frontNoseCoordinates);
  frontnostril.matrix.translate(0, 0.04, -0.2);
  frontnostril.matrix.rotate(animationAngle2, 1, 0, 0);
  const frontnostrilCoordinates = new Matrix4(frontnostril.matrix);
  frontnostril.matrix.scale(0.1, 0.1, 0.1);
  frontnostril.render();
}

const drawFur = (bodyCoordinates, animationScale) => {
  var frontFur = new Cube();
  frontFur.setColor([255, 255, 255, 255]);
  frontFur.matrix = new Matrix4(bodyCoordinates);
  frontFur.matrix.translate(0, -0.1, -0.08);
  frontFur.matrix.rotate(0, 0, 1, 0);
  const frontFurCoordinates = new Matrix4(frontFur.matrix);
  frontFur.matrix.scale(0.3 + animationScale, 0.3 + animationScale, 0.6 + animationScale);
  frontFur.matrix.scale(1 + animationList.ANIMATION_BODY_SIZE, 1 + animationList.ANIMATION_BODY_SIZE, 1 + animationList.ANIMATION_BODY_SIZE);
  frontFur.render();

}

const drawCone = (frontFaceCoordinates, animationScale) => {
  var hat = new Cone();
  hat.matrix = new Matrix4(frontFaceCoordinates);
  hat.setColor([0, 20, 0, 255]);

  hat.matrix.translate(0, 0.2, 0)
  hat.matrix.scale(0.2, 0.2, 0.2)

  hat.render();


}