import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "lil-gui";
import makeXYZGuiHelper, {
  ColorGUIHelper,
  DegRadHelper,
  updateLightAndVisualizerHelper,
} from "./lighting/LightingGuiHelper.js";
import LightingController from "./lighting/LightingController.js";
import ObjectController from "./object/ObjectController.js";
import TexturedCube from "./object/TexturedCube.js";
import { generatedCubeList, objectPresets, texturedCubeList } from "./object/ObjectPresets.js";
import LoadedObject from "./object/LoadedObject.js";

const cameraSettings = {
  fov: 45,
  aspect: 2,
  near: 0.1,
  far: 100,
};

export default class Render {
  constructor() {
    this.scene = new THREE.Scene();
    this.canvas = document.querySelector("#c");
    this.camera = new THREE.PerspectiveCamera(
      cameraSettings.fov,
      cameraSettings.aspect,
      cameraSettings.near,
      cameraSettings.far,
    );
    this.camera.position.set(0, 10, 20);
    this.renderer = new THREE.WebGLRenderer({antialias: true,canvas: this.canvas, alpha: true});
    this.gui = new GUI();
    this.sceneObjects = [];
    this.lightingController = new LightingController(this.scene, this.gui);
    this.objectController = new ObjectController(this.scene, this.sceneObjects);
    this.objectList=[]
  }

  setCanvasSize(width, height) {
    this.renderer.setSize(width, height);
  }

  renderScene = async () => {
    this.setupOrbitControls();
    this.objectController.renderPlane();
    this.objectController.renderBackground();
    this.objectController.renderCubeAndSphere();

    this.lightingController.setupDirectionalLight();
    this.lightingController.setupHemisphereLight();
    this.lightingController.setupSpotlight();

    const genCubeList = generatedCubeList();
    genCubeList.forEach(async(element) => {
      const cube = new TexturedCube(this.scene, element.position, element.scale);
      await cube.render();
      this.objectList.push(cube);
    })



    texturedCubeList.forEach(async(element) => {
      const cube = new TexturedCube(this.scene, element.position, element.scale);
      await cube.render();
      this.objectList.push(cube);
    })

    objectPresets.forEach(async(element) => {
      const object = new LoadedObject(this.scene, element.position,element.scale, element.model );
      object.render();
      this.objectList.push(object);
    })



    const renderFrame = async(time) => {
      time *= 0.001;

      this.objectList.forEach((element) => {
        element.playAnimation(time);
      })

      

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  };

  setupOrbitControls = async () => {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.target.set(0, 5, 0);
    controls.update();
  };


  renderCubesAnimation() {
    const renderFrame = (time) => {
      time *= 0.001;
      this.cubes.forEach((cube, index) => {
        const speed = 1 + index * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
  }
}

