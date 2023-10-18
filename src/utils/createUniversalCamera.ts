import { UniversalCamera, Vector3, type Scene } from 'babylonjs';
import { type PlanetConfig } from './PlanetConfig';

export function createUniversalCamera(
  options: { planet: PlanetConfig; altitude: number },
  scene: Scene
) {
  const cameraHeight = options.planet.radius + options.altitude;
  const camera = new UniversalCamera(
    'camera',
    new Vector3(0, 0, cameraHeight),
    scene
  );
  camera.inputs.addMouseWheel();
  return camera;
}
