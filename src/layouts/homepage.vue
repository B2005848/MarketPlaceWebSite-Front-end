<template>
  <header>
    <theHeader />
  </header>

  <div class="mt-3 main">
    <div>
      <!-- img banner -->
      <div style="padding: 20px">
        <theBanner />
      </div>
      <!-- CATALOG -->
      <div class="mt-5">
        <theCateLog />
      </div>

      <!-- LIST PRODUCTS -->
      <hr
        style="
          font-weight: 700;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
            rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
            rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
        "
      />
      <div class="p-2 pe-5 ps-5 mt-5">
        <h2
          class="mb-5"
          style="
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: 500;
            color: #ff6e6c;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
              rgba(179, 122, 122, 0.22) 0px 15px 12px;
            border-radius: 13px;
            padding: 15px;
          "
        >
          TODAY'S PROPOSAL
        </h2>
        <theMain />
      </div>
    </div>
  </div>

  <router-view></router-view>

  <hr />

  <footer class="mt-5">
    <theFooter />
  </footer>
</template>
<script setup>
import theHeader from "@/components/HomePageHeader.vue";
import theBanner from "@/components/banner.homepage.vue";
import theFooter from "@/components/Footer.homepage.vue";
import theMain from "@/components/Body.homepage.vue";
import theCateLog from "@/components/Catelogies.homepage.vue";
</script>

<style scoped>
.main {
  max-width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: aliceblue;
  border-radius: 13px;
}
</style>
