<template>
  <header>
    <theHeader />
  </header>

  <div class="mt-3">
    <div class="main">
      <!-- img banner -->
      <theBanner />

      <div class="p-2 mt-5 border-top">
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
</script>

<style scoped>
.main {
  max-width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: aliceblue;
}
</style>
