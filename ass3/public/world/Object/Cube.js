class Cube {
  constructor( ) {
    this.type = 'cube';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = 0;
  }

  setColor = (rgb) => {
    //console.log(rgb)
    const rgbMappedCoords = rgb.map((value) => {
      return value / 255;
    })
    this.color = rgbMappedCoords;
    //console.log(this.color)
  }

  render () {
    var rgba = this.color;

    gl.uniform1i(u_WhichTexture, this.textureNum);

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements)

    // front face
    drawTriangle3DUV([0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0]);

    // back face
    drawTriangle3DUV([1,0,1,  1,1,1,  0,1,1], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([1,0,1,  0,1,1,  0,0,1], [0,0, 1,1, 1,0]);

    // top face
    drawTriangle3DUV([0,1,1,  0,1,0,  1,1,0], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,1,1,  1,1,0,  1,1,1], [0,0, 1,1, 1,0]);


    // bottom face
    drawTriangle3DUV([0,0,0,  0,0,1,  1,0,1], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,0,0,  1,0,1,  1,0,0], [0,0, 1,1, 1,0]);

    //left face
    drawTriangle3DUV([0,0,1,  0,1,1,  0,1,0], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([0,0,1,  0,1,0,  0,0,0], [0,0, 1,1, 1,0]);

    // right face
    drawTriangle3DUV([1,0,0,  1,1,0,  1,1,1], [0,0, 0,1, 1,1]);
    drawTriangle3DUV([1,0,0,  1,1,1,  1,0,1], [0,0, 1,1, 1,0]);
  }
}