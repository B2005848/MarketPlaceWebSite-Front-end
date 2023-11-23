<template>
  <div>
    <div class="card">
      <h5 class="card-header">LIST ACCOUNTS</h5>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Password</th>
                <th>Status</th>
                <th>Registration Date</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in users" :key="index">
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ record.Username }}</td>
                <td>{{ record.Password }}</td>
                <td>
                  <span v-if="record.StatusID == 1" class="text-success">
                    {{ record.StatusName }}
                  </span>
                  <span v-if="record.StatusID == 2" class="text-warning">
                    {{ record.StatusName }}
                  </span>
                  <span v-if="record.StatusID == 3" class="text-danger">
                    {{ record.StatusName }}
                  </span>
                </td>
                <td>{{ formatDatetime(record.RegistrationDate) }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'admin-usersdetails',
                      params: { username: record.Username },
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

      <!-- case 2 use pagination bootstrap-->
      <!-- <ul class="pagination">
            <li
              class="page-item"
              v-for="pageNumber in totalPages"
              :key="pageNumber"
            >
              <a class="page-link" @click="changePage(pageNumber)">{{
                pageNumber
              }}</a>
            </li>
          </ul> -->
    </nav>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import moment from "moment";
import Paginate from "vuejs-paginate-next";

const formatDatetime = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY (HH:mm)");
};

const users = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const itemsPerPage = 5;
const changePage = (page) => {
  currentPage.value = page;
  getUsers(page);
};

const getUsers = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/users/getusers?page=${page}`
    );
    users.value = response.data.users;
    totalPages.value = response.data.totalPages;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUsers(currentPage.value);
});
</script>
