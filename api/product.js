import {get, post} from '.'

export function filterProducts(filter) {
  return post('products', filter)
}
export function makerGroups(maker, part) {
  return get(`cars/brands?maker=${maker}&part=${part}`);
}
export function specs (part) {
  return get(`part/${part}/specs`);
}
export function categoryByBrand (brand) {
  return get(`category/${brand}`);
}
export function recommnededProducts (slug) {
  return get(`recommended/${slug}`);
}