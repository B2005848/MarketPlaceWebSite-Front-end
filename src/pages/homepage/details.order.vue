<style scoped>
.container {
  line-height: 1.2cm;
}
</style>

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
            <td>{{ orderDetail.productName }}</td>
            <td>{{ formatCurrency(orderDetail.unitPrice) }}</td>
            <td>{{ orderDetail.quantity }}</td>
            <td>{{ formatCurrency(orderDetail.totalPrice) }}</td>
            <td>{{ orderDetail.status }}</td>
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
import { ref, onMounted } from "vue";
const orderDetails = ref([
  // Dữ liệu đơn hàng từ API
]);

const storeName = ref(""); // Thêm biến storeName

const formatCurrency = (amount) => {
  // Hàm định dạng tiền tệ
  // ...

  return amount; // Placeholder, bạn cần thay thế với logic thực tế
};

onMounted(() => {
  // Lấy dữ liệu đơn hàng từ API và cập nhật orderDetails và storeName
  // ...

  // Ví dụ:
  storeName.value = "Tên cửa hàng"; // Thay thế 'Tên cửa hàng' bằng giá trị thực tế từ dữ liệu
});
</script>
