<style scoped>
table {
  text-align: center;
}
</style>

<template>
  <div>
    <h1 class="card-header">Order detail</h1>

    <div class="table-responsive">
      <div style="width: 100%" class="mt-3 row">
        <div class="row">
          <h6 class="col-sm-2">Customer:</h6>
          <p class="col-sm-10">{{ name }}</p>
        </div>

        <div class="row">
          <h6 class="col-sm-2">Phone number:</h6>
          <p class="col-sm-10">{{ PhoneNumber }}</p>
        </div>

        <div class="row">
          <h6 class="col-sm-2">Delivery address:</h6>
          <p class="col-sm-10">{{ address }}</p>
        </div>

        <div class="row">
          <h6 class="col-sm-2">Payment method:</h6>
          <p v-if="payment == '1'" class="col-sm-10">
            Payment on delivery - {{ currencyStore.formatCurrency(amount) }}
          </p>
          <p v-else class="col-sm-10">
            Banking - {{ currencyStore.formatCurrency(amount) }}
          </p>
        </div>
      </div>

      <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>Products</th>
            <th>Variants</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody v-for="(record, index) in orders" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ record.productname }}</td>
            <td>
              <p>{{ record.Material }}, {{ record.Size }}</p>
            </td>
            <td>{{ record.Quantity }}</td>
            <td>{{ currencyStore.formatCurrency(record.UnitPrice) }}</td>
            <td>{{ currencyStore.formatCurrency(record.TotalPrice) }}</td>
            <td>{{ formatDatetime(record.OrderDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="status row">
    <div class="col-sm-3">
      <select
        v-model="selectedStatus"
        class="form-select text-center"
        aria-label="Select example"
      >
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option class="text-danger" value="canceled">CANCELED</option>
      </select>
    </div>

    <div class="col-sm-9">
      <button @click="submitOrderStatus" class="btn btn-success">SUBMIT</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
import { useCurrencyStore } from "@/stores/define-vnd.js";

const currencyStore = useCurrencyStore();
const router = useRouter();

const formatDatetime = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY (HH:mm)");
};

const orders = ref([]);
const name = ref("");
const PhoneNumber = ref("");
const address = ref("");
const payment = ref("");
const amount = ref("");
const orderID = router.currentRoute.value.params.id;
// GET_DATA
const getOrders = async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/orders/details/${orderID}`
    );
    orders.value = response.data.detailOrderData;
    name.value =
      response.data.detailOrderData[0].FirstName +
      "" +
      response.data.detailOrderData[0].LastName;

    PhoneNumber.value = response.data.detailOrderData[0].Phone;
    address.value = response.data.detailOrderData[0].ContactAddress;
    payment.value = response.data.detailOrderData[0].PaymentMethodID;
    console.log(response.data.detailOrderData[0].PaymentMethodID);
    amount.value = response.data.detailOrderData[0].Amount;
    selectedStatus.value = response.data.detailOrderData[0].Status;

    console.log(response.data.detailOrderData);
  } catch (error) {
    console.error(error);
  }
};

const selectedStatus = ref("pending");

const submitOrderStatus = async () => {
  try {
    const response = await window.axios.put(
      `http://localhost:3000/api/products/orders/details/${orderID}`,
      { Status: selectedStatus.value }
    );

    console.log("Status updated successfully", response.data);
    alert("Status updated successfully");
    selectedStatus.value = response.data.updatedStatus;
  } catch (error) {
    console.error("Error updating status", error);
  }
};

onMounted(() => {
  getOrders();
  console.log(orders);
});
</script>
