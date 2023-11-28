<template>
  <header>
    <theHeader />
  </header>

  <div class="container mt-5">
    <div>
      <h2 class>Purchase Receipt</h2>
      <div class="mt-5">
        <h4>Store name: {{ storeName }}</h4>
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
            <td>{{ orderDetail.ProductID }}</td>
            <td>{{ currencyStore.formatCurrency(orderDetail.UnitPrice) }}</td>
            <td>{{ orderDetail.Quantity }}</td>
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
const storeName = ref("");

const currencyStore = useCurrencyStore();

orderID.value = route.params.orderID;
onMounted(async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/orders/details/${orderID.value}`
    );

    if (response.data && response.data.detailOrderData) {
      orderDetails.value = response.data.detailOrderData;
      storeName.value = response.data.detailOrderData[0].SellerUserID;
    } else {
      console.error("Failed to fetch order details.");
    }
  } catch (error) {
    console.error("An error occurred while fetching order details.", error);
  }
});
</script>
