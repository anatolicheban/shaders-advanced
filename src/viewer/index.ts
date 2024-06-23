import { Scene } from "three";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import { World } from "./World";
// import { DebugUI } from "./Utils/GUI.ts";

let instance: Viewer;

export class Viewer {
  //From args
  canvas!: HTMLCanvasElement;
  wrapper?: HTMLElement | null;
  fragmentShader?: string;
  vertexShader?: string;

  //Utils
  sizes!: Sizes;
  time!: Time;

  //Setup
  scene!: Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;
  // debug!: DebugUI;

  constructor(
    element?: HTMLCanvasElement,
    wrapper?: HTMLElement | null,
    fragmentShader?: string,
    vertexShader?: string,
  ) {
    if (instance) {
      return instance;
    }

    if (element) this.canvas = element;
    if (!this.canvas) {
      console.error("Cannot create 3D Viewer: canvas not provided.");
      return;
    }

    this.wrapper = wrapper;
    this.fragmentShader = fragmentShader;
    this.vertexShader = vertexShader;

    instance = this;

    //Utils
    this.sizes = new Sizes();
    this.time = new Time();

    //Setup
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    this.setListeners();

    //GUI Debug
    // this.debug = new DebugUI();
  }

  private setListeners() {
    this.sizes.on(() => {
      this.resize();
    });
    this.time.on(() => {
      this.update();
    });
  }

  private resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }

  private update() {
    this.renderer.update();
    this.world.update();
    // this.camera.update();
  }
}
