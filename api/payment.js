import {get_root,post_root} from '.'

export function getWays(params) {
  return post_root('payment/gateways', params)
}
export function orderStatus(orderId) {
  return get_root(`payment/status/${orderId}`)
}