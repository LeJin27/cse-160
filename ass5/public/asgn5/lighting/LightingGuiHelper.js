import * as THREE from "three";
export default function makeXYZGuiHelper(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -20, 20).onChange(onChangeFn);
  folder.add(vector3, 'y', 0, 20).onChange(onChangeFn);
  folder.add(vector3, 'z', -20, 20).onChange(onChangeFn);
  folder.open();
}

export class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return '#' + this.object[this.prop].getHexString();
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}
export class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj;
    this.prop = prop;
  }
  get value() {
    return THREE.MathUtils.radToDeg(this.obj[this.prop]);
  }
  set value(v) {
    this.obj[this.prop] = THREE.MathUtils.degToRad(v);
  }
}



export const updateLightAndVisualizerHelper = (light, lightVisualizer) => {
  light.target.updateMatrixWorld();
  lightVisualizer.update();
}