import * as BABYLON from 'babylonjs';
import {
  CreateSphere,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from 'babylonjs';
import { Planet } from './Planet';
import './index.css';
import { planet } from './planets';
import { PlanetCameraArcRotate } from './utils/Cameras/PlanetCameraArcRotate';
import { PlanetCameraUniversale } from './utils/Cameras/PlanetCameraUniversal';
import IMG_STARS from '/images/sun_and_stars/8k_stars_milky_way.jpg';

// ISS = 420km
let ALTITUDE = 30_000; // km
ALTITUDE = 384_400; // MOON
ALTITUDE = 420;
ALTITUDE = 8_000;

const CAMERA_ARC = true;
const MAX_Z = 1_000_000;
const GPS_COORDINATES = [30.42664, -87.22711] satisfies [number, number]; // Pensacola, FL
//const GPS_COORDINATES = [51.4779, 0] satisfies [number, number]; // Prime Meridian park
//const GPS_COORDINATES = [0, 0] satisfies [number, number]; // Prime Meridian park

function createStars(scene: Scene) {
  // Create a large sphere to act as the skybox

  const Dome = CreateSphere(
    'stars',
    {
      segments: 32, //128,
      diameter: 1_100_000,
    },
    scene
  ); // 32 segments, radius of 2

  //var Dome = BABYLON.Mesh.CreateSphere('Dome', 64, 20, scene);

  const env_mat = new StandardMaterial('Mat_Dome', scene);
  const envtext = new Texture(IMG_STARS, scene);
  env_mat.diffuseTexture = envtext;
  //env_mat.diffuseTexture.vScale = -1;
  env_mat.emissiveTexture = envtext;
  env_mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
  env_mat.backFaceCulling = false;
  Dome.material = env_mat;
}

//----------------------------
//
//----------------------------
const canvas = document.getElementById('canvas');
if (!canvas || canvas === null) {
  throw new Error('Canvas is not found');
}

async function createScene() {
  const canvas = document.getElementById('canvas');
  if (!canvas) {
    throw new Error('can not find "canvas"');
  }
  console.log('canvas=', canvas);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const engine = new BABYLON.WebGPUEngine(canvas as any);
  console.log('engine=', engine);
  await engine.initAsync();
  console.log('initted engine=', engine);
  const scene = new Scene(engine);

  createStars(scene);

  const sphere = new Planet(planet);
  sphere.addToScene(scene);

  const camera2 = CAMERA_ARC
    ? new PlanetCameraArcRotate(planet, GPS_COORDINATES, ALTITUDE)
    : new PlanetCameraUniversale(planet, GPS_COORDINATES, ALTITUDE);
  camera2.addToScene(scene);

  const camera = camera2.camera;
  camera.maxZ = MAX_Z;
  camera.fov = 0.8; //1.876;

  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  const hemiLight = new BABYLON.HemisphericLight(
    'hemiLight',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemiLight.intensity = 0.8;
  hemiLight.diffuse = new BABYLON.Color3(1, 1, 1); // Color of the light itself
  hemiLight.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Color from below, typically darker

  let time = 0;
  function updateCameraPosition() {
    const radius = planet.radius + ALTITUDE;
    const angularSpeed = (2 * Math.PI) / (1 * 60); // One full orbit every 90 minutes

    // Calculate the new camera position
    const x = radius * Math.sin(time * angularSpeed);
    const z = radius * Math.cos(time * angularSpeed);

    camera.position.set(x, camera.position.y, z);
    //camera.setTarget(BABYLON.Vector3.Zero()); // Always look at Earth's center

    time = time + 0;
    //time += engine.getDeltaTime() / 1000; // Increment time by the time since the last frame
  }
  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener('resize', function () {
    engine.resize();
  });

  canvas.addEventListener('pointerdown', function (evt) {
    const pickResult = scene.pick(evt.clientX, evt.clientY);

    if (pickResult.hit && pickResult.pickedMesh === sphere.mesh) {
      const pickedPoint = pickResult.pickedPoint; // This is the 3D point on the sphere

      if (pickedPoint) {
        const { x, y, z } = pickedPoint;
        const [lat, lon] = sphere.cartesianToLatLon(x, y, z);
        const pos = sphere.latLonToEquirectangular([lat, lon]);
        console.log(camera2.camera.position);
        console.log(`
map lat,lon = ${[lat.toFixed(4), lon.toFixed(4)].join(',')}
texture x,y = ${pos.join(',')}
   altitude = ${camera2.altitude}
        `);
      }
      //console.log('Altitude: ', camera.radius - EARTH_RADIUS);
    }
    updateCameraPosition();
  });

  // function resize() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  //   engine?.resize();
  // }
  //window.addEventListener('resize', resize);
}

window.addEventListener('DOMContentLoaded', createScene);
