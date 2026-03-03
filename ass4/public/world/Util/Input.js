const addActionsForHtmlUI = () => {
  canvas.addEventListener(
    "wheel",
    (ev) => {zoomScroll(ev)}, { passive: false },
  );
  //canvas.onmousedown = (ev) => {
  //  if (!ev.shiftKey) {
  //    mouseClick(ev);
  //  }
  //};
  //canvas.onmousemove = (ev) => {
  //  if (!ev.shiftKey) {
  //    if (ev.buttons == 1) {
  //      mouseClick(ev);
  //    }
  //  }
  //};
    document.getElementById('lightOff').onclick = () => {
    g_lightOn = false;
    updateScene();

  }
  document.getElementById('lightOn').onclick = () => {
    g_lightOn = true;
    updateScene();
  }

  document.getElementById('normalOn').onclick = () => {
    g_normalOn = true;

  }
  document.getElementById('normalOff').onclick = () => {
    g_normalOn = false;
  }
  document.getElementById('cameraMovement').onclick = () => {
    g_cameraMovement = !g_cameraMovement;
    console.log(g_cameraMovement);
  }


canvas.addEventListener("mousedown", (ev) => {
  if (ev.button !== 0) return;
  //canvas.requestPointerLock();
});


addEventListener("mousemove", (ev) => { 
  const dx = ev.movementX;

  const dy = ev.movementY;
  const sensitivity = 0.2;
  if (g_cameraMovement) {
    g_camera.rotate(-dx * sensitivity);
    g_camera.pitch(-dy * sensitivity);

  }
})

document.addEventListener("keydown", (ev) => {
  const keyLetter = ev.key.toLowerCase();
  g_keyPressed[keyLetter] = true
});

document.addEventListener("keyup", (ev) => {
  const keyLetter = ev.key.toLowerCase();
  g_keyPressed[keyLetter] = false
});
document.getElementById("lightSliderX").addEventListener("input", function () {
  g_lightPos[0] = this.value / 100;
  updateScene();
});

document.getElementById("lightSliderY").addEventListener("input", function () {
  g_lightPos[1] = this.value / 100;
  updateScene();
});

document.getElementById("lightSliderZ").addEventListener("input", function () {
  g_lightPos[2] = this.value / 100;
  updateScene();
});


};


const zoomScroll = (ev) => {
  const clamp = (zoom, lo, hi) => Math.max(lo, Math.min(hi, zoom));
  ev.preventDefault();

  const zoomSpeed = 0.0015;
  g_globalZoom *= Math.exp(-ev.deltaY * zoomSpeed);
  g_globalZoom = clamp(g_globalZoom, 0.2, 5.0);
}

const convertCoordinatesEventToGL = (ev) => {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();
  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  return [x, y];
};

function mouseClick(ev) {
  [x, y] = convertCoordinatesEventToGL(ev);
  g_globalAngleX = Math.sin(x) * -180;
  g_globalAngleY = Math.sin(y) * 180;
}

