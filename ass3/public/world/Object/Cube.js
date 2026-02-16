class Cube {
  constructor( ) {
    this.type = 'cube';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureType = 0;
    this.isCustomTexture = false;
    this.customTextureIndex = 0;
  }

  setColor = (rgb) => {
    this.textureType = TEXTURE_TYPE_COLOR;
    const rgbMappedCoords = rgb.map((value) => {
      return value / 255;
    })
    this.color = rgbMappedCoords;
  }

  setCustomTexture = (index) => {
    this.textureType = 0;
    this.isCustomTexture = true;
    this.customTextureIndex = index;
  }


  render () {
    var rgba = this.color;

    if (this.textureType === TEXTURE_TYPE_CUSTOM) {
      useTexture(this.customTextureIndex);
    }
    gl.uniform1i(u_WhichTexture, this.textureType);


    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements)

    // front face
    let rgba_lower_light = rgba
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUV([0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0]);

    // back face
    //rgba_lower_light = rgba.map((color) => color * 0.9)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUV([1,0,1,  1,1,1,  0,1,1], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([1,0,1,  0,1,1,  0,0,1], [0,0, 1,1, 1,0]);

    // top face
    ///rgba_lower_light = rgba.map((color) => color * 0.4)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUV([0,1,1,  0,1,0,  1,1,0], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,1,1,  1,1,0,  1,1,1], [0,0, 1,1, 1,0]);


    // bottom face
    //rgba_lower_light = rgba.map((color) => color * 0.5)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUV([0,0,0,  0,0,1,  1,0,1], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,0,0,  1,0,1,  1,0,0], [0,0, 1,1, 1,0]);

    //left face
    //rgba_lower_light = rgba.map((color) => color * 0.6)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUV([0,0,1,  0,1,1,  0,1,0], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,0,1,  0,1,0,  0,0,0], [0,0, 1,1, 1,0]);

    // right face
    //rgba_lower_light = rgba.map((color) => color * 0.8)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUV([1,0,0,  1,1,0,  1,1,1], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([1,0,0,  1,1,1,  1,0,1], [0,0, 1,1, 1,0]);
  }
}