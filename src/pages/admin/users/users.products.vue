<template>
  <div>
    <div class="card">
      <h5 class="card-header">LIST PRODUCTS</h5>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in users" :key="index">
                <td>{{ index + 1 }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button @click="toggleLock(record)" class="btn btn-lg">
                    <span v-if="record.locked">
                      <font-awesome-icon
                        icon="fa-solid fa-lock"
                        style="color: #9fa14a"
                      />
                    </span>

                    <span v-else>
                      <font-awesome-icon
                        icon="fa-solid fa-lock-open"
                        style="color: #2363d1"
                      />
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);

const getUsers = () => {
  window.axios
    .get("http://localhost:3000/api/users/getusers")
    .then((response) => {
      users.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const toggleLock = (record) => {
  record.locked = !record.locked;
};

onMounted(() => {
  getUsers();
});
</script>
