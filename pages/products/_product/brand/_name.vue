<template>
    <section>
      <product-title />
      <div class="container">
        <breadcrumb />
        <div id="main-content" class="columns is-multiline">
          <div id="filter-mobile-view">
            <button @click="toggleFilter('filterArea', 'filterToogle')" class="button">
              <span v-if="filterToogle">Hide Filter</span>
              <span v-else>Show Filter</span>
            </button>
          </div>
          <div ref="filterArea" id="filter-area" class="column is-3">
            <div class="filter-card">
              <section>
                <h5  @click="toggleFilter('brandArea', 'brandToggle')" class="subtitle caret">Brand <span   class="is-pulled-right"><i :class="[brandToggle ? 'fa fa-caret-down' : 'fa fa-caret-left']"></i></span></h5>
                
                <div id="brandArea" ref="brandArea">
                  <v-jstree :data="makers" show-checkbox multiple allow-batch whole-row no-dots @item-click="itemClick">
                </v-jstree>
                </div>
              </section>
              <section v-if="partMakers.length">
                <h5 @click="toggleFilter('makerArea', 'makerToggle')" class="subtitle caret">Makers <span   class="is-pulled-right"><i :class="[makerToggle ? 'fa fa-caret-down' : 'fa fa-caret-left']"></i></span></h5>
                <div id="makerArea" ref="makerArea">
                  <v-jstree :data="partMakers" show-checkbox multiple allow-batch whole-row no-dots @item-click="pmClick">
                </v-jstree>
                </div>
              </section>
              <section v-if="specs.length && partName !== 'all'">
                <h5 @click="toggleFilter('specArea', 'specToggle')" class="subtitle caret">Specification <span   class="is-pulled-right"><i :class="[specToggle ? 'fa fa-caret-down' : 'fa fa-caret-left']"></i></span></h5>
               <div id="specArea" ref="specArea">
                  <v-jstree :data="specs" show-checkbox multiple allow-batch whole-row no-dots @item-click="itemSpecClick">
                </v-jstree>
               </div>
              </section>
              <section v-if="category.length && brandName !== 'all'">
                <h5 @click="toggleFilter('categoryArea', 'categoryToggle')" class="subtitle caret">Category <span   class="is-pulled-right"><i :class="[categoryToggle ? 'fa fa-caret-down' : 'fa fa-caret-left']"></i></span></h5>
                <div id="categoryArea" ref="categoryArea">
                <v-jstree  :data="category" show-checkbox multiple allow-batch no-dots whole-row @item-click="itemCatClick"></v-jstree>
                </div>
              </section>
            </div>
          </div>
       <div>
       </div>
          <div id="products-list" class="column is-9">
            <div id="price-sort" class="column is-3 ">
              <div class="control">
                <div class="select">
                  <select @change="onChange($event.target.value)" class="is-hovered">
                    <option disabled selected>Sort by price</option>
                    <option value="low">Low > High</option>
                    <option value="high">High > low</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-4" v-for="(p,i) in products" :key="i">
                <product :item="p"/>
              </div>
              <div class="column is-12" v-if="!products.length">
                <h1 class="title has-text-centered">Your search query does not match any item available</h1>
              </div>
              <div class="column is-12 pagination-area">
                <button class="button is-rounded" :disabled="currentPage === 0" @click="paginate('prev')"><i class="fas fa-angle-left"></i></button>
                <span class="pag-text"> {{currentPage + 1}} </span>
                <button class="button is-rounded" :disabled="nextPage" @click="paginate('next')"><i class="fas fa-angle-right"></i></button>
              </div>
            </div>
          </div>
          <div class="column is-12" v-if="products.length != 0">
            <h2 class="title has-text-centered">Similar products</h2>
            <slider :options="{ freeScroll: false, contain: true, prevNextButtons: true }" class="similar-product">
                <product v-for="(p, i) in recommnededProducts" :key="i" :item="p"/>
            </slider>
          </div>
        </div>
      </div>
    </section>
  </template>
  <style scoped>
    .caret {
      cursor: pointer;
    }
    #main-content {
      margin-top: 30px;
    }
    #products-list {
      position: relative;
    }
    #price-sort {
      position: absolute;
      top: -50px;
      right: -90px;
    }
    .pag-text{
      font-size: 1.2rem;
      font-weight: 600;
      padding: 1rem;
      line-height: 1rem;
    }
    .filter-card {
      min-height: 20rem;
    }
    .filter-card section {
      width: 100%;
      display: table;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
    }
    .filter-card section:last-child {
      border-bottom: none;
    }
    .filter-card h5 {
      margin-bottom: 1rem !important;
    }

    .pagination-area {
      text-align: center;
      padding: 50px 0px;
    }
    .pagination-area a {
      background: #ffdd57;
    }

    .pagination-area button {
      cursor: pointer;
    }

    .pagination-area span {
      padding-top: 10px;
      display: inline-block;
    }
  
    .tree-icons {
      padding-right: 10px;
      cursor: pointer;
    }
    .VueCarousel-navigation-button {
      background: #ccc !important;
    }
    .button.is-rounded {
      border-radius: 290486px;
      padding-left: 0.8em;
      padding-right: 0.8em;
    }
    #filter-mobile-view {
      display: none;
    }
    #brandArea, #categoryArea, #specArea, #makerArea {
      display: none;
    }
    @media (max-width: 425px) {
      #filter-area {
        display: none;
      }
      #price-sort {
        right: 4%
      }
      #filter-mobile-view {
        display: block;
        position: relative;
        left: 5%;
      }
      .filter-card {
        margin-bottom: 40px;
      }
    }
    
  </style>
  <style>
    .similar-product .product-box {
      width: 14rem;
      margin: .5rem;
    }
    .tree-anchor .tree-themeicon {
      display: none !important;
    }
    .tree-default .tree-themeicon-custom {
      display: none;
    }
    .tree-anchor .count {
      position: absolute;
      color: #aaa;
      font-weight: 600;
      text-align: center;
      width: 20px;
    }
    .tree-anchor .count.is-1 {
      left: 190px;
    }
    .tree-anchor .count.is-2 {
      left: 160px;
    }
    .tree-anchor .count.is-3 {
      left: 130px;
    }
    .flickity-page-dots {
      display: none !important;
    }
  </style>
  
  <script>
    import Slider from '~/components/Slider'
    import ProductTitle from '~/components/ProductTitle.vue'
    import Breadcrumb from '~/components/Breadcrumb.vue'
    import Product from '~/components/Product.vue'
    import * as parts from '~/api/parts'
    import * as commonApi from '~/api/common'
    import * as productRoute from '~/api/product'
    import {makerTree, partMakerTree, specTree, categoryTree} from '~/helper/filter'
     import {onClickMakerTree, onPartMakerClick, onSpecsTreeClick, onCatClick} from '~/helper/product'
    import VJstree from 'vue-jstree'
    import { mapMutations, mapActions, mapState} from 'vuex'
    
    export default {
      data() {
        return {
          selectValue: [],
          isOpened: false
        }
      },
      async asyncData({ store, params }) {
        let partName = params.product
        let brandName = params.name
        const header = await commonApi.headerValue(partName, brandName)
        await store.dispatch('home/fetchAllCarParts')
        // fetch recommended products
        let recommended = await productRoute.recommnededProducts(partName)
       
        // fetch makerGroup
        let mkGroup = await productRoute.makerGroups(header.brand, header.partId || header.part)
        const parts = partName.includes('top') ? ['top'] : header.partId ? [header.partId] : undefined
        const cars = brandName.includes('all') ? undefined :  [{maker: header.brand}]
        const initialProductQuery = { parts, cars, page: 0}
        // fetch products list
        let prod = await productRoute.filterProducts(initialProductQuery)
        let count
        if (initialProductQuery.page === 0) {
          count = prod.data.count
        }
        let productQuery = {cars: [], parts: [], specs: [], page: 0, sort: ''}
        // /products/all/brand/honda
        let cat, sp;
        if (partName.includes('all') && !brandName.includes('all') ) {
          cat = await productRoute.categoryByBrand(header.brand)
        } else if (!partName.includes('top')) {
          productQuery.parts.push(header.partId)
          sp = await productRoute.specs(header.partId)
        }
        await store.dispatch('home/addTopParts')

        store.commit('SET_HEAD', [`${header.part || partName} for ${brandName}`])
        // dynamic breadcrumb
        let breadCrumbUrl = [
          {title: 'Product', url: `/products/${partName}/${brandName}`}
        ]
        store.commit('SET_BREAD_CRUMB', breadCrumbUrl)

       
        // do not delete query
        let query = `${partName},${brandName}`
        return {
          query,
          header,
          partName,
          brandName,
          makerGroup: mkGroup.data || [],
          recommnededProducts: recommended.data,
          makerOfParts: mkGroup.partMakers || [],
          filterText: null,
          initialProductQuery,
          productQuery,
          count,
          currentPage: 0,
          spk: sp && sp.data || [],
          products: prod.data.items || [],
          categoryList: cat && cat.data || [],
          ptMakers: [],
          brandMap: null,
          categoryMap: null,
          specsMap: null,
          filterToogle: false,
          brandToggle: false,
          categoryToggle: false,
          specToggle: false,
          makerToggle: false
        }
      },
      components: {
        ProductTitle,
        Breadcrumb,
        Product,
        VJstree,
        Slider
      },
      computed: {
        topProducts () {
          return this.$store.state.home.topParts;
        },
        nextPage() {
          return this.count - (9 * (this.currentPage + 1)) <= 0
        },
        makers() {
          return makerTree(this.makerGroup, this.brandName)
        },
        partMakers () {
         return partMakerTree(this.makerOfParts)
        },
        specs () {
          return specTree(this.spk)
        },
        category () {
          return categoryTree(this.categoryList)
        }
      },
      watch: {
        productQuery: {
          async handler(val) {
            if (!val.cars.length && !val.parts.length && !val.specs.length && !val.sort.length) {
              this.initialProductQuery.page = val.page
              let prod = await productRoute.filterProducts(this.initialProductQuery)
              this.paginationHelper(prod, this.initialProductQuery)
            } else {
              let prod = await productRoute.filterProducts(this.productQuery)
              this.paginationHelper(prod, this.productQuery)
            }
          },
          deep: true
        }
      },

      methods: {
        ...mapActions('product', ['byBrandName', 'byCategoryName']),
        itemClick(node, item) {
          this.productQuery.cars = onClickMakerTree(node, item)
        },
        toggleFilter (ref, property) {
          this.$refs[ref].style = (this.$refs[ref].style.display) ? 'display: ' : 'display: block'
          this[property] = !this[property]
        },
        onChange(value) {
          this.productQuery.sort = value
           if (!this.productQuery.cars.length && !this.productQuery.parts.length) {
            this.productQuery.cars = this.initialProductQuery.cars
          }
        },
        pmClick (node, item) {
          this.productQuery.partMakers = onPartMakerClick (item)
        },
        async itemSpecClick (node, item) {
          this.productQuery.specs = onSpecsTreeClick(node, item)
        },
        async itemCatClick (node, item) {
          this.productQuery.cars = []
          this.productQuery.parts = onCatClick(node, item)
        },
        async paginate (direction) {
          if('prev' === direction) {
            this.currentPage -= 1
          } else {
            this.currentPage += 1
          }
          this.productQuery.page = this.currentPage
        },
        paginationHelper (result, query) {
          let count;
          let productList = []
          if (query.page === 0) {
            this.count = result.data.count
          }
          this.products = result.data.items
        }
      }
     
    }
  
  </script>