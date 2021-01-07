export  function filterController({commit, state, selectedFilters, result}) {
  if (!result.length) return
  if (selectedFilters.length) {
    commit('keepMultiSpec', result)
    commit('add', state.keepMultiSpec)
  }
  if (state.resetSpec) {
    commit('add', result)
  }
}

export function selectedItem(selectedFilters) {
  let specObj = {}, id;
  selectedFilters.forEach(s => {
    id = s.id
    let val = s.value
    specObj[Object.keys(val)[0]] = val[Object.keys(val)[0]]
  })
  return {specObj, id};
}

export function makerTree (makers, brandName) {
  let makerWithYears = makers.map(maker => {
    let rootTree = {
      text: `<span>${maker.maker}</span><span class="count is-1">${maker.count}</span>`,
      isLeaf: false,
      selected: false,
      opened: brandName !== 'all',
      parent: null,
      value: `${maker.maker}`,
      customValue: {maker: maker.maker},
      children: []
    }
    // makers > cars
    rootTree.children = maker.models.map(model => {
      let carTree = {
        text: `<span>${model.name}</span> <span class="count is-2">${model.count}</span>`,
        icon: 'none',
        isLeaf: false,
        opened: false,
        selected: false,
        parent: maker,
        value: `${model.name}`,
        customValue: {maker: maker.maker, model: model.name},
        children: []
      }
      // makers > cars > years
      carTree.children = model.years.map(year => {
        return {
          text: `<span>${year.year}</span> <span class="count is-3">${year.count}</span>`,
          icon: 'none',
          selected: false,
          isLeaf: true,
          value: `${year.year}`,
          customValue: {maker: maker.maker, model: model.name, year: year.year }
        }
      })
      return carTree
    })
    // root node
    return rootTree
})

return makerWithYears
}

export function partMakerTree (makerOfParts) {
  let pm = makerOfParts.map(pm => {
    let rootTree = {
      text: `<span>${pm}</span>`,
      isLeaf: false,
      icon: 'none',
      value: pm,
      selected: false,
      opened: false,
      parent: null,
      children: []
    }
  
    return rootTree
  })
  return pm
}

export function specTree (specs) {
  let allSpecs = specs.map(spec => {
    let rootTree = {
      text: `<span>${spec.name}</span> <span class="count is-1">${spec.count}</span>`,
      isLeaf: false,
      icon: 'none',
      value: spec.name,
      selected: false,
      opened: false,
      parent: null,
      children: []
    }
    rootTree.children = spec.values.map(val => {
      return {
        text:  `<span>${val.value}</span><span class="count is-2">${val.count}</span>`,
        isLeaf: true,
        value: val.value,
        selected: false,
        parent: spec,
        customValue: spec.name
      }
    })
    return rootTree
  })
  return allSpecs
}

export function categoryTree (category) {
  return category.map(part => {
    return {
      text: `<span>${part.name}</span> <span class="count is-1">${part.count}</span>`,
      selected: false,
      children: [],
      value: part._id,
      isLeaf: true
    }
  })
}