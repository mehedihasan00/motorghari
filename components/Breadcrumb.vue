<template>
  <div class="breadcrumb-box">
    <div class="breadcrumb-text">
      <i class="fas fa-home"></i>
      <span> <nuxt-link to="/">Home</nuxt-link></span>
     
      <span>/</span>
      <span v-for="(item,i) in breadcrumb" :key="i"><nuxt-link class="" :to="item.url">{{item.title}}</nuxt-link></span>
    </div>
    
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState(['heading', 'breadcrumb'])
  }
</script>
