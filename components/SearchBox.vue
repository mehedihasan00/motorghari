<template>
  <div class="search-box">
    <div class="container">
      <div class="search-bar">
        <div class="search-part">
          <input id="parts" ref="part" type="search" v-model="text.parts" placeholder="Parts: Type or Click below" @focus="focus" @blur="blur" @input="searchChange" @keyup.enter="keyEnter" @keydown.tab="keyTab" @keydown.up="keyUp"  @keydown.down="keyDown"/>
        </div>
        <div class="search-brand">
          <input id="makes" ref="make" type="search" v-model="text.makes" placeholder="Maker/Model"  @focus="focus" @blur="blur" @keyup.enter="keyEnter" @input="searchChange" @keydown.up="keyUp" @keydown.down="keyDown"/>
        </div>
        <div class="search-button">
          <nuxt-link v-if="text.parts != ''" :to="`/products/${partName}/brand/${makeName}`">
            <i class="fas fa-search"></i>
          </nuxt-link>
          <nuxt-link  v-else :to="`/`">
            <i class="fas fa-search"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="v-autocomplete">
        <div class="v-auto-container">          
          <div id="v-parts" class="v-autocomplete-list parts" v-if="(show.parts && text.parts.length > 0) || keepOpen.parts" @mouseover="keepOpen.parts = true" @mouseout="keepOpen.parts = false">
            <div class="v-autocomplete-list-item" v-for="(item, i) in parts" :class="{'v-autocomplete-item-active': i === cursor.parts}" @click="onClickItem(item, 'parts')" :key="i">
              <span>{{item.name}}</span>
            </div>
          </div>
          <div id="v-makes" class="v-autocomplete-list makes" v-if="(show.makes && text.makes.length > 0) || keepOpen.makes" @mouseover="keepOpen.makes = true" @mouseout="keepOpen.makes = false">
            <div  class="v-autocomplete-list-item" v-for="(item, i) in makes" @click="setMakes(item, 'makes')" :class="{'v-autocomplete-item-active': i === cursor.makes}" :key="i">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {toKebabCase} from '../helper'
export default {
  data() {
    return {
      item: {
        id: 9,
        name: "Lion",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      },
      filterMakes: [],
      text: {
        parts: "",
        makes: ""
      },
      slug: {
        parts: null,
        makes: null
      },
      show: {
        parts: false,
        makes: false
      },
      keepOpen: {
        parts: false,
        makes: false
      },
      cursor: {
        parts: -1,
        makes: -1
      }
    };
  },
  computed: {
    partName() { return this.slug.parts || toKebabCase(this.text.parts)},
    makeName() { return this.slug.makes || this.text.makes ? toKebabCase(this.text.makes) : 'all' },
    parts() { return  this.$store.state.search.parts },
    makes() { return  this.$store.state.search.makes }
  },
  subscriptions() {
    var self = this
    var parts$ = this.$watchAsObservable("text.parts")
      .pluck("newValue")
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(this.fetchParts)
    var partsImage$ = this.$watchAsObservable("text.parts")
      .pluck("newValue")
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap(this.setPartsImage)
    var makes$ = this.$watchAsObservable("text.makes")
      .pluck("newValue")
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(this.fetchMakes)
    return {
      parts$,
      partsImage$,
      makes$
    };
  },
  methods: {
    ...mapActions({
      setPartsImage: 'home/setPartsImage',
      fetchParts: 'search/fetchParts',
      fetchMakes: 'search/fetchMakes'
    }),
    
    searchChange(e) {
      this.show[e.target.id] = true;
      this.cursor[e.target.id] = -1;
      this.slug[e.target.id] = null
      this.onSelectItem(null, "searchChange");
    },
    focus(e) {
      this.show[e.target.id] = true;
    },
    blur(e) {
      this.show[e.target.id] = false;
    },
    keyEnter(e) {
      if (this.cursor[e.target.id] > -1) {
        this.text[e.target.id] = this[e.target.id][this.cursor[e.target.id]].name
        this.slug[e.target.id] = this[e.target.id][this.cursor[e.target.id]].slug
        if (e.target.id === 'parts') {
          this.$refs.make.focus()
          return
        }
      }
      if (this.text.parts.length === 0) return
      if(this.partName != '') {
        this.$router.push(`/products/${this.partName}/brand/${(this.makeName) ?this.makeName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-').replace(/\-+/g, '-'): 'all'}`)
      } else {
        this.$router.push('/')
      }
    },
    filter () {
      let makesArray = [...new Set(this.makes.map(m => m.name))].map(m => ({name: m}))
      this.filterMakes = makesArray.filter(m => m.name.toLowerCase().indexOf(this.text.makes.toLowerCase()) > -1)
    },
    keyTab(e) {
      e.preventDefault()
      if (this[e.target.id]['0']) {
        this.text[e.target.id] = this[e.target.id]['0'].name
        this.slug[e.target.id] = this[e.target.id]['0'].slug
        this.keepOpen[e.target.id] = false;     
      }
      this.$refs.make.focus();
    },
    keyUp(e) {
      if (this.cursor[e.target.id] > -1) {
        this.cursor[e.target.id]--;
        this.itemView(this.$el.getElementsByClassName('v-autocomplete-list-item')[this.cursor[e.target.id]])
      }
    },

    keyDown(e) {
      if (this.cursor[e.target.id] < this[e.target.id].length) {
        this.cursor[e.target.id]++;
        this.itemView(
          this.$el.querySelectorAll(
            `#v-${e.target.id} .v-autocomplete-list-item`
          )[this.cursor[e.target.id]]
        );
      }
    },
    setMakes(item, type) {
      this.text.makes = item.name
      this.keepOpen[type] = false;
      this.$refs.make.focus();
      this.show.makes = false;
    },
    onClickItem(item, type) {
      this.onSelectItem(item, type);
      this.keepOpen[type] = false;
      this.$refs.make.focus();
    },
    onSelectItem(item, type) {
      if (item) {
        this.text[type] = item.name;
      } 
    },
    itemView(item) {
      if (item && item.scrollIntoView && !this.isElementInViewport(item)) {
        item.scrollIntoView(false);
      }
    },
    isElementInViewport(el) {
      var rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight ||
            document.documentElement.clientHeight) /*or $(window).height() */ &&
        rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /*or $(window).width() */
      );
    }
  }
};
</script>


<style lang='sass'>
.v-autocomplete
  top: 58%
  position: relative
  max-width: 40rem
  margin: auto
  margin-top: 1px
  .v-auto-container
    position: absolute
    z-index: 999  
    display: flex
    width: 100%
    .v-autocomplete-list
      text-align: left
      border: none
      border-top: none
      max-height: 400px
      overflow-y: auto
      border-radius: .3rem
      border-bottom-left-radius: .5rem
      border-bottom-right-radius: .5rem
      box-shadow: 0 2px 4px 0 #888
      &.parts
        flex: 6
      &.makes
        flex: 4
      .v-autocomplete-list-item
        font-size: .9rem
        cursor: pointer
        background-color: #fff
        padding: 8px 12px
        border-bottom: 1px solid #eee
        &.v-autocomplete-item-active
          background-color: #eee
        &:last-child
          border-bottom: none
        &:hover
          background-color: #eee
</style>

