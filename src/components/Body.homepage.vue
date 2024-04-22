<template>
  <div>
    <div class="row">
      <div v-for="(product, index) in data" :key="index" class="col-md-2 mb-4">
        <a href="http://localhost:5173/#/product/detail" class="card-link">
          <div class="card" style="height: 400px">
            <img
              :src="
                isURL(product.ImageURL)
                  ? product.ImageURL
                  : 'http://localhost:3000/uploads/' + product.ImageURL
              "
              alt=""
              style="height: 50%; width: 100%"
              class="card-img-top"
            />

            <div class="card-body">
              <p class="text-center" style="font-size: 10px; max-width: 100%">
                {{ product.Size }} mm
              </p>
              <p class="text-center">{{ product.Material }}</p>
              <h5
                style="
                  font-size: 15px;
                  text-align: center;
                  max-width: 100%;
                  max-height: 3.6em;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: normal;
                "
                class="card-title"
              >
                {{ product.productname }}
              </h5>
            </div>
            <div class="price text-center">
              <p
                style="font-size: 12px; max-width: 100%; padding-bottom: 10px"
                class="card-text"
              >
                {{ formatCurrency(product.Price) }}
              </p>
            </div>
            <div class="overlay">
              <font-awesome-icon
                icon="fa-solid fa-cart-plus"
                size="2x"
                style="color: #ef4565; font-weight: 500px"
                @click.prevent="addToCart(product)"
              />
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
// import { useRouter } from "vue-router";
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import { useCartStore } from "../stores/cart-store";
const isURL = (value) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(value);
};

const cartStore = useCartStore();
const data = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const changePage = (page) => {
  currentPage.value = page;
  fetchProducts(page);
};
// const router = useRouter();
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

// const goToProductPage = () => {
//   router.push({ name: "product-detail" });
// };

const addToCart = (product) => {
  cartStore.addToCart(product);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
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
  border: 2px #ef4565 solid;
  transform: translateY(-5px);
  transition: 0.5s;
  filter: brightness(85%);
  transition: filter 0.3s ease;
}

.card:hover {
  opacity: 0.5;
}
.card-link {
  position: relative;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card:hover .overlay {
  opacity: 1;
}
</style>
