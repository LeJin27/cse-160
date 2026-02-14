


const updateAnimationAngles = () => {
  const speed = Date.now() / 90;
};

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
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }
};



function main() {
  // so if you reload the page everyhting is clean
  //setup canvas and gl variables
  setupWebGL();

  // setup glsl shader programs and connect glsl variables
  connectGlobalsToGLSL();

  addActionsForHtmlUI();



  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  requestAnimationFrame(updateFrame);

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);
  // temp
}
