export function cartesianToLatLon1(
  x: number,
  y: number,
  z: number
): [number, number] {
  // Calculate the radial distance from the origin
  const r = Math.sqrt(x * x + y * y + z * z);

  // Calculate the angles
  const theta = Math.atan2(y, x); // This gives the longitude in radians
  const phi = Math.acos(z / r); // This gives the co-latitude in radians

  // Convert from radians to degrees and adjust for standard geographic coordinates
  const longitude = (theta * 180) / Math.PI;
  const latitude = 90 - (phi * 180) / Math.PI;

  return [latitude, longitude];
}

export function cartesianToLatLon(
  x: number,
  y: number,
  z: number
): [number, number] {
  const theta = Math.atan2(y, x); // Longitude in radians
  const phi = Math.acos(z / 6371); // Latitude in radians

  // Convert from radians to degrees and adjust for conventional lat/lon representation
  const longitudeDeg = theta * (180 / Math.PI);
  const latitudeDeg = 90 - phi * (180 / Math.PI); // Adjusted for conventional representation

  return [latitudeDeg, longitudeDeg];
}
