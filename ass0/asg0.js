const drawVector = (v, color) => {
  var canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return false;
  }
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  const offSetRoot = 200;
  ctx.moveTo(offSetRoot, offSetRoot);

  const scaledX = v.elements[0] * 20;
  const scaledY = v.elements[1] * -20;

  const finalX = scaledX + offSetRoot;
  const finalY = scaledY + offSetRoot;

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.lineTo(finalX, finalY);
  ctx.stroke();
};

const areaTriangle = (v1, v2) => {
  const v3 = Vector3.cross(v1, v2);
  const area = v3.magnitude();
  return area
};

const getInputBoxValue = (divClass, boxInput) => {
  const selectedClass = document.querySelector(divClass);
  const value = selectedClass.querySelector(boxInput).value || 0;
  return value;
};
const clearCanvas = () => {
  var canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return false;
  }
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);
};

const handleDrawEvent = () => {
  const redXValue = getInputBoxValue(".redVec", 'input[name="x"]');
  const redYValue = getInputBoxValue(".redVec", 'input[name="y"]');
  const blueXValue = getInputBoxValue(".blueVec", 'input[name="x"]');
  const blueYValue = getInputBoxValue(".blueVec", 'input[name="y"]');

  clearCanvas();
  const redDimVec = new Vector3([redXValue, redYValue, 0]);
  const blueDimVec = new Vector3([blueXValue, blueYValue, 0]);

  drawVector(redDimVec, "red");
  drawVector(blueDimVec, "blue");
};

const angleBetween = (v1, v2) => {
  const dotProduct = Vector3.dot(v1, v2);
  const magV1 = v1.magnitude();
  const magV2 = v2.magnitude();
  const cosAlpha = dotProduct / magV1 / magV2;
  const alphaRadians = Math.acos(cosAlpha);
  const alphaDegress = alphaRadians * (180 / Math.PI);
  return alphaDegress;
};

const handleDrawOperationEvent = () => {
  const redXValue = getInputBoxValue(".redVec", 'input[name="x"]');
  const redYValue = getInputBoxValue(".redVec", 'input[name="y"]');
  const blueXValue = getInputBoxValue(".blueVec", 'input[name="x"]');
  const blueYValue = getInputBoxValue(".blueVec", 'input[name="y"]');

  const operationValue = getInputBoxValue(
    ".operation",
    'select[name="operation"]'
  );
  const scalarValue = getInputBoxValue(".operation", 'input[name="scalar"]');

  const redDimVec = new Vector3([redXValue, redYValue, 0]);
  const blueDimVec = new Vector3([blueXValue, blueYValue, 0]);

  clearCanvas();
  const operationToNotDraw = ["mul", "div"];
  if (!operationToNotDraw.includes(operationValue)) {
    drawVector(redDimVec, "red");
    drawVector(blueDimVec, "blue");
  }

  //base
  let greenDimVector = new Vector3([0, 0, 0]);
  let greenDimVector2 = new Vector3([0, 0, 0]);

  switch (operationValue) {
    case "add":
      greenDimVector = redDimVec.add(blueDimVec);
      break;
    case "sub":
      greenDimVector = redDimVec.sub(blueDimVec);
      break;
    case "div":
      greenDimVector = redDimVec.div(scalarValue);
      greenDimVector2 = blueDimVec.div(scalarValue);
      break;
    case "mul":
      greenDimVector = redDimVec.mul(scalarValue);
      greenDimVector2 = blueDimVec.mul(scalarValue);
      break;
    case "norm":
      greenDimVector = redDimVec.normalize(scalarValue);
      greenDimVector2 = blueDimVec.normalize(scalarValue);
      break;
    case "mag":
      const redMag = redDimVec.magnitude();
      const greenMag = blueDimVec.magnitude();
      console.log(`Magnitude v1: ${redMag}`);
      console.log(`Magnitude v2: ${greenMag}`);
      break;
    case "ang":
      const angle = angleBetween(redDimVec, blueDimVec);
      console.log(angle);

      break;
    case "area":
      const area = areaTriangle(redDimVec, blueDimVec);

      console.log(`Area of the triangle: ${area}`);
      break;
    default:
      console.log("something went wrong");
  }
  drawVector(greenDimVector, "green");
  drawVector(greenDimVector2, "green");
};

// DrawTriangle.js (c) 2012 matsuda
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById("example");
  if (!canvas) {
    console.log("Failed to retrieve the <canvas> element");
    return false;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext("2d");

  // Draw a blue rectangle
  ctx.fillStyle = "black"; // Set color to blue
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

  const drawButton = document.getElementById("drawButton");
  drawButton.addEventListener("click", handleDrawEvent);

  const drawButton2 = document.getElementById("drawButton2");
  drawButton2.addEventListener("click", handleDrawOperationEvent);
}
