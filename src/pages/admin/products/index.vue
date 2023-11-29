<template>
  <div>
    <div class="card">
      <h5 class="card-header">LIST ALL PRODUCTS</h5>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Desciption</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sold</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in products" :key="index">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ record.ProductID }}</td>
                <td>{{ record.Name }}</td>
                <td>{{ record.Description }}</td>
                <td>{{ record.CategoryID }}</td>
                <td>{{ currencyStore.formatCurrency(record.Price) }}</td>
                <td>{{ record.Quantity }}</td>
                <td>Null</td>

                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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

      <!-- case 2 use pagination bootstrap-->
      <!-- <ul class="pagination">
            <li
              class="page-item"
              v-for="pageNumber in totalPages"
              :key="pageNumber"
            >
              <a class="page-link" @click="changePage(pageNumber)">{{
                pageNumber
              }}</a>
            </li>
          </ul> -->
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Paginate from "vuejs-paginate-next";
import { useCurrencyStore } from "@/stores/define-vnd";

const currencyStore = useCurrencyStore();

const products = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const itemsPerPage = 10;
const changePage = (page) => {
  currentPage.value = page;
  getData(page);
};

const getData = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/getAllProducts/?page=${page}`
    );
    products.value = response.data.products;
    totalPages.value = response.data.totalPages;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getData(currentPage.value);
});
</script>
