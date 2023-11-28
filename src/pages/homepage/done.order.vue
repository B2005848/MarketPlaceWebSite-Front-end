<template>
  <div class="container text-center">
    <div>
      <img src="../../assets/complete.svg" width="340" alt="" />
    </div>
    <div class="h2">YOUR ORDER HAS BEEN SUCCESSFULLY PLACED</div>
    <router-link :to="`/orders/details/${orderID}`">
      View order details
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const orderID = ref(null);
const route = useRoute();

onMounted(() => {
  // Lấy giá trị orderID từ tham số đường dẫn (params)
  orderID.value = route.query.orderID;
  console.log("orderID:", orderID.value);
});
</script>

<style scoped>
.container {
  line-height: 1.2cm;
}
</style>
