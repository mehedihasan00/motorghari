import * as parts from '../api/parts'

export const state = () => ({
  parts: [],
  makes: []
})

export const mutations = {
  parts(state, parts) {
    state.parts = parts
  },
  makes(state, makes) {
    state.makes = [...makes]
  }
}

export const actions = {
  async fetchParts({commit, rootState}, term) {
    let allParts = rootState.home.allParts
    let terms = term.split(' ')
    let parts = []
    for (let i = 0; i < allParts.length; i++) {
      let p = allParts[i]
      let sortCount = 0
      for (let i = terms.length; i > 0; i--) {
        let termArr = []
        for(let j = 0; j < i; j++) {
          termArr.push(terms[j].toLowerCase())
        }
        let pLower = p[1].toLowerCase()
        let tLower = termArr.join(' ')
        sortCount += pLower.startsWith(tLower) ? i * 2 : 0
        sortCount += pLower.includes(tLower) ? i * .5 : 0
      }
      if (sortCount > 0) {
        parts.push([p[1], sortCount, p[0]])
      }
      
    }
    let sortedParts = parts.sort((a, b) => {
      return b[1] - a[1]
    }).map(p => ({name: p[0], slug: p[2]}))
    commit('parts', sortedParts)
  },
  async fetchMakes({commit}, makers) {
    let result = await parts.getMakesSuggestion(makers);
    commit('makes', result.data)
  }
}
