// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "uniform mat4 u_ModelMatrix;\n" +
  "uniform mat4 u_GlobalRotateMatrix;\n" +
  "void main() {\n" +
  "gl_Position =  u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n" +
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
let u_ModelMatrix;
let u_GlobalRotateMatrix;
// globals for ui
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
let g_selectedType = POINT;
// vertext
let g_buffer;
let g_yellowAngle = 0;

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
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
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

  g_buffer = gl.createBuffer();
  if (!g_buffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(
    gl.program,
    "u_GlobalRotateMatrix",
  );
  if (!u_GlobalRotateMatrix) {
    console.log("Failed to get the storage location of u_GlobalRotateMatrix");
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if (!u_ModelMatrix) {
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;
  }

  let identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
};


const animationList = {
  ANIMATION_RIGHT_FRONT_LEG: 0,
  ANIMATION_LEFT_FRONT_LEG: 0,
  ANIMATION_RIGHT_BACK_LEG: 0,
  ANIMATION_LEFT_BACK_LEG_JOINT: 0,
  ANIMATION_RIGHT_BACK_LEG_JOINT: 0,
  ANIMATION_LEFT_BACK_LEG: 0,
  ANIMATION_NOSE_TWITCH: 0,
  ANIMATION_RIGHT_EAR: 0,
  ANIMATION_LEFT_EAR: 0,
  ANIMATION_FACE: 0,
  ANIMATION_FUR: 0,
  ANIMATION_TAIL_ONE: 0,
  ANIMATION_TAIL_TWO: 0,
  ANIMATION_TAIL_THREE: 0,
  ANIMATION_HEAD_SIZE: 0,
  ANIMATION_BODY_SIZE: 0,
};



const CONTROLLER_SETTING_ON = 1
const CONTROLLER_SETTING_OFF = 2
const CONTROLLER_CUSTOM_ANIM = 3
let g_controller_play = CONTROLLER_SETTING_OFF

const updateAnimationAngles = () => {
  const speed = Date.now() / 90;
  if (g_controller_play === CONTROLLER_SETTING_ON) {
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
  } else if (g_controller_play === CONTROLLER_CUSTOM_ANIM) {
    animationList.ANIMATION_NOSE_TWITCH = 10 * Math.sin(speed);
    animationList.ANIMATION_HEAD_SIZE =((Math.sin(speed) + 1) / 2);
    animationList.ANIMATION_BODY_SIZE =((Math.sin(speed) + 1) / 2);
  }
};

let g_globalAngleX = 10;
let g_globalAngleY = -10;
let g_globalZoom = 1;

let g_startTime = performance.now() / 1000.0;
let g_seconds = performance.now() / 1000.0 - g_startTime;

const tick = () => {
  g_seconds = performance.now() / 1000.0 - g_startTime;
  //console.log(g_seconds);

  updateAnimationAngles();
  renderScene();
  requestAnimationFrame(tick);
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
  g_globalAngleX = Math.sin(x) * -180;
  g_globalAngleY = Math.sin(y) * 180;
}

const resetHtmlSliders = () => {
  document.getElementById("angleSlideX").value = g_globalAngleX;
  document.getElementById("angleSlideY").value = g_globalAngleY;
  document.getElementById("zoomSlide").value = g_globalZoom;
};

const updateAnimationSlider = (elementId) => {
  document.getElementById(elementId).addEventListener("input", function () { 
    animationList[elementId] = this.value; 
    console.log(elementId)
    if (elementId === "ANIMATION_HEAD_SIZE" || elementId === "ANIMATION_BODY_SIZE") {
      animationList[elementId] = this.value / 100;
      console.log(this.value / 100);
    }

    renderScene(); g_controller_play = false});
}

const addActionsForHtmlUI = () => {
  document
    .getElementById("angleSlideX")
    .addEventListener("input", function () {
      g_globalAngleX = this.value;

      document.getElementById("angleSlideY");
      renderScene();
    });
  document.getElementById("angleSlideY")
    .addEventListener("input", function () {
      g_globalAngleY = this.value;
      renderScene();
  });

  document
    .getElementById("zoomSlide")
    .addEventListener("input", function () {
      g_globalZoom = 1 + (this.value / 100);
      renderScene();
    });


  
    Object.keys(animationList).map((currentKey) => {
      updateAnimationSlider(currentKey)
    })

  document.getElementById("toggleAnimation").onclick = (e) => {
    if (g_controller_play === CONTROLLER_SETTING_ON) {
      g_controller_play = CONTROLLER_SETTING_OFF;
    } else {
      resetAnimationSliders();
      g_controller_play = CONTROLLER_SETTING_ON

    }

  };
  document.getElementById("resetSliders").onclick = (e) => {
    resetAnimationSliders();
  };


  document.addEventListener("click", (e) => {shiftKeyIsPressed(e)});


};
const resetAnimationSliders = () => {
  g_controller_play = CONTROLLER_SETTING_OFF
  Object.keys(animationList).map((key) => {
    animationList[key] = 0;
  })
}


const shiftKeyIsPressed = (e) =>{
  const isPressed = e.shiftKey
  if (isPressed) {
    resetAnimationSliders();
    g_controller_play = CONTROLLER_CUSTOM_ANIM;
    console.log("Htesthioaeoth")
    
  }
}

function main() {
  // so if you reload the page everyhting is clean
  resetHtmlSliders();
  //setup canvas and gl variables
  setupWebGL();

  // setup glsl shader programs and connect glsl variables
  connectVariablesToGLSL();

  addActionsForHtmlUI();

  canvas.onmousedown = (ev) => {
    if (!ev.shiftKey) {
      click(ev);
    }
  };
  canvas.onmousemove = (ev) => {
    if (!ev.shiftKey) {
      if (ev.buttons == 1) {
        click(ev);
      }
    }
  };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  requestAnimationFrame(tick);

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);
  // temp
}
