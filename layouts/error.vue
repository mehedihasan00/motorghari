<template>
  <div class="container">
    <a class="button is-warning" href="/">Back To Home</a>
    <div class="has-text-centered area box">
      <h1 clas>404</h1>
      {{error.message}}
      <h2 v-if="error.statusCode === 404">Ooops ! Page not found</h2>
      <h2 v-else>Ooops ! An error occurred</h2>
    </div>
    <div class="has-text-centered area box">
      <h5>Hey good people, Can you please suggest my owner to buy some parts form <h3 style="color: blue">motorgari.shop</h3> and repair me, Instead of wasting me like this. You know we feel happy when we serve people.</h5><br><br>
      <figure class="image is-2by1">
        <img src="http://www.lolwot.com/wp-content/uploads/2016/02/15-high-end-cars-abandoned-in-dubai-1.jpg">
      </figure>
    </div>
  </div>
</template>
<style scoped>
  .button {
    margin-top: 50px;
  }
  .area {
    margin-top: 100px;
    background: #f6f6f6;
    margin-left: 20%;
    margin-right: 20%;
  }
  .area h1 {
    font-size: 130px;
  }
</style>
<script>
export default {
  props: ['error'],
//   layout: 'blog' // you can set a custom layout for the error page
}
</script>