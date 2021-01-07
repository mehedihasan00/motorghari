import * as home from '../api/home';
import * as parts from '../api/parts';

function updateCart (cartList, updItem, updField, updValue) {
  let foundCart = foundCart = {index: 'notfound'}
  cartList.map((part, index)=> {
    if (part._id === updItem._id) {
      foundCart = {index, part}
    }
  })
  if (foundCart.index === 'notfound') {
    let cartPart = {
      part_name: updItem.part_name,
      _id: updItem._id,
      price: updItem.price,
      baseQuantity: updItem.quantity,
      part_image: updItem.part_image,
      quantity: Number(updValue),
      serviceStatus: false,
      serviceCharge: updItem.serviceCharge
    }
    console.log('lastest ', cartPart, updItem.quantity)
    cartList.push(cartPart)
   
  } else {
    let part = foundCart.part
    part[updField] = Number(updValue)
    cartList.splice(foundCart.index, 1, part)
  }
  localStorage.setItem('localCart', JSON.stringify(cartList))
}

export const state = () => ({
  allParts: [],
  partCats: [],
  topParts: [],
  carPartList: [],
  localCart: [],
  productDetails: {
    id: ''
  },
  partCategory: '',
  brand: null

})

export const mutations = {
  addParts(state, parts) {
    state.allParts = parts
    state.partCats = parts.map(p => {
      p.push(false)
      return p
    })
  },
  TOP_PART_FLAG (state, flag) {
    state.isTopParts = flag
  },
  setPartsImage(state, name) {
    let parts = state.partCats.map(p => {
      p[3] = !!name.length && p[1].toLowerCase().startsWith(name.toLowerCase())
      return p
    })
    state.partCats = parts
  },
  addTopParts(state, partList) {
    if (partList == undefined || partList == null) {
      return;
    }
    state.topParts = [...partList]
  },
  fetchAllCarParts(state, list) {
    if (list == undefined || list == null) {
      return;
    }
    state.carPartList = list.result || []
  },
  partCategory(state, cat) {
    state.partCategory = cat
  },
  brand(state, brand) {
    state.brand = brand
  },
  addProductDetails(state, {
    id,
    image
  }) {
    state.productDetails.id = id
  },

  set_product(state) {
    state.details = JSON.parse(localStorage.getItem('product'))
  },

  addCart(state, cart) {
    let findIndex = state.localCart.findIndex(item => item._id === cart._id)
    let foundPart = state.localCart[findIndex]
    let cartPart = {
      part_name: cart.part_name,
      _id: cart._id,
      price: cart.price,
      baseQuantity: cart.quantity,
      part_image: cart.part_image,
      quantity: 1,
      serviceStatus: false,
      serviceCharge: cart.serviceCharge
    }
    if (findIndex >= 0) {
      let updPart = {
        part_name: foundPart.part_name,
        price: foundPart.price,
        _id: foundPart._id,
        part_image: foundPart.part_image,
        baseQuantity: foundPart.baseQuantity,
        quantity: Number(foundPart.quantity) + 1,
        serviceStatus: false,
        serviceCharge: foundPart.serviceCharge
      }
      state.localCart.splice(findIndex, 1, updPart)
    } else {
      state.localCart.push(cartPart)
    }
    localStorage.setItem('localCart', JSON.stringify(state.localCart))
  },
  GET_CART(state) {
    state.localCart = JSON.parse(localStorage.getItem('localCart')) || []
  },
  REMOVE_CART(state, i) {
    state.localCart.splice(i, 1)
    localStorage.setItem('localCart', JSON.stringify(state.localCart))
  },
  UPDATE_CART_QTY(state, {
    item,
    qty
  }) {
   updateCart(state.localCart, item, 'quantity', qty)
  },
  
  addTopCategory(state, catList) {
    if (catList == undefined || catList == null) {
      return;
    }
    state.topCategory = [...catList]
  },
  addTopBrands(state, brandtList) {
    if (brandtList == undefined || brandtList == null) {
      return;
    }
    state.topBrands = [...brandtList]
  }
}

export const actions = {
  async addParts({
    commit
  }) {
    let result = await parts.allParts();
    if (result.data !== undefined) {
      commit('addParts', result.data)
    }
  },
  async setPartsImage({
    commit
  }, name) {
    commit('setPartsImage', name)
  },
  async addTopParts({
    commit
  }) {
    let result = await home.topParts();
    commit('addTopParts', result.data.items)
  },
  async fetchAllCarParts({
    commit
  }, cat) {
    let result = await home.allCarParts()
    commit('fetchAllCarParts', result.data)
  },
  partCategory({
    commit
  }, cat) {
    commit('partCategory', cat)
  },
  brand({
    commit
  }, brand) {
    commit('brand', brand)
  },

  
  async addCart({
    commit
  }, cart) {
    commit('addCart', cart)
  },
  async getCart({
    commit
  }) {
    commit('GET_CART')
  },
  async removeCart({
    commit
  }, i) {
    commit('REMOVE_CART', i)
  },
  async updateCartQty({
    commit
  }, {
    item,
    qty
  }) {
    commit('UPDATE_CART_QTY', {
      item,
      qty
    })
  },
  
  async addTopBrands({
    commit
  }) {
    let result = await home.topBrands();
    commit('addTopBrands', result.data)
  }
  
}
