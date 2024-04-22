<script setup>
import { onMounted, ref } from "vue";
const isURL = (value) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(value);
};
const catadata = ref([]);
const getData = async () => {
  try {
    const response = await window.axios.get(
      "http://localhost:3000/api/catagories/getall"
    );
    catadata.value = response.data[0];
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getData();
});
</script>
<template>
  <div class="mb-5 ms-5">
    <h3>PRODUCT CATALOG</h3>
  </div>

  <div class="container">
    <div class="row">
      <div
        v-for="(catadata, index) in catadata"
        :key="index"
        class="col mb-4 m-2 text-center item"
      >
        <h4>{{ catadata.CategoryName }}</h4>
        <img
          style="border-radius: 12px"
          :src="
            isURL(catadata.ImageURL)
              ? catadata.ImageURL
              : 'http://localhost:3000/uploads/' + catadata.ImageURL
          "
          alt="IMG"
          width="200"
          height="200"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

a {
  text-decoration: none;
  color: black;
}

.item {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 13px;
}

.item:hover {
  border: 0.2px #ef4565 solid;
  transform: translateY(-2px);
  transition: ease-out;
}
</style>
