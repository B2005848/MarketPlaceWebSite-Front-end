<style scoped>
table {
  text-align: center;
}
</style>

<template>
  <div>
    <h1 class="card-header">List oders</h1>

    <div class="table-responsive">
      <!-- field FILTER -->
      <div style="width: 100%" class="mt-3 d-flex">
        <!-- Filter by username -->
        <div class="m-3">
          <label for="filterName" class="form-label me-2"
            >Filter by username:</label
          >
          <input
            type="text"
            id="filterName"
            v-model="filterName"
            @input="filterOrders"
            class="form-control me-2"
          />
        </div>
      </div>
    </div>
    <table class="table table-striped mt-5 table-responsive">
      <thead>
        <tr>
          <th>No.</th>
          <th>OrderID</th>
          <th>Username</th>
          <th>Name Product</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Tools</th>
        </tr>
      </thead>
      <tbody v-for="(record, index) in orders" :key="index">
        <tr>
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ record.OrderID }}</td>
          <td>{{ record.username }}</td>
          <td>
            <b class="text-danger">{{ record.ProductID }}</b> <br />
            {{ record.productname }}
          </td>
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
            <span v-else-if="(record.Status = 'delivered')" class="text-info">{{
              record.Status
            }}</span>
            <span v-else class="text-danger">{{ record.Status }}</span>
          </td>
          <td>
            <a>
              <font-awesome-icon
                icon="fa-regular fa-eye"
                style="color: #d3d624"
              />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="mt-3" aria-label="Page navigation">
      <!-- case 1 use pagination vue-->
      <paginate
        v-model="currentPage"
        :page-count="totalPages"
        :page-range="3"
        :margin-pages="1"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </nav>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import moment from "moment";
import Paginate from "vuejs-paginate-next";

const formatDatetime = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY (HH:mm)");
};

const orders = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const itemsPerPage = 12;
const changePage = (page) => {
  currentPage.value = page;
  getOrders(page);
};
let originalOrders = [];

// GET_DATA
const getOrders = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/orders?page=${page}`
    );
    totalPages.value = response.data.totalPages;
    orders.value = response.data.OrderData; // Update orders directly

    originalOrders = [...response.data.OrderData]; // Set originalOrders on initial load
  } catch (error) {
    console.error(error);
  }
};

// FILTER
const filterName = ref("");
const filterOrders = () => {
  if (!originalOrders.length) {
    getOrders(1);
  } else {
    const filteredOrders = originalOrders.filter((order) => {
      const nameCondition = order.username
        .toLowerCase()
        .includes(filterName.value.toLowerCase());
      return nameCondition;
    });

    orders.value = filteredOrders;
    if (filterName.value === "") {
      getOrders(1);
    }
  }
};

watch(filterName, filterOrders);

onMounted(() => {
  getOrders(currentPage.value);
});
</script>
