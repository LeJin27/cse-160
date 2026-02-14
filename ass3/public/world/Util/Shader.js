// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  `
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position =  u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }
`

// Fragment shader program
var FSHADER_SOURCE =
`
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Texture0;
  uniform sampler2D u_Texture1;
  uniform int u_WhichTexture;

  void main() {
    if (u_WhichTexture == -2) { // use color
      gl_FragColor = u_FragColor;
    } else if (u_WhichTexture == -1) { // uv debug color
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_WhichTexture == 0) {
      gl_FragColor = texture2D(u_Texture0, v_UV); //use texture 0
    } else if (u_WhichTexture == 1) {
      gl_FragColor = texture2D(u_Texture1, v_UV); //use texture 0
    } else {
      gl_FragColor = vec4(1, .2, .2, 1); // red error color
    }
  }
`