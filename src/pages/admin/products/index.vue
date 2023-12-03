<style scoped>
th,
td {
  text-align: center;
  vertical-align: middle;
}
</style>

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
                <th>Image</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sold</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in products" :key="index">
                <td style="font-weight: bold">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td>{{ record.ProductID }}</td>
                <td>
                  {{ record.Name }} <br />
                  {{ record.Size }}
                </td>
                <td>
                  <img
                    style="border-radius: 13px"
                    :src="'http://localhost:3000/uploads/' + record.ImageURL"
                    width="100"
                    alt=""
                  />
                </td>
                <td>{{ record.CategoryID }}</td>
                <td>{{ currencyStore.formatCurrency(record.Price) }}</td>
                <td>{{ record.Quantity }}</td>
                <td>Null</td>

                <td>
                  <router-link
                    :to="{
                      name: 'products-edit',
                      params: { id: record.VariantID },
                    }"
                    ><font-awesome-icon
                      icon="fa-regular fa-pen-to-square"
                      style="color: #274e91"
                  /></router-link>
                </td>
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
