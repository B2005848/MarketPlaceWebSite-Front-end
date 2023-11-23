<template>
  <div>
    <div class="row">
      <div v-for="(product, index) in data" :key="index" class="col-md-2 mb-4">
        <a href="">
          <div class="card" style="max-width: 320px">
            <img :src="product.ImageURL" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 style="font-size: 12px" class="card-title">
                {{ product.Name }}
              </h5>
              <p class="card-text">{{ product.Price }}.000 VNĐ</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="mt-3" aria-label="Page navigation">
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
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Paginate from "vuejs-paginate-next";

const data = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const changePage = (page) => {
  currentPage.value = page;
  fetchProducts(page);
};

const fetchProducts = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/getAllProducts?page=${page}`
    );
    data.value = response.data.products;
    totalPages.value = response.data.totalPages;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchProducts(currentPage.value);
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>

<style scoped>
.card:hover {
  border: 1px red solid;
  transform: translateY(-5px);
  transition: 0.5s;
}
</style>
