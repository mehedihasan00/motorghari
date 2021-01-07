<template>
  <div class="nav-main">
    <!-- Menu in container -->
    <div class="container is-hidden-mobile">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <nuxt-link to="/" class="level-item">
            <span class="nav-icon">
              <i class="fas fa-home"></i>
            </span>
          </nuxt-link>
          <div>
          </div>
          <div class="level-item search-header-box" v-if="searchHead">
            <div class="search-header">
              <input id="fuzzySearch" type="search" placeholder="Search" v-model="headSearch" onkeyup="this.setAttribute('value', this.value);"/>
              <i  class="fas fa-search"></i>
            </div>
          </div>
            <!-- search auto complete -->
             <div v-if ='autoComplete.waitForSearch && !autoComplete.doneSearch' class="headerSearch">
                 <p  v-for="(part, index) in parts" :key="index">
                   <a @click="headerMainSearch(part.slug, part.part_name)" id="partLink" >{{part.part_name}}</a>
                 </p>
                 
             </div>
             <div v-if ='autoComplete.waitForSearch && resultNotFound' id="notFound">
               <p>No result found</p>
             </div>
        </div>

        <!-- Right side -->
        <div class="level-right">

          <div style="margin-right: 0px;" class="level-item slant" @click="toggleMenu(true), toggleCart(false)">
            <span class="nav-icon">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <div :class="{'dropdown-menu login-menu': true, 'visible': isMenuVisible }" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item" v-if="isLogged">
                <span @click="logout">
                  Logout
                </span>
                <button class="button is-rounded is-small is-pulled-right" @click="toggleMenu(false)">Close</button>
              </div>
              <div class="dropdown-item" v-else>
                <nuxt-link to="/login">
                  Login 
                </nuxt-link>
              </div>
              <div class="dropdown-item" v-if="!isLogged">
                <nuxt-link to="/signup">
                  Sign Up
                </nuxt-link>
                <button class="button is-rounded is-small is-pulled-right" @click="toggleMenu(false)">X</button>
              </div>
            </div>
          </div>
          <div v-if="cartLength > 0" class="level-item slant" @click="toggleCart(true), toggleMenu(false)"> 
            <span class="badge">{{cartLength}}</span>
            <span class="nav-icon">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </div>
          <div id="menu-cart"  to="/emptyCart" v-else class="level-item slant" @click="cartToggle"> 
            <span class="badge">{{cartLength}}</span>
            <span class="">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<style>
  .login-menu button{
    background: #ffd83d;
    border-color: #000;
  }
  .badge {
    font-size: 16px;
    color: #fff;
    z-index: 99999;
    position: absolute;
    margin-left: 13px;
    text-align: center;
    border-radius: 50%;
    background-color: #F25F43;
    transform: skewX(27deg);
    padding: 0px 8px;
    margin-top: -16px;
  }
  .headerSearch {
    position: absolute;
    background: #fff;
    top: 55px;
    z-index: 1;
    left: 94px;
  }
  #notFound {
    position: absolute;
    background: #fff;
    top: 55px;
    z-index: 1;
    left: 94px;
    width: 22%;
    padding: 5px;
    text-align: center;
  }
  
  #partLink {
    display: block;
    padding: 0 70px 5px;
  }
  .dropdown-content {
    background-color: #333;
  }
  .dropdown-content a, .dropdown-content span {
    color: #fff;
  }
  .dropdown-menu.login-menu {
    right: 5%;
    left: inherit;
  }
  .dropdown-trigger .button{
    transform: skewX(-30deg) !important;
    border-right: 3px solid #ffd83d !important;
    height: auto;
    background-color: #242326;
    padding-top: 0;
    border-color: #242326;
  }
  .button .nav-icon {
    transform: skewX(27deg);
    padding: 0px 10px;
  }
  .dropdown-menu {
    padding-top: 0px;
  }
  .dropdown-item span {
    cursor: pointer;
  }
  .sticky {
    position: fixed !important;
    top: 12px;
    right: -115px;
    width: 335px;
    z-index: 100;
    background: transparent !important;
  }
</style>
<script>
 
  import {mapActions} from 'vuex'
  import FuzzySearch from 'fuzzy-search'

  export default {
    data ({store}) {
      return {
        headSearch: '',
        parts: [],
        searcher: null,
        autoComplete: {
          waitForSearch: false,
          doneSearch: false
        },
        resultNotFound: false
      }
    },
    computed: {
      searchHead() {
        return this.$store.state.isHeadSearch;
      },
      isLogged () {
        return this.$store.state.auth.authUser
      },
      carPartList () {
       return  this.$store.state.home.carPartList
      },
      cartLength () {
        return this.$store.state.home.localCart.length
      },
      isMenuVisible () {
        return this.$store.state.isMenuVisible
      }
    },
    subscriptions() {
      var self = this
      var headerSearch$ = this.$watchAsObservable("headSearch")
        .pluck("newValue")
        .filter(text => {
          if (!text) {
            this.parts = null
            this.resultNotFound = false
          }
          return text.length > 1
        })
        .debounceTime(1000)
        .distinctUntilChanged()
        .switchMap(q => {
          this.parts = []
          if (q.length <= 2 ) return ['']
          this.autoComplete.waitForSearch = true
          this.parts = this.instantiateFuzzy()(q)
          if (!this.parts.length) {
            this.resultNotFound = true
          } else {
            this.resultNotFound = false
          }
          if (this.autoComplete.doneSearch) {
            this.parts = null
            this.autoComplete.doneSearch = false
          }
          return q
        })
      return {
        headerSearch$
      };
    },
    methods: {
      ...mapActions('pagination', ['textSearch']),
      keyEnter() {
      },
      startTextSearch() {
        this.$router.push('/products/')
        this.$store.commit('SET_TEXT_SEARCH', this.headSearch)
        this.$store.commit('pagination/resetPagination')
        return this.textSearch({ query: this.headSearch, direction: undefined })
      },
      logout () {
        this.$router.push('/login')
        this.$store.dispatch("auth/logout")
      },
      cartToggle () {
        this.toggleMenu(false)
        this.$router.push('/emptyCart')
      },
      toggleCart (isVisible) {
        this.$store.commit('SET_CART_VISIBLE', isVisible)
        this.$router.push('/emptyCart')
      },
      toggleMenu (isVisible) {
        this.$store.commit('SET_MENU_VISIBLE', isVisible)
        this.$router.push('/emptyCart')
      },
      headerMainSearch (slug, partName) {
        this.$router.push(`/products/${slug}/brand/all`)
        this.headSearch = partName
        this.autoComplete.doneSearch = true
        this.parts = null

      },
      instantiateFuzzy () {
        if (!(this.searcher instanceof FuzzySearch)) {
            this.searcher = new FuzzySearch(this.carPartList, ['part_name', 'car_name','maker_name'], {
            caseSensitive: false,
           })
        }
        return (searchText) => {
          return this.searcher.search(searchText)
        }
      }
    },
    mounted() {
      let target = document.getElementById('menu-cart')
      console.log('here is target ', target.y)
      let targetPosition = target.getBoundingClientRect()
      window.addEventListener('scroll',function(){
        let height = window.scrollY
        if (height > targetPosition.y) {
          // target.classList.remove('level-item')
          target.classList.add('sticky')
        }
        if (height < targetPosition.y) {
          target.classList.remove('sticky')
        }
      })
    }
  }
</script>

