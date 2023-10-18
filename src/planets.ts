import { PlanetConfig } from './utils/PlanetConfig';
import IMG_EARTH_GRID from '/images/earth-grid.png';
import IMG_EARTH_8K from '/images/earth/8k_earth_daymap.jpg';
import IMG_EUROPA_4K from '/images/jupiter/4k_europa_albedo.jpg';
import IMG_JUPITER_8K from '/images/jupiter/8k_jupiter.jpg';
import IMG_MARS from '/images/mars/8k_mars.jpg';
import IMG_MERCURY_8K from '/images/mercury/8k_mercury.jpg';
import IMG_MOON_8K from '/images/moon/8k_moon.jpg';
import IMG_NEPTUNE_2K from '/images/neptune/2k_neptune.jpg';
import IMG_PLUTO_2K from '/images/pluto/2k_pluto.jpg';
import IMG_SATURN_8K from '/images/saturn/8k_saturn.jpg';
import IMG_URANUS_2K from '/images/uranus/2k_uranus.jpg';
import IMG_VENUS_8K from '/images/venus/8k_venus_surface.jpg';

const SEGMENTS = 64;

export const MERCURY: PlanetConfig = {
  name: 'mercury',
  texture: IMG_MERCURY_8K,
  radius: 2_439,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const VENUS: PlanetConfig = {
  name: 'venus',
  texture: IMG_VENUS_8K,
  radius: 6_052,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const EARTH: PlanetConfig = {
  name: 'earth',
  texture: IMG_EARTH_8K,
  radius: 6_371,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const MOON: PlanetConfig = {
  name: 'moon',
  texture: IMG_MOON_8K,
  radius: 1_737,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const MARS: PlanetConfig = {
  name: 'mars',
  texture: IMG_MARS,
  radius: 3_390,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const JUPITER: PlanetConfig = {
  name: 'jupiter',
  texture: IMG_JUPITER_8K,
  radius: 69_911,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const EUROPA: PlanetConfig = {
  name: 'eurpoa',
  texture: IMG_EUROPA_4K,
  radius: 1_561,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const SATURN: PlanetConfig = {
  name: 'saturn',
  texture: IMG_SATURN_8K,
  radius: 58_232,
  textureWidth: 8192,
  textureZero: 4096,
  segments: SEGMENTS,
};

export const URANUS: PlanetConfig = {
  name: 'uranus',
  texture: IMG_URANUS_2K,
  radius: 25_362,
  textureWidth: 2048,
  textureZero: 1024,
  segments: SEGMENTS,
};

export const NEPTUNE: PlanetConfig = {
  name: 'neptune',
  texture: IMG_NEPTUNE_2K,
  radius: 24_622,
  textureWidth: 2048,
  textureZero: 1024,
  segments: SEGMENTS,
};

export const PLUTO: PlanetConfig = {
  name: 'pluto',
  texture: IMG_PLUTO_2K,
  radius: 1_188,
  textureWidth: 2048,
  textureZero: 1024,
  segments: SEGMENTS,
};

export const EARTH_GRID: PlanetConfig = {
  name: 'earth',
  texture: IMG_EARTH_GRID,
  radius: 6371,
  textureWidth: 2048,
  textureZero: 1024,
  segments: SEGMENTS,
};

export const planet = EARTH;
