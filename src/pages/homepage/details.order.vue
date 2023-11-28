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
    <div>
      <h2 class>Purchase Reciept</h2>
      <div class="mt-5">
        <h4>Store name:....</h4>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Unit price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderDetail, index) in orderDetails" :key="index">
            <td>{{ orderDetail.productName }}</td>
            <td>{{ formatCurrency(orderDetail.totalPrice) }}</td>
            <td>{{ orderDetail.status }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
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
