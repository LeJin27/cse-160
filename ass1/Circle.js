
class Circle {
  constructor( ) {
    this.type = 'circle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
    this.segments= 10;
  }

  render () {
    var xy = this.position;
    var rgba = this.color;

    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);




    // draw
    const delta = this.size / 200.0;
    let angleStep = 360 / this.segments
    for (let angle = 0; angle < 360; angle += angleStep) {
      let centerPt = [xy[0], xy[1]];
      let angleOne = angle
      let angleTwo = angle + angleStep

      // decimal conversion for one
      const decConvOne = angleOne * Math.PI / 180
      // decimal conversion for two
      const decConvTwo = angleTwo * Math.PI / 180
      let vecOne = [Math.cos(decConvOne) * delta, Math.sin(decConvOne) * delta];
      let vecTwo = [Math.cos(decConvTwo) * delta, Math.sin(decConvTwo) * delta];

      let ptOne = [centerPt[0] + vecOne[0], centerPt[1] + vecOne[1]];
      let ptTwo = [centerPt[0] + vecTwo[0], centerPt[1] + vecTwo[1]];

      drawTriangle([xy[0], xy[1], ptOne[0], ptOne[1], ptTwo[0], ptTwo[1]]);
    }
  }

}
