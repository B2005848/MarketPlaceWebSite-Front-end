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
        <div>
          <h1>
            {{ product_name }}
          </h1>
          <p>ID: {{ ProductID }}</p>
        </div>
        <div>
          <router-link
            :to="{ name: 'products-add-var', id: products.ProductID }"
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
                <th>Description</th>
                <th>Size</th>
                <th>Material</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody v-for="(record, index) in products" :key="index">
              <tr>
                <td style="font-weight: bold">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td>{{ record.Description }}</td>
                <td>{{ record.Size }}</td>
                <td>{{ record.Material }}</td>
                <td>
                  <img
                    :src="
                      isURL(record.ImageURL)
                        ? record.ImageURL
                        : 'http://localhost:3000/uploads/' + record.ImageURL
                    "
                    alt=""
                    width="100"
                  />
                </td>
                <td>
                  <span v-if="record.Quantity <= 20" class="text-danger">
                    {{ record.Quantity }} slot
                  </span>

                  <span v-else> {{ record.Quantity }} slot </span>
                </td>
                <td>{{ currencyStore.formatCurrency(record.Price) }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'products-edit-var',
                      params: { id: record.VariantID },
                    }"
                  >
                    <font-awesome-icon
                      icon="fa-solid fa-eye"
                      style="color: #2d78be"
                    />
                  </router-link>
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
import { useRoute } from "vue-router";
import { useCurrencyStore } from "@/stores/define-vnd.js";

const isURL = (value) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(value);
};

const currencyStore = useCurrencyStore();

const route = useRoute();
const products = ref([]);
const product_name = ref();

const totalPages = ref(0);
let currentPage = ref(1);
const itemsPerPage = 10;
const changePage = (page) => {
  currentPage.value = page;
  getData(page);
};

const ProductID = route.params.id;

const getData = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/getVariantProduct/${ProductID}?page=${page}`
    );
    products.value = response.data.products;
    product_name.value = response.data.products[0].productname;
    totalPages.value = response.data.totalPages;
    console.log(response.data.products);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getData(currentPage.value);
});
</script>
