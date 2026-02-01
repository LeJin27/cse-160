class Cone {
  constructor() {
    this.type = "cone";
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.segments = 24;
  }

  setColor = (rgb) => {
    //console.log(rgb)
    const rgbMappedCoords = rgb.map((value) => {
      return value / 255;
    });
    this.color = rgbMappedCoords;
    //console.log(this.color)
  };

  // chatgpt helped get the math
  render() {
    const rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    const segments = this.segments;

    const cx = 0.5,
      cz = 0.5;
    const baseY = 0.0;
    const tipY = 1.0;
    const r = 0.5;

    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;

      const x0 = cx + r * Math.cos(a0);
      const z0 = cz + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const z1 = cz + r * Math.sin(a1);

      drawTriangle3D([cx, tipY, cz, x0, baseY, z0, x1, baseY, z1]);
    }

    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;

      const x0 = cx + r * Math.cos(a0);
      const z0 = cz + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const z1 = cz + r * Math.sin(a1);

      drawTriangle3D([cx, baseY, cz, x1, baseY, z1, x0, baseY, z0]);
    }
  }
}
//
