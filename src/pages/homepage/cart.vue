<template>
  <header>
    <theHeader />
  </header>

  <main>
    <!-- process at cart list -->
    <router-link to="/carts">
      <div class="process" style="max-width: 100%">
        <div class="border border-bottom mt-5 z-1"></div>
        <font-awesome-icon
          class="z-2 rounded-5 cart-shopping-process"
          icon="fa-solid fa-bag-shopping"
          size="xl"
          style="color: #3da9fc"
        />
      </div>
    </router-link>

    <!-- list cart -->
    <div v-if="showTable" class="cart-list">
      <div class="table-responsive">
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th>
                Select all
                <input
                  class="me-3"
                  type="checkbox"
                  v-model="selectAll"
                  @change="selectAllRows"
                  :disabled="loading"
                />
              </th>

              <th>Products</th>
              <th>Unit price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in products" :key="index">
              <td>
                <!-- check to checkout -->
                <input
                  type="checkbox"
                  v-model="record.isSelected"
                  :disabled="loading"
                />
              </td>

              <!-- name product -->
              <td>
                <div>
                  <img
                    style="max-width: 50px"
                    :src="record.ImageURL"
                    :title="record.Name"
                    alt=""
                  />
                </div>
                <div>
                  {{ record.Name }}
                </div>
              </td>

              <!-- unit price -->
              <td>
                {{ record.Price }}
              </td>
              <td>
                <div>
                  <!-- btn -- -->
                  <button
                    @click="decrementQuantity(record)"
                    :disabled="record.Quantity <= 1 || loading"
                  >
                    -
                  </button>

                  <!-- quantity -->
                  <input
                    class="text-center"
                    size="1"
                    type="text"
                    v-model="record.Quantity"
                    @input="updateTotal(record)"
                  />

                  <!-- btn ++ -->
                  <button
                    @click="incrementQuantity(record)"
                    :disabled="loading"
                  >
                    +
                  </button>
                </div>
              </td>

              <td style="color: red">
                <sup><u>đ</u></sup
                >{{ record.Total }}.000
              </td>

              <!-- delete btn products -->
              <td>
                <button @click="deleteProduct(index)" :disabled="loading">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="loading" class="text-center mt-3">
      <span class="spinner-border text-primary"></span>
    </div>

    <!-- if products empty render page null products -->
    <router-view></router-view>
  </main>

  <!-- show products cus can like -->
  <div>
    <div><h4>YOU MAY ALSO LIKE</h4></div>
    <div></div>
  </div>
  <hr />
  <footer class="mt-5">
    <theFooter />
  </footer>
</template>

<script setup>
import theHeader from "@/components/HomePageHeader.vue";
import theFooter from "@/components/Footer.homepage.vue";
import { onMounted, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectAll = ref(false);
const selectAllRows = () => {
  products.value.forEach((row) => (row.isSelected = selectAll.value));
};
const showTable = ref(true);
const products = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const loading = ref();
const getData = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/products/getAllProducts/?page=${page}`
    );
    products.value = response.data.products;
    totalPages.value = response.data.totalPages;
    if (products.value.length <= 0) {
      router.push({ name: "Cart-empty" });
      showTable.value = false;
    } else {
      showTable.value = true;
    }
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// Insert Quantity
const incrementQuantity = (record) => {
  record.Quantity++;
};

const decrementQuantity = (record) => {
  if (record.Quantity > 1) {
    record.Quantity--;
  }
};

const calculateTotal = computed(() => {
  return products.value.map((record) => {
    const total = record.Price * record.Quantity;
    record.Total = total;
    return total;
  });
});

watch(
  () => calculateTotal.value,
  (newTotal) => {
    console.log("calculateTotal changed:", newTotal);
  }
);

const updateTotal = (record) => {
  record.Total = record.Quantity * record.Price;
};
// delete products button
const deleteProduct = (index) => {
  products.value.splice(index, 1);
};
onMounted(() => {
  getData(currentPage.value);
});
</script>

<style scoped>
@import url("@/assets/pages/cart.homepage.css");
</style>
