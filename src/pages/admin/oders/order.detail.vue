<style scoped>
table {
  text-align: center;
}
</style>

<template>
  <div>
    <h1 class="card-header">Order detail</h1>

    <div class="table-responsive">
      <!-- field FILTER -->
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
      </div>

      <table class="table table-striped mt-5">
        <thead>
          <tr>
            <th>No.</th>
            <th>OrderID</th>
            <th>Username</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody v-for="(record, index) in orders" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ record.OrderID }}</td>
            <td>{{ record.FirstName }}</td>

            <td>{{ formatDatetime(record.OrderDate) }}</td>
            <td>
              <span v-if="(record.Status = 'pending')" class="text-warning">{{
                record.Status
              }}</span>
              <span
                v-else-if="(record.Status = 'shipped')"
                class="text-success"
                >{{ record.Status }}</span
              >
              <span
                v-else-if="(record.Status = 'delivered')"
                class="text-info"
                >{{ record.Status }}</span
              >
              <span v-else class="text-danger">{{ record.Status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
const router = useRouter();

const formatDatetime = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY (HH:mm)");
};

const orders = ref([]);
const name = ref("");
const PhoneNumber = ref("");
const address = ref("");

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

    console.log(response.data.detailOrderData);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getOrders();
  console.log(orders);
});
</script>
