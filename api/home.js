import {get} from '.';

export function topParts () {
  return get(`parts/top?limit=8`);
}
export function allCarParts () {
  return get(`all/carpart`);
}

export function topBrands () {
  return get(`makers/top`);
}
export function details(name) {
  return get(`details/${name}`);
}

