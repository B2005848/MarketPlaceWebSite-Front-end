<style scoped>
.container {
  line-height: 1.2cm;
}

button {
}
</style>
<template>
  <header>
    <theHeader />
  </header>

  <div class="container mt-5">
    <div class="d-flex">
      <h2>Store name: ...</h2>
      <button>Visit Store</button>
    </div>
    <ul>
      <li>div</li>
    </ul>
  </div>

  <hr />
  <footer class="mt-5">
    <theFooter />
  </footer>
</template>

<script setup>
import theHeader from "@/components/HomePageHeader.vue";
import theFooter from "@/components/Footer.homepage.vue";
</script>
