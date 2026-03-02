class Cube {
  constructor( ) {
    this.type = 'cube';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureType = 0;
    this.isCustomTexture = false;
    this.customTextureIndex = 0;
    this.isPlane = false;
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
    if (!this.isPlane) {

    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    const frontNormals = [0,0,-1, 0,0,-1, 0,0,-1]
    drawTriangle3DUVNormal([0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1], frontNormals);
    drawTriangle3DUVNormal([0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0], frontNormals);



    // back face
    //rgba_lower_light = rgba.map((color) => color * 0.9)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    const backNormals = [0,0,1, 0,0,1, 0,0,1]
    drawTriangle3DUVNormal([1,0,1,  1,1,1,  0,1,1], [0,0, 0,1, 1,1], backNormals);
    drawTriangle3DUVNormal([1,0,1,  0,1,1,  0,0,1], [0,0, 1,1, 1,0], backNormals);

    // top face
    //rgba_lower_light = rgba.map((color) => color * 0.4)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    const topNormals = [0,1,0, 0,1,0, 0,1,0];
    drawTriangle3DUVNormal([0,1,1,  0,1,0,  1,1,0], [0,0, 0,1, 1,1],topNormals);
    drawTriangle3DUVNormal([0,1,1,  1,1,0,  1,1,1], [0,0, 1,1, 1,0],topNormals);




    //left face
    //rgba_lower_light = rgba.map((color) => color * 0.6)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    const leftNormals = [-1,0,0, -1,0,0, -1,0,0];
    drawTriangle3DUVNormal([0,0,1,  0,1,1,  0,1,0], [0,0, 0,1, 1,1], leftNormals);
    drawTriangle3DUVNormal([0,0,1,  0,1,0,  0,0,0], [0,0, 1,1, 1,0], leftNormals);

    // right face
    //rgba_lower_light = rgba.map((color) => color * 0.8)
    const rightNormals = [1,0,0, 1,0,0, 1,0,0];
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3DUVNormal([1,0,0,  1,1,0,  1,1,1], [0,0, 0,1, 1,1], rightNormals);
    drawTriangle3DUVNormal([1,0,0,  1,1,1,  1,0,1], [0,0, 1,1, 1,0], rightNormals);
  }

    // bottom face
    //rgba_lower_light = rgba.map((color) => color * 0.5)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    const bottomNormals = [0,-1,0, 0,-1,0, 0,-1,0];
    drawTriangle3DUVNormal([0,0,0,  0,0,1,  1,0,1], [0,0, 0,1, 1,1], bottomNormals);
    drawTriangle3DUVNormal([0,0,0,  1,0,1,  1,0,0], [0,0, 1,1, 1,0], bottomNormals);
  }
}