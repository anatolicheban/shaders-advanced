import { Viewer } from "./index.ts";
import { OrthographicCamera } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Camera {
  private viewer = new Viewer();
  instance: OrthographicCamera;
  // controls: OrbitControls;

  constructor() {
    //Instance
    this.instance = new OrthographicCamera(
      -this.viewer.sizes.width / 2,
      this.viewer.sizes.width / 2,
      this.viewer.sizes.height / 2,
      -this.viewer.sizes.height / 2,
    );
    this.instance.position.set(0, 0, 1);
    this.viewer.scene.add(this.instance);

    //Controls
    // this.controls = new OrbitControls(this.instance, this.viewer.canvas);
    // this.controls.enableDamping = true;
    // this.controls.minDistance = 0.5;
    // this.controls.maxDistance = 10;
  }

  resize() {
    this.instance.left = -this.viewer.sizes.width / 2;
    this.instance.right = this.viewer.sizes.width / 2;
    this.instance.top = this.viewer.sizes.height / 2;
    this.instance.bottom = -this.viewer.sizes.height / 2;
    this.instance.updateProjectionMatrix();
  }

  // update() {
  // this.controls.update();
  // }
}
