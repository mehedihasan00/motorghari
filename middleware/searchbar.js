export default function ({ store, route, redirect }) {
  store.commit('SET_HEAD_SEARCH', route.path.includes('/products/'))
}

