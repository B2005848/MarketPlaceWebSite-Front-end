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

.btn-add {
  font-weight: bold;
  border-radius: 13px;
  padding: 10px 30px 10px 30px;
  background-color: #00c9ff;
  border: none;
  transition: ease-in-out 0.2s;
}

.btn-add:hover {
  background-color: #006eff;
  color: rgb(255, 255, 255);
}
</style>
<template>
  <div class="container d-flex">
    <div class="row">
      <h1 class="text-center">Add a new variation</h1>
      <form
        @submit.prevent="submitForm"
        method="post"
        enctype="multipart/form-data"
      >
        <!-- name product -->
        <div>
          <label class="col-sm-4" for="material"
            >Material <sup class="text-danger">*</sup></label
          >
          <input v-model="Material" type="text" id="Material" />
        </div>

        <!-- Description -->
        <div>
          <label class="col-sm-4" for="Description">Description</label>
          <textarea name="Description" id="" cols="23" rows="5"></textarea>
        </div>

        <!-- Size -->
        <div>
          <label class="col-sm-4" for="size"
            >Size <sup class="text-danger">*</sup></label
          >
          <input
            v-model="size"
            type="text"
            id="Size"
            placeholder="d x r x h (mm, cm, ...)"
          />
        </div>

        <!-- description -->
        <div>
          <label class="col-sm-4" for="Quantity"
            >Quantity <sup class="text-danger">*</sup></label
          >
          <input
            v-model="quantity"
            type="text"
            id="Quantity"
            placeholder="item"
          />
        </div>

        <!-- price -->
        <div>
          <label class="col-sm-4" for="price"
            >Price <sup class="text-danger">*</sup></label
          >
          <input v-model="price" type="number" id="price" />
        </div>

        <!-- image -->
        <div>
          <label class="col-sm-4" for="image"
            >Image <sup class="text-danger">*</sup></label
          >
          <input type="file" id="image" @change="handleImageChange" />
        </div>
        <div class="text-center mt-5">
          <button class="btn-add" type="submit">SUBMIT</button>
        </div>
      </form>
    </div>

    <div class="mt-5">
      <!-- Image preview -->
      <img
        class="col-sm-9"
        v-if="imagePreview"
        :src="imagePreview"
        alt="Image Preview"
        style="max-width: 500px; max-height: 500px"
      />
    </div>
  </div>

  <!-- show result -->
  <div class="mt-3">
    <p v-if="successMessage" class="text-success">
      "This new variantion was added successfully."
    </p>
    <p v-if="errorMessage" class="text-danger">Product update failed</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const Material = ref("");
const description = ref("");
const size = ref("");
const price = ref(0);
const quantity = ref(0);
const imagePreview = ref(null);
const imageData = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    showImagePreview(file);
  }
};

const showImagePreview = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageData.value = e.target.result;

    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const productID = router.currentRoute.value.params.id;
const successMessage = ref(false);
const errorMessage = ref(false);

const submitForm = async () => {
  try {
    const formData = {
      Size: size.value,
      Material: Material.value,
      ImageURL: imageData.value,
      Quantity: quantity.value,
      Price: price.value,
      Description: description.value,
    };

    const response = await window.axios.post(
      `http://localhost:3000/api/products/create-variants/${productID}`,
      formData
    );

    if (response.status == 201) {
      successMessage.value = true;
      errorMessage.value = false;
      console.log("Product updated successfully:");
    } else {
      successMessage.value = false;
      errorMessage.value = true;
      console.log("Product update failed:", response.message);
    }
  } catch (error) {
    errorMessage.value = "An error occurred while updating product.";
    successMessage.value = "";
    console.error("An error occurred while updating product:", error);
  }
};
</script>
