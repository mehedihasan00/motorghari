<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="content-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="content box">
              <p><strong>MotorGari</strong>  stands as one of the most trusted internet retailers online. Dedication, commitment to quality service, high level of professionalism and product dependability and competitive prices are reasons that underlie our success in the auto industry. Through the years of providing superior quality automotive parts and accessories nationwide, our company has been distinguished as one of the most established auto parts retailers online. We have a team of professionals fervently working to give you a complete and most competitive line of automotive parts and the best customer support as well.</p>
              <p><strong>MotorGari</strong>  has a huge inventory to meet your requirement for replacement parts, accessories, lubricant for different brand vehicles are available in Bangladesh. We keep most parts in our stock and also import parts upon order. We at <a href="http://www.motorgari.shop/">www.motorgari.shop</a>  try our very best to make your shopping experience hassle-free and convenient.</p>
              <p>Our company focuses on the Car spare parts and Accessories mostly . We also have a huge stock of Automobile modification stuffs and performance parts for specific and universal cars . We always try to provide our goods and services below the market price . Because we believe "Customer Relationship" is even more important than company profit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
  .content-area {
    background:#fff;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  async asyncData ({ store }) {
    let breadCrumbUrl = [
      {title: 'About Us', url: '/about'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['About Us', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>