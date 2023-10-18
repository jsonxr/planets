import { ArcRotateCamera, Vector3, type Scene } from 'babylonjs';
import { PI_2, PI_DEG, PI_HALF } from '../../constants';
import { type PlanetConfig } from '../PlanetConfig';
import { type PlanetCamera } from './PlanetCamera';

export class PlanetCameraArcRotate implements PlanetCamera {
  #planet: PlanetConfig;
  #coordinates: [number, number];
  #altitude: number;
  #camera: ArcRotateCamera | null = null;

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
    const cameraHeight = this.#camera.radius - this.#planet.radius;
    return cameraHeight;
  }

  addToScene(scene: Scene) {
    const { alpha, beta } = getArcFromLatLon(this.#planet, this.#coordinates);
    this.#camera = new ArcRotateCamera(
      'camera',
      alpha,
      beta,
      this.#planet.radius + this.#altitude,
      Vector3.Zero(),
      scene
    );
  }

  setLatLon(latlon: [number, number]) {
    if (!this.#camera) {
      throw new Error('Camera has not been added to a scene');
    }
    const { alpha, beta } = getArcFromLatLon(this.#planet, latlon);
    this.#camera.alpha = alpha;
    this.#camera.beta = beta;
  }
}

function getArcFromLatLon(
  planet: PlanetConfig,
  [latDeg, lonDeg]: [number, number]
) {
  const { textureZero = 0, textureWidth } = planet;
  const latitudeR = latDeg * PI_DEG;
  const longitudeR = lonDeg * PI_DEG;
  const offset = textureZero * (PI_2 / textureWidth); // pixels * radians
  const alpha = offset + longitudeR;
  const beta = PI_HALF - latitudeR;
  return { alpha, beta };
}
