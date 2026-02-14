
let canvas;
let gl;

const g_keyPressed = {}

// params
let a_Position;
let a_UV;
let u_FragColor;
let u_WhichTexture;



// camera
let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_globalZoom = 1;

//let g_eye = [0, 0, 3]
//let g_at = [0, 0, -100]
//let g_up = [0, 1, 0]

const ORANGE_COLOR = [255, 158, 92, 255]
const WHITE_COLOR = [255, 255, 255, 255]

// frame timing
let g_startTime = performance.now() / 1000.0;
let g_seconds = performance.now() / 1000.0 - g_startTime;

// webgl 
let g_buffer;
let g_uvBuffer;

// matrix
let u_ModelMatrix;
let u_GlobalRotateMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;

let g_camera = new Camera()

let g_map = 

[
  1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1,
]

let u_textureListSize = 2;
let u_textureList = [];

let u_Texture;


const TEXTURE_01 = 'Assets/01_texture.png'
const TEXTURE_02 = 'Assets/02_texture.png'

let g_textureURIList = [TEXTURE_01, TEXTURE_02];

const connectGlobalsToGLSL = () => {
  for (let textureIndex = 0; textureIndex < g_textureURIList.length; textureIndex ++ ) {
    loadImage(g_textureURIList[textureIndex], textureIndex)
  }
    // textures
  for (let index = 0; index < u_textureListSize; index ++) {
    const u_TextureIndex = 'u_Texture' + index;
    console.log(u_TextureIndex)
    u_textureList[index] = gl.getUniformLocation(gl.program, u_TextureIndex);
    if (!u_textureList[index]) {
      return false;
    }
  }
  //u_Texture = gl.getUniformLocation(gl.program, 'u_Texture');
  //if (!u_Texture) {
  //  console.log('Failed to get the storage location of u_Texture');
  //  return false;
  //}

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, "a_UV");
  if (a_UV < 0) {
    console.log("Failed to get the storage location of a_UV");
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }

  u_WhichTexture = gl.getUniformLocation(gl.program, 'u_WhichTexture');
  if (!u_WhichTexture) {
    console.log('Failed to get the storage location of u_WhichTexture');
    return false;
  }

  g_buffer = gl.createBuffer();
  if (!g_buffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }
  g_uvBuffer = gl.createBuffer();
  if (!g_uvBuffer) {
    console.log("Failed to create the uv buffer object");
    return -1;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix",);
  if (!u_GlobalRotateMatrix) {
    console.log("Failed to get the storage location of u_GlobalRotateMatrix");
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix",);
  if (!u_ViewMatrix) {
    console.log("Failed to get the storage location of u_ViewMatrix");
    return;
  }
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, "u_ProjectionMatrix",);
  if (!u_ProjectionMatrix) {
    console.log("Failed to get the storage location of u_ProjectionMatrix");
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