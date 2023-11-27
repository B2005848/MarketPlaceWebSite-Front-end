<script setup>
import { onMounted, ref } from "vue";

const catadata = ref([]);
const getData = async () => {
  try {
    const response = await window.axios.get(
      "http://localhost:3000/api/catagoies/getall"
    );
    catadata.value = response.data.data;
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
  <div class="mb-5 ms-5"><h3>PRODUCT LIST</h3></div>

  <div class="row">
    <div
      v-for="(catadata, index) in catadata"
      :key="index"
      class="col-sm-2 mb-4"
    >
      <div class="card text-center">
        <div>
          <img src="" alt="IMG" />
        </div>
        <div>
          <a href="">{{ catadata.CategoryName }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.card {
  padding: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  left: 50%;
  height: 100px;
}

.card:hover {
  border: 0.2px #ef4565 solid;
  transform: translateY(-2px);
  transition: ease-out;
}
</style>
