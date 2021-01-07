let brandMap = null
export function onClickMakerTree(node, item) {
    let value = item.customValue
    let selected = item.selected
    if (!brandMap) {
      brandMap = new Map()
    }
    let truth = `${value.maker ? '1' : '0'}${value.model ? '1' : '0'}${value.year ? '1' : '0'}`
    let brand, model
    if(selected) {
      switch (truth) {
        case '100':
          brandMap.set(value.maker, new Map())
          break
        case '110':
          brand = brandMap.get(value.maker) || brandMap.set(value.maker, new Map()).get(value.maker)
          brand.set(value.model, new Set())
          break
        case '111':
          brand = brandMap.get(value.maker) || brandMap.set(value.maker, new Map()).get(value.maker)
          model = brand.get(value.model) || brand.set(value.model, new Set()).get(value.model)
          model.add(value.year)
        default:
          break
      }
    } else {
      switch (truth) {
        case '100':
          brandMap.delete(value.maker)
          break
        case '110':
          brand = brandMap.get(value.maker)
          brand.delete(value.model)
          if (brand.size === 0) {
            brandMap.delete(value.maker)
          }
          break
        case '111':
          brand = brandMap.get(value.maker)
          model = brand.get(value.model)
          model.delete(value.year)
          if (model.size === 0) {
            brand.delete(value.model)
          }
          if (brand.size === 0) {
            brandMap.delete(value.maker)
          }
        default:
          break;
      }
    }
    let cars = []
    brandMap.forEach((model, key) => {
      let item = { maker: key, model: [] }
      model.forEach((year, k) => {
        let model = { name: k, years: []}
        year.forEach((v) => {
          model.years.push(v)
        })
        item.model.push(model)
      })
      cars.push(item)
    })
    return cars
}

let partMakersList = []
export function onPartMakerClick (item) {
    if (item.selected) {
        partMakersList.push(item.value)
      }
      if (!item.selected) {
       const pm =  partMakersList.filter(mk => mk !== item.value)
       partMakersList = pm
      }
      return partMakersList
}
let specsMap = null
export function onSpecsTreeClick (node, item) {
    if(!specsMap) {
        specsMap = new Map()
      }
      if (item.selected) {
        if (item.customValue) {
          let sp = specsMap.get(item.customValue) || specsMap.set(item.customValue, new Set()).get(item.customValue)
          sp.add(item.value)
        } else {
          let sp = specsMap.set(item.value, new Set()).get(item.value)
          item.children.forEach(it => {
            sp.add(it.value)
          })
        }
      } else {
        if(item.customValue) {
          let sp = specsMap.get(item.customValue)
          sp.delete(item.value)
          if (sp.size === 0) {
            specsMap.delete(item.customValue)
          }
        } else {
          specsMap.delete(item.value)
        }
      }
      let specsTemp = []
      specsMap.forEach((val, key) => {
        let sp = {name: key}
        sp.values = [...val]
        specsTemp.push(sp)
      })
      return specsTemp
}

let categoryMap = null
export function onCatClick(node, item) {
    if(!categoryMap) {
        categoryMap = new Set()
      }
      if (item.selected) {
        categoryMap.add(item.value)
      } else {
        categoryMap.delete(item.value)
      }
      let catList = [...categoryMap.keys()]
     return catList;
      
}