import * as THREE from "three";

export const generatedCubeList = () => {
  const generatedList = [];

  const offset = 3;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      console.log(`${i} ${j}`)
      generatedList.push({
        position: new THREE.Vector3(i * offset, 10, j * offset),
        scale: 1,
      });
    }
  }
  return generatedList;
};

export const texturedCubeList = [
  {
    position: new THREE.Vector3(5, 2, 2),
    scale: 2,
  },
  {
    position: new THREE.Vector3(3, 5, 3),
    scale: 2,
  },
  {
    position: new THREE.Vector3(-3, 3, -6),
    scale: 2,
  },
  {
    position: new THREE.Vector3(-5, 5, 5),
    scale: 2,
  },
];

export const objectPresets = [
  {
    position: new THREE.Vector3(2, 0, -10),
    scale: new THREE.Vector3(1, 1, 1),
    model: "assets/obj/Frying Pan.glb",
  },
  {
    position: new THREE.Vector3(5, 0, -10),
    scale: new THREE.Vector3(1, 1, 1),
    model: "assets/obj/Ice Cream.glb",
  },
  {
    position: new THREE.Vector3(7, 0, -10),
    scale: new THREE.Vector3(1, 1, 1),
    model: "assets/obj/Pancakes Stack.glb",
  },
  {
    position: new THREE.Vector3(9, 0, -10),
    scale: new THREE.Vector3(1, 1, 1),
    model: "assets/obj/Pepper Green.glb",
  },
  {
    position: new THREE.Vector3(10, 0, -10),
    scale: new THREE.Vector3(1, 1, 1),
    model: "assets/obj/Pumpkin.glb",
  },
  {
    position: new THREE.Vector3(12, 5, -10),
    scale: new THREE.Vector3(5, 5, 5),
    model: "assets/obj/Spoon.glb",
  },
];
