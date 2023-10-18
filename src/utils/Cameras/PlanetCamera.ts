import { type Camera, type Scene } from 'babylonjs';

export interface PlanetCamera {
  addToScene(scene: Scene): void;
  setLatLon(latlon: [number, number]): void;
  get camera(): Camera;
  get altitude(): number;
}
