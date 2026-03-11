
import * as THREE from "three";
import makeXYZGuiHelper, {
  ColorGUIHelper,
  DegRadHelper,
  updateLightAndVisualizerHelper,
} from "./LightingGuiHelper.js";


export default class LightingController {

  constructor(scene, gui) {
    this.scene = scene;
    this.gui = gui;
  }

    setupSpotlight = () => {
      const lightParam = {
        color : 0xffffff,
        intensity: 100,
        origin: [0, 5, 0],
        target: [0, 0, 0],
        lightVisualizer: false,
        penumbra: 0.5
      }


      const light = new THREE.SpotLight(lightParam.color, lightParam.intensity);
      this.scene.add(light);
      this.scene.add(light.target);

      light.position.set(lightParam.origin[0],lightParam.origin[1], lightParam.origin[2])
      light.penumbra = lightParam.penumbra;
      light.target.position.set(lightParam.target[0],lightParam.target[1], lightParam.target[2])
      const lightVisualizer = new THREE.SpotLightHelper(light);
      lightVisualizer.visible = lightParam.lightVisualizer;
      this.scene.add(lightVisualizer);

      const spotlightFolder = this.gui.addFolder("Spotlight");
      spotlightFolder
        .add(new DegRadHelper(light, "angle"), "value", 0, 90)
        .name("angle")
        .onChange(updateLightAndVisualizerHelper(light, lightVisualizer));
      spotlightFolder.add(light, "penumbra", 0, 1, 0.01);
      spotlightFolder
        .addColor(new ColorGUIHelper(light, "color"), "value")
        .name("color");
      spotlightFolder.add(light, "intensity", 0, 100, 0.01);
      makeXYZGuiHelper(
        spotlightFolder,
        light.position,
        "position",
        updateLightAndVisualizerHelper(light, lightVisualizer),
      );
      makeXYZGuiHelper(
        spotlightFolder,
        light.target.position,
        "target",
        updateLightAndVisualizerHelper(light, lightVisualizer),
      );
  };

  setupHemisphereLight = async () => {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    //const light = new THREE.AmbientLight(color, intensity);
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    this.scene.add(light);
    const hemiSphereFolder = this.gui.addFolder("Hemisphere Light");
    hemiSphereFolder
      .addColor(new ColorGUIHelper(light, "color"), "value")
      .name("skyColor");
    hemiSphereFolder
      .addColor(new ColorGUIHelper(light, "groundColor"), "value")
      .name("groundColor");
    hemiSphereFolder.add(light, "intensity", 0, 5, 0.01);
  };

  setupDirectionalLight = () => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 12, 0);
    light.target.position.set(-5, 0, 0);
    this.scene.add(light);
    this.scene.add(light.target);
    const lightVisualizer = new THREE.DirectionalLightHelper(light);
    lightVisualizer.visible = false;
    this.scene.add(lightVisualizer);

    this.gui
      .addColor(new ColorGUIHelper(light, "color"), "value")
      .name("color");
    this.gui.add(light, "intensity", 0, 5, 0.01);
    const directionaLightFolder = this.gui.addFolder("Directional Light");
    directionaLightFolder
      .add({ lightVisualizer: false }, "lightVisualizer")
      .onChange((value) => {
        lightVisualizer.visible = value;
      });
    makeXYZGuiHelper(
      directionaLightFolder,
      light.position,
      "position",
      updateLightAndVisualizerHelper(light, lightVisualizer),
    );
    makeXYZGuiHelper(
      directionaLightFolder,
      light.target.position,
      "target",
      updateLightAndVisualizerHelper(light, lightVisualizer),
    );
  };
}