// import { Viewer } from "../index.ts";
import { Plane } from "./Plane.ts";

export class World {
  // viewer = new Viewer();
  plane: Plane;

  constructor() {
    this.plane = new Plane();
  }

  update() {
    this.plane.update();
  }

  resize() {
    this.plane.resize();
  }
}
