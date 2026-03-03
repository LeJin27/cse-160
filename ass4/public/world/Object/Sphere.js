class Sphere {
  constructor( ) {
    this.type = 'sphere';
    //this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureType = 0;
    this.isCustomTexture = false;
    this.customTextureIndex = 0;
    this.specularSetting = 1;
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
    gl.uniform1i(u_SpecularSetting, this.specularSetting);
    gl.uniform1i(u_WhichTexture, this.textureType);


    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements)

    var d = Math.PI / 10;
    var dd = Math.PI / 10;


    for (let t = 0; t < Math.PI; t+=d) {
      for (let r = 0; r < (2 * Math.PI); r+=d) {

        let p1 = [sin(t) * cos(r) , sin(t) * sin(r), cos(t)];
        let p2 = [sin(t + dd) * cos(r), sin(t + dd) * sin(r), cos(t+dd)];
        let p3 = [sin(t) * cos(r+dd), sin(t) * sin(r+dd), cos(t)];
        let p4 = [sin(t+dd) * cos(r+dd), sin(t+dd) * sin(r+dd), cos(t+dd)];

        let v = [];
        let uv = [];
        v= v.concat(p1); uv=uv.concat([0,0]);
        v= v.concat(p2); uv=uv.concat([0,0]);
        v= v.concat(p4); uv=uv.concat([0,0]);
        gl.uniform4f(u_FragColor, 1,1,1,1);
        drawTriangle3DUVNormal(v, uv, v);

        v = []; uv = [];
        v= v.concat(p1); uv=uv.concat([0,0]);
        v= v.concat(p4); uv=uv.concat([0,0]);
        v= v.concat(p3); uv=uv.concat([0,0]);
        gl.uniform4f(u_FragColor, 1,0,0,1);
        drawTriangle3DUVNormal(v, uv, v);
      }

    }

    // front face

  }
}