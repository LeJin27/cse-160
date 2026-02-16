
const loadImage = (url, index) => {

  var image = new Image(); // Create an image object
  if (!image) {
    console.log('Failed to create hte image object')
  }

  image.onload = function(){ sendImageToGLSL(image, index); };
  image.src = url

  return true;
}

const sendImageToGLSL = (image, index) => { 
  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); 
  // Enable the texture unit 0
  gl.activeTexture(gl.TEXTURE0 + index);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler, index);

//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw a rectangle
  console.log("Finsished loading texture")
  g_textures[index] = texture;
}

const useTexture = (index) => {
  const texture = g_textures[index];
  if (!texture) {
    return false
  }
  gl.activeTexture(gl.TEXTURE0 + index);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(u_Sampler, index);
  return true;

}