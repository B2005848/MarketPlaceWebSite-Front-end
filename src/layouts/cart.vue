<template>
  <header>
    <theHeader />
  </header>

  <main>
    <!-- process at cart list -->
    <theProcess />

    <!-- render router children -->
    <router-view></router-view>
  </main>

  <hr />
  <footer class="mt-5">
    <theFooter />
  </footer>
</template>

<script setup>
import theHeader from "@/components/HomePageHeader.vue";
import theFooter from "@/components/Footer.homepage.vue";
import theProcess from "@/components/Process.orders.vue";
</script>
