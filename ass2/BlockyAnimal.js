// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "uniform float u_Size;\n" +
  "void main() {\n" +
  "gl_Position = a_Position;\n" +
  "gl_PointSize = u_Size;\n" +
  "}\n";

// Fragment shader program
var FSHADER_SOURCE =
  "precision mediump float;\n" +
  "uniform vec4 u_FragColor;\n" + // uniform変数
  "void main() {\n" +
  "  gl_FragColor = u_FragColor;\n" +
  "}\n";

let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
// globals for ui
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
let g_selectedType = POINT;
let g_shapesList = []; // array holds shapes
// vertext
let g_buffer;
let placeholder_preset = `[{"type":"point","position":[0.105,0.015],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.1,0.015],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.1,0.02],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.095,0.02],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.085,0.03],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.06,0.065],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.025,0.11],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.01,0.135],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.005,0.165],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.02,0.19],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.035,0.225],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.055,0.27],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.065,0.31],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.345],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.365],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.375],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.39],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.405],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.42],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.43],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.44],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.45],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.075,0.455],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.07,0.455],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.07,0.455],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.065,0.455],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.06,0.445],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.06,0.425],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.055,0.39],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.055,0.345],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.055,0.27],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.05,0.175],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.045,0.075],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.03,-0.005],"color":[1,1,1,1],"size":5},{"type":"point","position":[-0.01,-0.085],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.015,-0.175],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.04,-0.26],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.065,-0.335],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.08,-0.375],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.09,-0.41],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.105,-0.455],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.12,-0.495],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.13,-0.525],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.135,-0.545],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.14,-0.565],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.145,-0.58],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.145,-0.595],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.15,-0.6],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.15,-0.605],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.15,-0.61],"color":[1,1,1,1],"size":5},{"type":"point","position":[0.15,-0.61],"color":[1,1,1,1],"size":5}]`;

const importInputTextBox = document.getElementById("importInput")

const setupWebGL = () => {
  // Retrieve <canvas> element
  canvas = document.getElementById("webgl");

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }
  
  // enable transparency
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};

const connectVariablesToGLSL = () => {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, "u_Size");
  if (!u_Size) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }
  g_buffer = gl.createBuffer();
  if (!g_buffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }
};

const renderAllShapes = () => {
  //
  let startTime = performance.now();
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);



  gl.uniform4f(u_FragColor, 1, 1, 1, 1);
  drawTriangle3D([-1.0, 0.0, 0.0, -0.5, -1.0, 0.0, 0.0, 0.0, 0.0])

  const body = new Cube();
  body.color = [1.0, 0.0, 0.0, 1.0];
  body.render();

  let duration = performance.now() - startTime;
  const len = "placeholder"
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

const convertCoordinatesEventToGL = (ev) => {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return [x, y];
};

function click(ev) {
  [x, y] = convertCoordinatesEventToGL(ev);

  // Store the coordinates to g_points array
  let point;

  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else {
    point = new Circle();
    point.segments = document.getElementById("segmentSlide").value;
  }

  point.position = [x, y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);
  renderAllShapes();
}
const resetHtmlSliders = () => {
  document.getElementById("segmentSlide").value = 10;
  document.getElementById("redSlide").value = 100;
  document.getElementById("redSlide").value = 100;
  document.getElementById("greenSlide").value = 100;
  document.getElementById("blueSlide").value = 100;
  document.getElementById("opacitySlide").value = 100;
  document.getElementById("sizeSlide").value = 5;
};

const addActionsForHtmlUI = () => {
  importInputTextBox.value = "Invalid preset format!";
  document.getElementById("green").onclick = function () {
    g_selectedColor = [0.0, 1.0, 0.0, 1.0];
  };
  document.getElementById("red").onclick = function () {
    g_selectedColor = [1.0, 0.0, 0.0, 1.0];
  };

  document.getElementById("pointButton").onclick = function () {
    g_selectedType = POINT;
  };
  document.getElementById("triangleButton").onclick = function () {
    g_selectedType = TRIANGLE;
  };
  document.getElementById("circleButton").onclick = function () {
    g_selectedType = CIRCLE;
  };
  document.getElementById("clearButton").onclick = function () {
    g_shapesList = [];
    renderAllShapes();
  };

  document.getElementById("exportButton").onclick = function () {
    exportPreset();
  };
  document.getElementById("importButton").onclick = function () {
    importPreset();
  };
  document.getElementById("myCoolPicture").onclick = function () {
    const drawingObj = new Drawing();
    g_shapesList.push(drawingObj);
    renderAllShapes();
  };

  document.getElementById("redSlide").addEventListener("mouseup", function () {
    g_selectedColor[0] = this.value / 100;
  });
  document
    .getElementById("greenSlide")
    .addEventListener("mouseup", function () {
      g_selectedColor[1] = this.value / 100;
    });
  document.getElementById("blueSlide").addEventListener("mouseup", function () {
    g_selectedColor[2] = this.value / 100;
  });
  document.getElementById("sizeSlide").addEventListener("mouseup", function () {
    g_selectedSize = this.value;
  });
  document.getElementById("opacitySlide").addEventListener("mouseup", function () {
    g_selectedColor[3] = this.value / 100;
  });
};

const exportPreset = () => {
  const exportedPreset = JSON.stringify(g_shapesList);
  //console.log(current_preset)
  importInputTextBox.value = exportedPreset;
};
const importPreset = () => {
  const currentPreset = importInputTextBox.value;
  try {
    const parsedJson = JSON.parse(currentPreset);
    g_shapesList = parsedJson.map((s) => {
      switch (s.type) {
        case "point":
          shape = new Point();
          break;
        case "triangle":
          shape = new Triangle();
          break;
        case "circle":
          shape = new Circle();
          shape.segments = s.segments;
          break;
        case "drawing":
          shape = new Drawing();
          break;
        default:
          shape = new Point();
      }
      shape.position = s.position;
      shape.color = s.color;
      shape.size = s.size;
      return shape;
    });
    renderAllShapes();
  } catch {
    g_shapesList = [];
    importInputTextBox.value = "Invalid preset format!";
    renderAllShapes();
    console.log("invalid json");
  }
};

function main() {

  // so if you reload the page everyhting is clean
  resetHtmlSliders();
  //setup canvas and gl variables
  setupWebGL();

  // setup glsl shader programs and connect glsl variables
  connectVariablesToGLSL();

  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = (ev) => {
    click(ev);
  };
  canvas.onmousemove = (ev) => {
    if (ev.buttons == 1) {
      click(ev);
    }
  };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  renderAllShapes();

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);
  // temp
}
