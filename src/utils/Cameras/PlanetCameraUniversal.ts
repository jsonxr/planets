import { UniversalCamera, Vector3, type Scene } from 'babylonjs';
import { type PlanetConfig } from '../PlanetConfig';
import { type PlanetCamera } from './PlanetCamera';

export class PlanetCameraUniversale implements PlanetCamera {
  #planet: PlanetConfig;
  #coordinates: [number, number];
  #altitude: number;
  #camera: UniversalCamera | null = null;

  constructor(
    planet: PlanetConfig,
    coordinates: [number, number],
    altitude: number
  ) {
    this.#altitude = altitude;
    this.#planet = planet;
    this.#coordinates = coordinates;
  }

  get camera() {
    if (!this.#camera) {
      throw new Error('Need to add camera to scene first');
    }
    return this.#camera;
  }

  get altitude(): number {
    if (!this.#camera) {
      throw new Error('Need to add camera to scene first');
    }
    throw new Error('Not implemented yet');
  }

  addToScene(scene: Scene) {
    const cameraHeight = this.#planet.radius + this.#altitude;
    const camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, cameraHeight),
      scene
    );
    camera.inputs.addMouseWheel();
    this.#camera = camera;
  }

  setLatLon(latlon: [number, number]) {
    if (!this.#camera) {
      throw new Error('Camera has not been added to a scene');
    }
    console.log('latlon=', latlon);
  }
}
