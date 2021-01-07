import * as parts from '../api/parts';
import * as product from '../api/product';
const PAGINATION_LIMIT = 5
export const state = () => ({
  filterTreeForMaker: [],
  pageCount: 0,
})

export const mutations = {
  remove(state, {
    product
  }) {
    state.list.splice(state.list.indexOf(product), 1)
  }
}
