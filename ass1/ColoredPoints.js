// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  'gl_Position = a_Position;\n' +
  'gl_PointSize = u_Size;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';


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
let g_selectedType = POINT;
let g_shapesList = []; // array holds shapes
// vertext 
let g_buffer;








const setupWebGL = () => {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

const connectVariablesToGLSL = () => {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  g_buffer = gl.createBuffer();
  if (!g_buffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

}



const renderAllShapes = () => {

  // 
  let startTime = performance.now();


  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  let len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render()
  }

  let duration = performance.now() - startTime
  sendTextToHtml(`numdo: ${len} ms: ${Math.floor(duration)} fps: ${Math.floor(10000/duration)}`, "numdot")
}

const sendTextToHtml = (text, htmlID) => {
  const htmlElem = document.getElementById(htmlID);
  if (!htmlElem) {
    console.log(`Failed to get ${htmlID} from HTML`)
    return;
  }
  htmlElem.innerHTML = text;

}


const convertCoordinatesEventToGL = (ev) => {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x, y])
}



function click(ev) {
  [x, y] = convertCoordinatesEventToGL(ev)

  // Store the coordinates to g_points array
  let point;

  if (g_selectedType == POINT) {
    point = new Point();
  } else {
    point = new Triangle();

  }



  point.position = [x, y]
  point.color = g_selectedColor.slice()
  point.size = g_selectedSize
  g_shapesList.push(point);
  renderAllShapes()
}


const addActionsForHtmlUI = () => {
  document.getElementById('green').onclick = function() { 
    g_selectedColor = [0.0,1.0, 0.0, 1.0]
  }
  document.getElementById('red').onclick = function() { 
    g_selectedColor = [1.0, 0.0, 0.0, 1.0]
  }

  document.getElementById('pointButton').onclick = function() { 
    g_selectedType = POINT;
  }

  document.getElementById('triangleButton').onclick = function() { 
    g_selectedType = TRIANGLE;
  }
  document.getElementById('clearButton').onclick = function() { 
    g_shapesList = [];
    renderAllShapes()
  }
  document.getElementById('redSlide').addEventListener('mouseup', function() {g_selectedColor[0] = this.value / 100})
  document.getElementById('greenSlide').addEventListener('mouseup', function() {g_selectedColor[1] = this.value / 100})
  document.getElementById('blueSlide').addEventListener('mouseup', function() {g_selectedColor[2] = this.value / 100})
  document.getElementById('sizeSlide').addEventListener('mouseup', function() {g_selectedSize =  this.value} )

}

function main() {
  //setup canvas and gl variables
  setupWebGL();

  // setup glsl shader programs and connect glsl variables
  connectVariablesToGLSL();

  addActionsForHtmlUI()


  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = (ev) => { click(ev) };
  canvas.onmousemove = (ev) => { if (ev.buttons == 1) {click(ev) }};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}
