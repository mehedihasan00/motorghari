<template>
  <footer>
    <div class="container">
      <!-- start footer-top -->
      <div class="columns">
          <div class="column is-4">
            <div class="footer-content">
              <h1>Get to know us</h1>
              <ul>
                <li><a href="/about">About Motorgari</a></li>
                <li><a href="/faq">FAQ's</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of use</a></li>
              </ul>
            </div>
          </div>
          <div class="column is-4">
            <div class="footer-content">
              <h1>Let us help you</h1>
              <ul>
                <li><a href="/profile">Your Account</a></li>
                <li><a href="/my-cart">Your Cart</a></li>
                <li><a href="/order">How to Order</a></li>
                <li><a href="/shipping">Shipping Rates</a></li>
              </ul>
            </div>
          </div>
          <div class="column is-4">
            <div class="footer-content">
              <h1>Get in touch</h1>
              <ul>
                <li><a href="https://www.google.com.bd/maps/@23.8652581,90.3873769,18z?hl=en" target="_blank"><i class="fas fa-map-marker-alt"></i> Sector:12, Road:2/A, House:08 Uttara, Dhaka 1230</a></li>
                <li><a href="http://www.motorgari.shop/"><i class="fas fa-globe"></i> www.motorgari.shop</a></li>
                <li><a href="#"><i class="fas fa-envelope"></i> info@motorgari.shop</a></li>
                <li><a href="#"><i class="fas fa-phone"></i> +8801711272324</a></li>
              </ul>
              
            </div>
          </div>
          
      </div>
      <!-- end footer top-->
      <!-- ssl verified logo -->

      <div class="columns">
        <div class="column is-8">
          <img src="~/assets/ssl_commerz.png" alt="">
        </div>
        <div class="column is-4 ">
          <div class="footer-bottom ">
                <ul class="has-text-centered">
                  <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                </ul>
              </div>
        </div>
      </div>

      <!-- right reserved -->
      <div class="columns">
        <div class="column is-12">
          <div class="footer-content">
            <p><a href="http://www.motorgari.shop/">© Motorgari Shop.</a> All Rights Reserved</p>
          </div>
        </div>
      </div>
      <!-- end footer bottom -->
    </div>
  </footer>
</template>
<style scoped>
  .footer-content h1 {
    font-size: 30px;
    padding-bottom: 25px;

  }

  .footer-content ul li a {
    color: #c8c8c8;
    font-size: 14px;
    line-height: 36px;
    text-transform: uppercase;
  }
  .footer .block-subscribe .input-box {
    padding-top: 0;
    width: 100%;
  }
  .footer-bottom {
    text-align: right;
    margin-top: 15px;
  }
  .footer-bottom ul {
    display: flex;
  }
  .footer-bottom ul li {
    flex: 1;
  }
  .footer-bottom li a:hover i {
    color: #fff;
    background: #f2d03b;
  }
  .footer-bottom ul li a i {
    font-size: 22px;
    line-height: 60px;
    color: #cfcfcf;
    background: #ebebeb;
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 90px;
    text-align: center;
    -webkit-transition: 0.3s ease;
    -o-transition: 0.3s ease;
    transition: 0.3s ease;
  }
  .footer-bottom ul li:first-child {
    flex: 1;
  }
  .input-text {
    width: 100%;
    border-color: #ebebeb;
    padding: 18px 8px;
    margin-bottom: 5px;
    margin-top: 10px;
    border-radius: 2px;
  }
  .button {
    font-size: 14px;
    line-height: 17px;
    width: 100%;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    background: #ffd83d;
    display: inline-block;
    border: 0;
    color: #000;
    text-align: center;
    font-weight: normal;
    line-height: 19px;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: normal;
    position: relative;
    z-index: 0;
    overflow: hidden;
    -webkit-transition: 0.2s ease;
    -o-transition: 0.2s ease;
    transition: 0.2s ease;
  }

  .footer-content p {
    padding-top: 35px;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    .footer-content {
      text-align: center;
      padding: 0 .5rem .5rem .5rem;
      border-bottom: 1px solid #eee;
    }
    .footer-content p {
      text-align: center;
    }
    .footer-bottom {
      text-align: center;      
    }
  }
</style>