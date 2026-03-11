
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class LoadedObject {
  constructor(scene, coordinates, scale, objectPath) {
    this.scene = scene;
    this.coordinates = coordinates;
    this.scale = scale;
    this.animationOffset = Math.random();
    this.object = null;
    this.objectPath = objectPath;
  }
  render = async () => {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(this.objectPath);
    const gltfObject = gltf.scene;
    gltfObject.position.copy(this.coordinates);
    gltfObject.scale.copy(this.scale)
    this.scene.add(gltfObject);
    this.object = gltfObject;
    this.scene.add(gltfObject);
  };

  playAnimation = (time) => {
    if (!this.object) return;
    const speed = 0.9;
    const offset =  this.animationOffset * 100;
    const rot = (time * speed) + offset;
    this.object.rotation.y = rot;
  }


}
