
let canvas;
let gl;

const g_keyPressed = {}

// params
let a_Position;
let a_UV;
let a_Normal;
let u_FragColor;
let u_WhichTexture;
let u_LightPos;
let u_LightOn;
let g_lightOn = true;
let u_CameraPos;



// camera
let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_globalZoom = 1;
let g_normalOn = true;
let g_cameraMovement = true;

//let g_eye = [0, 0, 3]
//let g_at = [0, 0, -100]
//let g_up = [0, 1, 0]

const ORANGE_COLOR = [255, 158, 92, 255]
const WHITE_COLOR = [255, 255, 255, 255]
const GRASS_COLOR = [199, 234, 70, 255]
const SKY_COLOR = [0, 0, 153, 255]

// frame timing
let g_startTime = performance.now() / 1000.0;
let g_seconds = performance.now() / 1000.0 - g_startTime;

// webgl 
let g_buffer;
let g_uvBuffer;
let g_normalBuffer;

let g_lightPos = [0, 1, -2]

// matrix
let u_ModelMatrix;
let u_NormalMatrix;
let u_SpecularSetting;
let u_GlobalRotateMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;

let g_camera = new Camera()
g_camera.ascend(1)
//g_camera.eye.add(new Vector([0, 5, 0]));
//g_camera.at.add(new Vector([0, 5, 0]));

let g_lastX = 0;
let g_lastY = 0;


let u_textureListSize = 2;
let u_textureList = [];
let u_Sampler;


// floor
const TEXTURE_01 = 'Assets/01_texture.png'
// building
const TEXTURE_02 = 'Assets/02_texture.png'
const TEXTURE_LIST = [TEXTURE_01, TEXTURE_02];

// used for choosing textures
const TEXTURE_01_INDEX = 0;
const TEXTURE_02_INDEX = 1;

const TEXTURE_TYPE_COLOR = -2;
const TEXTURE_TYPE_CUSTOM = 0;
const TEXTURE_TYPE_UV = -1;

// add to glsl

let g_textures = []

const connectGlobalsToGLSL = () => {
  TEXTURE_LIST.forEach((value, index) => {
      loadImage(value, index)
  })

  u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Texture');
    return false;
  }
    u_SpecularSetting = gl.getUniformLocation(gl.program, 'u_SpecularSetting');
  if (!u_SpecularSetting) {
    console.log('Failed to get the storage location of u_SpecularSetting');
    return false;
  }

    u_LightOn = gl.getUniformLocation(gl.program, 'u_LightOn');
  if (!u_LightOn) {
    console.log('Failed to get the storage location of u_LightOn');
    return false;
  }
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

  a_Normal = gl.getAttribLocation(gl.program, "a_Normal");
  if (a_Normal < 0) {
    console.log("Failed to get the storage location of a_Normal");
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }
  u_LightPos = gl.getUniformLocation(gl.program, "u_LightPos");
  if (!u_LightPos) {
    console.log("Failed to get the storage location of u_LightPos");
    return;
  }
  u_CameraPos = gl.getUniformLocation(gl.program, "u_CameraPos");
  if (!u_CameraPos) {
    console.log("Failed to get the storage location of u_CameraPos");
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
  g_normalBuffer = gl.createBuffer();
  if (!g_normalBuffer) {
    console.log("Failed to create the normal buffer object");
    return -1;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, "u_GlobalRotateMatrix",);
  if (!u_GlobalRotateMatrix) {
    console.log("Failed to get the storage location of u_GlobalRotateMatrix");
    return;
  }
  u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix",);
  if (!u_NormalMatrix) {
    console.log("Failed to get the storage location of u_NormalMatrix");
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



  setupWallMesh(walls);

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

let g_Teapot;
