<template>
  <header>
    <theHeader />
  </header>

  <div class="mt-3">
    <div class="gril">
      <!-- menu sidebar -->
      <div>
        <h1 style="font-size: 20px">PRODUCT CATALOG</h1>
        <theMenuSidebar />
      </div>
      <!-- img banner -->
      <div>
        <theBanner />
        <div class="mt-5">
          <theMain />
        </div>
      </div>
      <div></div>
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
import theMenuSidebar from "@/components/Menusidebar.homepage.vue";
import theFooter from "@/components/Footer.homepage.vue";
import theMain from "@/components/Body.homepage.vue";
</script>

<style scoped>
.gril {
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr;
  justify-content: space-between;
}
</style>
