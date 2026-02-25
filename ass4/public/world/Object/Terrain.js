let g_wallVBO = null;
let g_wallVertexCount = 0;


let walls = [
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
[4,3,0,0,0,2,0,0,0,4,0,0,1,0,0,0,0,3,0,0,0,2,0,0,4,0,0,0,0,1,0,4],
[4,0,0,4,0,0,0,3,0,0,0,0,0,0,2,0,0,0,0,4,0,0,0,0,0,0,3,0,0,0,0,4],
[4,0,1,0,0,0,4,0,0,0,0,2,0,0,0,0,4,0,0,0,0,0,1,0,0,0,0,0,4,0,0,4],
[4,0,0,0,0,3,0,0,1,0,0,0,0,4,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,4],
[4,0,0,2,0,0,0,0,0,0,4,0,0,0,0,3,0,0,0,0,4,0,0,0,0,0,1,0,0,0,0,4],
[4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,3,0,0,0,0,0,4,0,4],
[4,0,3,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,2,0,0,0,4],
[4,0,0,0,0,4,0,0,0,0,0,0,0,3,0,0,0,0,2,0,0,0,0,0,4,0,0,0,0,0,0,4],
[4,0,0,0,1,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,3,0,0,0,0,0,0,4,0,0,0,4],

[4,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,3,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,4],
[4,0,0,0,3,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,4,0,0,0,0,0,0,2,0,0,4],
[4,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,4,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4],
[4,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],

[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
];

function setupWallMesh(walls) {
  const verts = [];

  for (let rowIndex = 0; rowIndex < walls.length; rowIndex++) {
    const offsetRowIndex = walls.length * -1 + rowIndex + (walls.length / 2);
    const currentRow = walls[rowIndex];

    for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
      const offsetColIndex = walls[0].length * -1 + colIndex + (currentRow.length / 2);
      const currentWallHeight = currentRow[colIndex];

      if (currentWallHeight >= 1) {
        for (let y = 0; y < currentWallHeight; y++) {
          helperWallAppend(verts, offsetColIndex, y - 1, offsetRowIndex);
        }
      }
    }
  }

  const data = new Float32Array(verts);
  g_wallVertexCount = data.length / 5; 

  if (!g_wallVBO) g_wallVBO = gl.createBuffer();

  gl.uniform1i(u_WhichTexture, TEXTURE_TYPE_CUSTOM);
  useTexture(TEXTURE_01_INDEX);
  gl.bindBuffer(gl.ARRAY_BUFFER, g_wallVBO);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
}

function updateWallMesh() {
  if (!g_wallVBO || g_wallVertexCount === 0) return;

  gl.bindBuffer(gl.ARRAY_BUFFER, g_wallVBO);

  const stride = 5 * 4; // 5 floats per vertex * 4 bytes
  const posOffset = 0;
  const uvOffset = 3 * 4;

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, stride, posOffset);
  gl.enableVertexAttribArray(a_Position);

  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, stride, uvOffset);
  gl.enableVertexAttribArray(a_UV);

  const identityMatrix = new Matrix4();
  identityMatrix.translate(-0.5, 0.5, -.5);
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityMatrix.elements);

  gl.uniform1i(u_WhichTexture, TEXTURE_TYPE_CUSTOM); 
  useTexture(TEXTURE_02_INDEX);

  gl.drawArrays(gl.TRIANGLES, 0, g_wallVertexCount);
}

function helperWallAppend(verts, x, y, z) {
  function tri(ax,ay,az, au,av, bx,by,bz, bu,bv, cx,cy,cz, cu,cv) {
    verts.push(
      ax+x, ay+y, az+z, au, av,
      bx+x, by+y, bz+z, bu, bv,
      cx+x, cy+y, cz+z, cu, cv
    );
  }

  tri(0,0,0, 0,0,   0,1,0, 0,1,   1,1,0, 1,1);
  tri(0,0,0, 0,0,   1,1,0, 1,1,   1,0,0, 1,0);

  // BACK
  tri(1,0,1, 0,0,   1,1,1, 0,1,   0,1,1, 1,1);
  tri(1,0,1, 0,0,   0,1,1, 1,1,   0,0,1, 1,0);

  // TOP
  tri(0,1,1, 0,0,   0,1,0, 0,1,   1,1,0, 1,1);
  tri(0,1,1, 0,0,   1,1,0, 1,1,   1,1,1, 1,0);

  // BOTTOM
  tri(0,0,0, 0,0,   0,0,1, 0,1,   1,0,1, 1,1);
  tri(0,0,0, 0,0,   1,0,1, 1,1,   1,0,0, 1,0);

  // LEFT
  tri(0,0,1, 0,0,   0,1,1, 0,1,   0,1,0, 1,1);
  tri(0,0,1, 0,0,   0,1,0, 1,1,   0,0,0, 1,0);

  // RIGHT
  tri(1,0,0, 0,0,   1,1,0, 0,1,   1,1,1, 1,1);
  tri(1,0,0, 0,0,   1,1,1, 1,1,   1,0,1, 1,0);
}


function drawRocks() {

  for (let rowIndex = 0; rowIndex < walls.length; rowIndex++) {
    const offsetRowIndex = walls.length * -1 + rowIndex + (walls.length / 2);
    const currentRow = walls[rowIndex];

    for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
      const offsetColIndex = walls[0].length * -1 + colIndex + (currentRow.length / 2);
      const currentWallHeight = currentRow[colIndex];

      if (currentWallHeight >= 1) {
          var block = new Cube();
          block.setCustomTexture(1);
          block.matrix.scale(1, 1, 1);
          block.matrix.translate(offsetColIndex, 4, offsetRowIndex);
          block.render();
        //for (let y = 0; y < currentWallHeight; y++) {
        //  helperWallAppend(verts, offsetColIndex, y - 1, offsetRowIndex);
        //}
      }
    }
  }

}