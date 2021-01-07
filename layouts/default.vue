<template>
  <div class="main">
    <div class="company-name animated bounceIn" >
      <nuxt-link to="/"><img src="/img/logo.png" alt=""></nuxt-link>
    </div>
    <div class="page">
      <header-main />
      
      <div class="inner-body">
        <!-- Popup Cart from menu -->
        <menu-cart />
        <!-- Inner Changing Body -->
       
        <nuxt/>
        
      </div>  
      <div class="fb-customerchat"
        page_id="1765099593790373"
        theme_color="#89B93F"
        logged_in_greeting="Hey There!"
        minimized="false">
      </div>
      <!-- footer -->
      <footer-area />
     
    </div>

  </div>
</template>

<script>
import HeaderMain from '~/components/HeaderMain.vue'
import FooterArea from '~/components/FooterArea.vue'
import MenuCart from '~/components/MenuCart.vue'

export default {
  transition: 'bounce',
  data() {
    return {
      isLoaded: false
    }
  },
  components: {
    HeaderMain,
    MenuCart,
    FooterArea
  },
  mounted() {
    var self = this
    setTimeout(() => {
      self.isLoaded = true
    }, 1000);
    
  }
}
</script>
<style>
.container {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
body{
  font-family: "Nunito", sans-serif;
}
h1 a, h1 a:hover {
  color: #ffd83d;
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s
}
.page-enter, .page-leave-active {
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in .8s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  animation-duration: 0.75s;
  animation-name: bounceIn;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

</style>

