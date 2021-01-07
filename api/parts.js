import { get } from '.'

export function allParts() {
  return get(`parts`)
}

export function getPartSuggestion(key) {
  return get(`parts/suggest/${key}`);
}

export function getMakesSuggestion(searchTerm) {
  return get(`makers/suggest/${searchTerm}`)
}

export function carsWithMakers () {
  return get(`cars/makers`);
}

export function partNames () {
  return get(`parts/all`)
}

export function partPrice({part_name, car_name, maker_name, year}) {
  return get(`partPrice/${part_name}/${car_name}/${maker_name}/${year}`)
}