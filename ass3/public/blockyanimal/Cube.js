class Cube {
  constructor( ) {
    this.type = 'cube';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
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

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements)

    // front face
    drawTriangle3D([0,0,0, 1,1,0, 1,0,0])
    drawTriangle3D([0,0,0, 0,1,0, 1,1,0])

    // top face
    let rgba_lower_light = rgba.map((color) => color * 0.9)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    // front
    drawTriangle3D([0,1,0, 0,1,1, 1,1,1])
    drawTriangle3D([0,1,0, 1,1,1, 1,1,0])
    // back face
    rgba_lower_light = rgba.map((color) => color * 0.4)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3D([0,0,1, 1,1,1, 1,0,1])
    drawTriangle3D([0,0,1, 0,1,1, 1,1,1])
    // bottom face
    rgba_lower_light = rgba.map((color) => color * 0.5)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3D([0,0,0, 0,0,1, 1,0,1])
    drawTriangle3D([0,0,0, 1,0,1, 1,0,0])


    //left face
    rgba_lower_light = rgba.map((color) => color * 0.6)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3D([0,0,0, 0,0,1, 0,1,1])
    drawTriangle3D([0,1, 1, 0,0,0, 0,1,0])


    // right face
    rgba_lower_light = rgba.map((color) => color * 0.8)
    gl.uniform4f(u_FragColor, rgba_lower_light[0], rgba_lower_light[1], rgba_lower_light[2], rgba[3]);
    drawTriangle3D([1,0,0,  1,0,1, 1,1,1])
    drawTriangle3D([1,1, 1, 1,0,0, 1,1,0])

  }

}
// 