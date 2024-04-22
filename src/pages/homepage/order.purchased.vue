<template>
  <header>
    <theHeader />
  </header>

  <div v-if="orderDetails.length > 0" class="container mt-5">
    <div>
      <h2 class>Purchase Receipt</h2>
      <div class="mt-5">
        OderID: <span class="text-danger">{{ orderID }}</span>
      </div>
      <div class="mb-3">
        Total payment amount:
        <span
          v-if="orderDetails[0].Amount > 0"
          style="font-size: 20px; font-weight: bold"
        >
          {{ currencyStore.formatCurrency(orderDetails[0].Amount) }}</span
        >

        <span v-else style="font-size: 20px; font-weight: bold"> 0đ</span>
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
        <tbody v-for="(orderDetail, index) in orderDetails" :key="index">
          <tr>
            <td>{{ orderDetail.productname }} <br /></td>
            <td>{{ currencyStore.formatCurrency(orderDetail.UnitPrice) }}</td>
            <td>{{ orderDetail.Quantityofin }} item</td>
            <td>{{ currencyStore.formatCurrency(orderDetail.TotalPrice) }}</td>
            <td v-if="orderDetail.Status === 'pending'" class="text-success">
              {{ orderDetail.Status }}
            </td>
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
import { useCurrencyStore } from "../../stores/define-vnd.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const orderID = ref(null);
const route = useRoute();
const orderDetails = ref([]);

const currencyStore = useCurrencyStore();

orderID.value = route.params.orderID;
onMounted(async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/orders/details/${orderID.value}`
    );

    if (response.data && response.data.detailOrderData) {
      orderDetails.value = response.data.detailOrderData;
    } else {
      console.error("Failed to fetch order details.");
    }
  } catch (error) {
    console.error("An error occurred while fetching order details.", error);
  }
});
</script>
