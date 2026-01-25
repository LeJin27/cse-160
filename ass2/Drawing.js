class Drawing {
  constructor( ) {
    this.type = 'drawing';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }
  render = () => {
    let rgba = [0.4, 1.0, 1.0, 1.0];
    const triangleInitials = [
      [2, -1, -1, -2, 2, -2],
      [2, -2, 1, -2, 2, -5],
      [2, -5, 0, -5, 2, -4],
      [3, -1, 3, -5, 4, -5],
      [3, -5, 5, -5, 5, -4],
    ];
    drawDrawingHelper(rgba, triangleInitials);
    const triangleCreeperBody = [
      [-1, -3, -5, -3, -5, 4],
      [-5, 4, -1, 4, -1, -3],
      [-3, -3, -5, -3, -5, -5],
      [-1, -5, -3, -3, -1, -3],
    ];

    rgba = [0, 1.0, 0, 1.0];
    drawDrawingHelper(rgba, triangleCreeperBody);

    const triangleCreeperFace = [
      [-5, 2, -4, 3, -3, 2],
      [-3, 2, -2, 3, -1, 2],
      [-2, 0, -3, 1, -4, 0],
      [-2, -2, -2, 0, -3, 0],
      [-4, -2, -3, 0, -4, 0],
    ];

    rgba = [0.0, 0.0, 0, 1.0];
    drawDrawingHelper(rgba, triangleCreeperFace);
  };
}
function drawDrawingHelper(rgba, listOfTriangles) {
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

  const conversion = 0.2;
  listOfTriangles.map((vList) => {
    const triangle = vList.map((value) => value * conversion);
    drawTriangle(triangle);
  });
}
