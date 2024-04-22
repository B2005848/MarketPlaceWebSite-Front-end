<style scoped>
.container {
  justify-content: space-around;
}

form div {
  margin-top: 20px;
}

form input {
  width: 200px;
}
</style>

<template>
  <div class="container d-flex">
    <div class="row">
      <h1 class="text-center">Add a new product</h1>
      <form @submit.prevent="submitForm">
        <!-- name product -->
        <div>
          <label class="col-sm-2" for="name">Name:</label>
          <input v-model="name" type="text" id="name" />
        </div>

        <!-- category product -->
        <div>
          <div>
            <label class="col-sm-4" for="category">Choose a category:</label>
            <select v-model="selectedCategory" id="category">
              <option
                v-for="category in categories"
                :key="category.CategoryID"
                :value="category.CategoryID"
              >
                {{ category.CategoryName }}
              </option>
            </select>
          </div>

          <div>
            <p class="col-sm-4">
              CategoryID: <b class="text-danger ms-3">{{ selectedCategory }}</b>
            </p>
          </div>

          <div class="row">
            <div class="col">
              <button
                type="button"
                @click="addProduct"
                class="btn btn-primary mt-3"
              >
                Add Product
              </button>
            </div>

            <div class="col">
              <button
                type="button"
                @click="submitForm"
                class="btn btn-success mt-3"
                style="color: aliceblue"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Display added products -->
  <div v-if="products.length > 0">
    <h2 class="mt-5">Added Products</h2>
    <ul style="line-height: 1.5cm">
      <li v-for="(product, index) in products" :key="index">
        {{ product.Name }} - CategoryID: {{ product.CategoryID }}
        <button @click="removeProduct(index)" class="btn btn-danger ms-3">
          Remove
        </button>
      </li>
    </ul>
  </div>
  <!-- show result -->
  <div class="mt-3">
    <p v-if="successMessage" class="text-success">
      "Product added successfully."
    </p>
    <p v-if="errorMessage" class="text-danger">Product added failed</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const name = ref("");
const selectedCategory = ref(null);

const products = ref([]);
const successMessage = ref(false);
const errorMessage = ref(false);

const categories = ref([]);

onMounted(async () => {
  try {
    const response = await window.axios.get(
      "http://localhost:3000/api/catagories/getall"
    );
    categories.value = response.data[0];
  } catch (error) {
    console.error(error);
  }
});

const addProduct = () => {
  if (name.value && selectedCategory.value !== null) {
    const newProduct = {
      Name: name.value,
      CategoryID: selectedCategory.value,
    };
    products.value.push(newProduct);
    name.value = "";
    selectedCategory.value = null;
  }
};

const removeProduct = (index) => {
  products.value.splice(index, 1);
};

const submitForm = async () => {
  try {
    const response = await window.axios.post(
      "http://localhost:3000/api/products/create",
      products.value
    );

    if (response.status === 201) {
      successMessage.value = true;
      errorMessage.value = "";
      console.log("Products added successfully.");
    } else {
      successMessage.value = false;
      errorMessage.value = response.data.message || "Products add failed.";
      console.log("Products add failed:", errorMessage.value);
    }
  } catch (error) {
    errorMessage.value = "An error occurred while updating products.";
    successMessage.value = "";
    console.error("An error occurred while updating products:", error);
  }
};
</script>
