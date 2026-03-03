// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;

  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position =  u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
    v_Normal = a_Normal;
    v_VertPos = u_ModelMatrix * a_Position;
  }
`

// Fragment shader program
var FSHADER_SOURCE =
`
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler;
  uniform int u_WhichTexture;
  uniform bool u_LightOn;
  uniform int u_SpecularSetting;
  uniform vec3 u_LightPos;
  uniform vec3 u_CameraPos;

  void main() {
    if (u_WhichTexture == -3) {
      gl_FragColor = vec4((v_Normal + 1.0) / 2.0, 1.0);
    } else if (u_WhichTexture == -2) { // use color
      gl_FragColor = u_FragColor;
    } else if (u_WhichTexture == -1) { // uv debug color
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_WhichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler, v_UV);  // customTexture
    } else {
      gl_FragColor = vec4(1, .2, .2, 1); // red error color
    }


    vec3 lightVector =  u_LightPos- vec3(v_VertPos);


    float r = length(lightVector);
    //if (r < 1.0) {
    //  gl_FragColor = vec4(1,0,0,1);
    //} else if (r<2.0) {
    // gl_FragColor = vec4(0,1, 0,1);
    //}
    //gl_FragColor = vec4(vec3(gl_FragColor) / (r * r), 1);
    vec3 L = normalize(lightVector);
    vec3 N = normalize(v_Normal);
    float nDotL = max(dot(N, L), 0.0);

    // reflection
    vec3 R = reflect(-L, N);
    // eye
    vec3 E = normalize(u_CameraPos - vec3(v_VertPos));

    float specular = pow(max(dot(E, R), 0.0), 200.0);

    vec3 diffuse = vec3(gl_FragColor) * nDotL * 0.7;
    vec3 ambient = vec3(gl_FragColor) * 0.3;

    vec3 lightingConstant = diffuse + ambient;
    if (u_SpecularSetting == 1 ) {
      lightingConstant += specular;
    }
    if (u_LightOn) {
      gl_FragColor = vec4(lightingConstant, 1.0);
    }
  }
`