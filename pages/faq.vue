<template>
  <section>
    <product-title />
    <div class="container">
      <breadcrumb />
      <div class="content-area">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="content box">
              <h2>Frequently Asked Questions</h2>
              <dl>
                <dt>Q. How does the site work?</dt>
                <dd>A. You can browse the site or use our search engine to find your desired products. You can then add them to your shopping bag and click on place order. You let us know your address, select a delivery time – and voila, you are done.  A Motorgari  representative will then deliver your order right to your home or office.</dd>
                <dt>Q. How can I contact you?</dt>
                <dd>A. Contact Number ************</dd>
                <dt>Q. How long do the deliveries take?</dt>
                <dd>A. We are serving with 1 Hour Delivery Service, to Uttara, Tongi, Mirpur, Cantonment, Banani, Banani DOHS, Gulshan, Baridhara, Baridhara DOHS, Badda, Mohakhali, Mohakhali DOHS, Khilgaon, Paltan, Motijheel, Banasree, Moghbazar, Malibag, Razarbag, Kallyanpur, Shyamoli, Paikpara, Pallabi and Mohammedpur. For the rest of the Dhaka city we are currently delivering within 4-7 hours timeframe.  You can also specify a convenient time and we will send the products during that time.</dd>
                <dt>Q. What are your delivery hours?</dt>
                <dd>A. We deliver from 10 am to 8 pm every day. You can choose from available slots to find something that is convenient to you</dd>
                <dt>Q. How do I know when my order is here?</dt>
                <dd>A. A Motorgari representative will call you as soon as they are at your house to let you know about your delivery.</dd>
                <dt>Q. How do I pay?</dt>
                <dd>A. We accept cash on delivery and we also have Online Credit Card and Online Bkash service. Don’t worry, our Motorgari representatives should always carry enough change.</dd>
                <dt>Q. Do you serve my area?</dt>
                <dd>A. We are currently serving all of Dhaka city, except certain parts of Old town</dd>
                <dt>Q. My order is wrong. What do I do?</dt>
                <dd>A. Immediately call ******** and let us know the problem.</dd>
                <dt>Q. What if the item is out of stock?</dt>
                <dd>A. We hold our own inventory, so we rarely run of out stock. However, we will try our best to source what you need. If we cannot find it, we will call you and let you know what substitutes are available.</dd>
                <dt>Q. Why should we buy from you when I have a store nearby?</dt>
                <dd>A. Well, that is up to you but you can also be a couch potato like our founders and have your items delivered to your house for free. Our prices are sometimes lower than that of major superstores in the city. We also carry a larger variety than the average corner-store. So, there is really no reason to not buy from us</dd>
                <dt>Q. What about the prices?</dt>
                <dd>A. Our prices are our own but we try our best to offer them to you at or below market prices. Our prices are the same as the local market and we are working hard to get them even lower! If you feel that any product is priced unfairly, please let us know</dd>
                <dt>Q. How do you deliver?</dt>
                <dd>A. We use our own fleet to deliver. Our goal is to the products to your home in time</dd>
                <dt>Q. What is your policy on refunds?</dt>
                <dd>A. You may get a refund within seven (7) days on unopened or spoilt packaged products. For diapers and perishable products, such as milk, fruits and fresh vegetables, we have a one (1) day return policy. We will not accept any diaper items as return if more than 20% of the pack has been used. We reserve the right to refuse refund. Please contact us at +880-188-1234-567 if you want to return an item.</dd>
                <dt>Q. What about quality?</dt>
                <dd>A. We try our best to source the best quality items for you but if you are dissatisfied, you can always send them back with the delivery person. If you forget to do that, you can call us within 3 days and we will replace the item for free.</dd>
                <dt>Q. How are you sourcing your products?</dt>
                <dd>A. We have deals with whole-sellers, manufacturers and importers. We only sell authentic products.</dd>
                <dt>Q. Should I tip the delivery representative?</dt>
                <dd>A. Tips are not required. But our delivery team members appreciate recognition for their hard work. Delivery representatives keep the entire tip amount.</dd>
              </dl>
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
  .content dt {
    font-weight: bold;
  }
  .content dd {
    padding-bottom: 20px;
  }
</style>
<script>
import ProductTitle from '~/components/ProductTitle.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  async asyncData ({ store }) {
    let breadCrumbUrl = [
      {title: 'FAQ\'\s', url: '/faq'}
    ]
    store.commit('SET_BREAD_CRUMB', breadCrumbUrl)
    store.commit('SET_HEAD', ['FAQ\'\s', ''])
    store.commit('SET_HEAD_SEARCH', true)
  },
  components: {
    ProductTitle,
    Breadcrumb
  }
}
</script>