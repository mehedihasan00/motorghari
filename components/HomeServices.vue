<template>
  <div class="service-section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="service-box maintenance">
          <p class="service-title">Maintenance<br/>&amp; Repair</p>
          <nuxt-link to="/repair">
            <i class="fas fa-search"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="column is-12">
        <div class="service-box washing">
          <p class="service-title">Washing<br/>&amp; Cleaning</p>
          <nuxt-link to="/washing">
            <i class="fas fa-search"></i>
          </nuxt-link>
        </div>
      </div>
      <div class="column is-12">
        <div class="service-box interior">
          <p class="service-title">Interior<br/>&amp; Exterior</p>
          <nuxt-link to="/interior">
            <i class="fas fa-search"></i>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .maintenance {
    background-image: url(https://image.freepik.com/free-photo/man-with-checking-car-engine_1150-1524.jpg);
    background-position-y: -170px;
  }
  .washing {
    background-image: url(https://image.freepik.com/free-photo/women-washing-car-with-yellow-sponge_40565-96.jpg);
    background-position-y: -60px;
    background-position-x: -65px;
  }
  .interior {
    background-image: url(https://image.freepik.com/free-photo/hand-touching-the-radio-dial_1088-628.jpg);
    background-position-y: -95px;
  }
</style>
