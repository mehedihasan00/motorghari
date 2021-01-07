<template>
  <div class="search-title-box has-text-centered ">
    <div class="text-container">
      <h1 :class="{'parts-searched-title': true}">{{heading.title}}</h1>
    </div>
  </div>
</template>
<style>
  .parts-title-middle {
    padding-top: 1.5rem;
  }
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState(['heading', 'breadcrumb'])
  }
</script>
