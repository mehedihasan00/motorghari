<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="content-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="content box">
              <p>When you use our Website, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience. This allows us to provide services and features that most likely meet your needs, and to customize our website to make your experience safer and easier. More importantly, while doing so, we collect personal information from you that we consider necessary for achieving this purpose.</p>
              <p>Below are some of the ways in which we collect and store your information:</p>
              <ul>
                <li>We receive and store any information you enter on our website or give us in any other way. We use the information that you provide for such purposes as responding to your requests, customizing future shopping for you, improving our stores, and communicating with you.</li>
                <li>We also store certain types of information whenever you interact with us. For example, like many websites, we use "cookies," and we obtain certain types of information when your web browser accesses motorgari.shop or advertisements and other content served by or on behalf of motorgari.shop on other websites.</li>
                <li>To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from Motorgari if your computer supports such capabilities.</li>
              </ul>
              <p>Information about our customers is an important part of our business, and we are not in the business of selling it to others. </p>
              <p>We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of motorgari.shop, our users, or others. This includes exchanging information with other companies and organizations for fraud protection.</p>
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
      {title: 'Privacy Policy', url: '/privacy-policy'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['Privacy Policy', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>