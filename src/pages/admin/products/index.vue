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
      <div class="card-header d-flex justify-content-between">
        <div><h5>LIST ALL PRODUCTS</h5></div>
        <div>
          <span class="me-3">Add a new products that here</span>
          <router-link :to="{ name: 'products-add' }"
            ><font-awesome-icon
              icon="far fa-square-plus"
              style="color: #1c65e3"
              size="2xl"
          /></router-link>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Details</th>
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
                  <span style="font-weight: bold" class="text-danger">{{
                    record.CategoryID
                  }}</span>
                  <br />
                  ({{ record.CategoryName }})
                </td>
                <td>Null</td>

                <td>
                  <router-link
                    :to="{
                      name: 'product-variants',
                      params: { id: record.ProductID },
                    }"
                    ><font-awesome-icon
                      icon="fa-solid fa-eye"
                      style="color: #5e87cf"
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

  <div v-if="showEmpty">
    <div class="text-center">
      You do not have any products, you can add new products by clicking this
      button
      <router-link :to="{ name: 'products-add' }"
        ><font-awesome-icon
          icon="far fa-square-plus"
          style="color: #1c65e3"
          size="xl"
      /></router-link>
    </div>
    <div class="text-center">
      <img :src="getImageUrl('empty_products_admin.gif')" alt="" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Paginate from "vuejs-paginate-next";
const getImageUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

const showEmpty = computed(() => {
  return products.value.length == 0;
});

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
      `http://localhost:3000/api/products/getAllProductsAdmin/?page=${page}`
    );

    products.value = response.data.products;
    totalPages.value = response.data.totalPages;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getData(currentPage.value);
});
</script>
