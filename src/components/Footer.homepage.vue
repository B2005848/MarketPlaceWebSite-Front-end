<template>
  <footer class="mt-3">
    <!-- introduction for shine on you  -->
    <div class="d-flex justify-content-center">
      <pre class="text-center lh-lg">
    Welcome to <b style="color:#ff6e6c;">SHINEONYOU</b> – Your One-Stop Destination for All Your Shopping Needs! At SHINEONYOU, we take pride in being your go-to online marketplace
    where you can find a diverse range of products to meet all your needs. Whether you're looking for the latest fashion trends, high-quality
    electronics, stylish home decor, or any other essentials, we've got you covered. Explore our extensive collection that spans across various
    categories, carefully curated to bring you the best in every sector. Our commitment is to provide a seamless and enjoyable shopping experience,
    coupled with the convenience of having everything you desire in one place. Discover the ease of navigating through a platform designed to cater to your
    diverse preferences. From fashion-forward clothing to cutting-edge gadgets, from home essentials to lifestyle products – SHINEONYOU is more than just a
    brand; it's your ultimate destination for all things shopping. Join us at SHINEONYOU and experience the joy of finding exactly what you're looking
    for, with the assurance of quality and convenience that you deserve. <a href="#">Happy shopping!</a>
    </pre>
    </div>

    <!-- service -->
    <div class="service d-flex justify-content-evenly">
      <div class="item-service">
        <!-- CUSTOMER SERVICE -->
        <h1>CUSTOMER SERVICE</h1>
        <div class="mt-3">
          <ul>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">SHINEONYOU Blog</a></li>
            <li><a href="#">SHINEONYOU Mail</a></li>
            <li><a href="#">How To Buy</a></li>
            <li><a href="#">How To Sell</a></li>
            <li><a href="#">Payment</a></li>
            <li><a href="#">SHINEONYOU Coins</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Return & Refund</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Warranty Policy</a></li>
          </ul>
        </div>
      </div>

      <!-- ABOUT US -->
      <div class="item-service">
        <h1>ABOUT SHINEONYOU</h1>
        <div class="mt-3">
          <ul>
            <li><a href="">About Us</a></li>
            <li><a href="">SHINEONYOU Careers</a></li>
            <li><a href="">SHINEONYOU Poilcies</a></li>
            <li><a href="">Privacy Policy</a></li>
            <li><a href="">Shopping Mall</a></li>
            <li><a href="">Seller Centre</a></li>
            <li><a href="">Flash Deals</a></li>
            <li><a href="">Media Contact</a></li>
          </ul>
        </div>
      </div>
      <!-- PAYMENT -->
      <div class="item-service">
        <h1>PAYMENT</h1>
        <div class="mt-3">
          <img
            src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png"
            alt=""
          />
          <img
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div>
          <img
            src="data:image/png;base64,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"
            alt=""
          />

          <img
            src="https://cdn.pixabay.com/photo/2018/08/25/21/08/money-3630935_960_720.png"
            alt=""
          />
        </div>
      </div>

      <div class="item-service">
        <h1>FOLLOW US</h1>
        <div class="mt-3">
          <a href="https://www.facebook.com/?locale=vi_VN">
            <font-awesome-icon
              class="me-2"
              icon="fa-brands fa-facebook"
              size="2xl"
              style="color: #005eff"
            />
            <span>Facebook</span></a
          >
        </div>
      </div>
    </div>
    <hr />

    <div style="background-color: rgb(208, 223, 236) 185, 230">
      <div>
        <p>&copy; 2023 Shineonyou. All Rights Reserved .</p>
      </div>

      <!-- PUBLIC -->
      <div class="public text-center">
        <div>
          <a href="#">
            <img
              class="me-5"
              src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoCCDV.png"
              alt=""
            />
            <img
              src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoCCDV.png"
              alt=""
            />
          </a>
        </div>

        <div>
          <p>Shineonyou Company Limited</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.d-flex:nth-child(1) {
  color: #000000;
  grid-area: auto;
  line-height: 15.75px;
  padding: 0px 0px 28.125px;
}

.d-flex:nth-child(1) pre {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.item-service img {
  max-width: 50px;
  margin: 10px;
}

.item-service h1 {
  font-size: 15px;
  font-weight: bold;
}

.item-service a,
.item-service ul {
  text-decoration: none;
  list-style: none;
  line-height: 0.9cm;
  color: #000000;
}

.item-service li {
  text-align: start;
}
.item-service a:hover {
  color: rgb(88, 88, 238);
}

.public {
  line-height: 1.5cm;
}
.public img {
  max-width: 100px;
}
</style>
