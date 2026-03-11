

import * as THREE from "three";

export default class TexturedCube {
  constructor(scene, coordinates, scale) {
    this.scene = scene;
    this.animation = () => {};
    this.coordinates = coordinates;
    this.scale = scale;
    this.cube = null;
    this.animationOffset = Math.random();
  }

  render = async () => {
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    //const texturePathList = [
    //  "assets/images/flower-1.jpg",
    //  "assets/images/flower-2.jpg",
    //  "assets/images/flower-3.jpg",
    //  "assets/images/flower-4.jpg",
    //  "assets/images/flower-5.jpg",
    //  "assets/images/flower-6.jpg",
    //];

    //const materialList = await Promise.all(
    //  texturePathList.map(async (path) => {
    //    const texture = await loader.loadAsync(path);
    //    texture.colorSpace = THREE.SRGBColorSpace;

    //    return new THREE.MeshBasicMaterial({
    //      map: texture,
    //    });
    //  }),
    //);

    const path = 'assets/images/crystal.png';
    const texture = await loader.loadAsync(path);
     texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({
        map: texture,
    });

    const geometry = new THREE.BoxGeometry(this.scale, this.scale, this.scale);

    const cube = new THREE.Mesh(geometry, material);

    cube.position.copy(this.coordinates);
    this.cube = cube;
    this.scene.add(cube);
  };
  playAnimation = (time) => {
    if (!this.cube) return;
    const speed = 0.9;
    const offset =  this.animationOffset * 100;
    const rot = (time * speed) + offset;
    this.cube.rotation.x = rot;
    this.cube.rotation.y = rot;
    this.cube.rotation.z = rot;
  }


}
