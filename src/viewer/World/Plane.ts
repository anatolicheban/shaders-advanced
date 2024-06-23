import { Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from "three";
import { Viewer } from "../index.ts";

export class Plane {
  viewer = new Viewer();
  material: ShaderMaterial;
  geometry: PlaneGeometry;
  object: Mesh<PlaneGeometry, ShaderMaterial>;

  sizes: {
    width: number;
    height: number;
  };
  constructor() {
    this.sizes = {
      width: this.viewer.sizes.width,
      height: this.viewer.sizes.height,
    };
    this.material = new ShaderMaterial({
      vertexShader: this.viewer.vertexShader,
      fragmentShader: this.viewer.fragmentShader,
      uniforms: {
        iTime: {
          value: 0,
        },
        iResolution: {
          value: new Vector2(this.viewer.sizes.width, this.viewer.sizes.height),
        },
      },
    });
    this.geometry = new PlaneGeometry(this.sizes.width, this.sizes.height);

    this.object = new Mesh(this.geometry, this.material);
    this.viewer.scene.add(this.object);
  }

  resize() {
    this.object.scale.set(
      this.viewer.sizes.width / this.sizes.width,
      this.viewer.sizes.height / this.sizes.height,
      1,
    );
    this.material.uniforms.iResolution.value = new Vector2(
      this.viewer.sizes.width,
      this.viewer.sizes.height,
    );
  }
  update() {
    this.material.uniforms.iTime.value = this.viewer.time.elapsed;
  }
}
