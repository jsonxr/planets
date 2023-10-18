import {
  CreateSphere,
  Mesh,
  PBRMaterial,
  Texture,
  type Scene,
} from 'babylonjs';

import { PI_2, PI_HALF } from './constants';
import { PlanetConfig } from './utils/PlanetConfig';

export class Planet {
  #config: PlanetConfig;
  #mesh: Mesh | null = null;

  constructor(config: PlanetConfig) {
    this.#config = config;
  }

  get mesh() {
    return this.#mesh;
  }

  latLonToEquirectangular(coordinates: [number, number]): [number, number] {
    const [lat, lon] = coordinates;
    const width = 2048;
    const height = 1024;

    const x = Math.trunc((width / 360) * (lon + 180));
    const y = Math.trunc((height / 180) * (90 - lat));

    return [x, y];
  }

  cartesianToLatLon(x: number, y: number, z: number): [number, number] {
    //------------------------------
    // Calculate latitude
    //------------------------------
    const alpha = Math.asin(y / this.#config.radius);

    //------------------------------
    // Calculate Longitude
    //------------------------------
    // Prime meridian is not at x=0
    const primeMeridianOffset =
      this.#config.textureZero * (PI_2 / this.#config.textureWidth);
    let beta = Math.atan2(-x, z) + PI_HALF - primeMeridianOffset;
    // If the angle is -200, we want it to be 160
    if (beta < -Math.PI) {
      // Normalize between [ -π to +π ]
      beta += PI_2;
    }

    // Return in degrees
    const lat = alpha * (180 / Math.PI);
    const lon = beta * (180 / Math.PI);

    return [lat, lon];
  }

  addToScene(scene: Scene) {
    const texture = new Texture(
      this.#config.texture,
      scene,
      false,
      true // It's inside out if this is false
      //Texture.NEAREST_LINEAR
    );
    const material = new PBRMaterial('texture', scene);
    material.albedoTexture = texture;
    material.metallic = this.#config.metallic ?? 0; // Moon isn't metallic
    material.roughness = this.#config.roughness ?? 0.9; // Higher value means rougher surface. Adjust based on appearance.

    // if (this.#config.bump) {
    //   const bumpTexture = new Texture(this.#config.bump, scene);
    //   material.bumpTexture = bumpTexture;
    //   material.bumpTexture.level = 1;
    //   material.useParallax = true;
    //   material.useParallaxOcclusion = true;
    //   material.parallaxScaleBias = 0.3; // Adjust this value to get the desired depth from the displacement map.
    // }

    // if (false) {
    // }

    const mesh = CreateSphere(
      this.#config.name,
      {
        segments: this.#config.segments ?? 128, //128,
        diameter: (this.#config.radius ?? 1000) * 2,
      },
      scene
    ); // 32 segments, radius of 2
    mesh.rotation.x = Math.PI; // Upside down if not rotated
    mesh.material = material;

    this.#mesh = mesh;
  }
}
