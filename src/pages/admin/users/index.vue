<style scoped>
th {
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="card">
      <h5 class="card-header">LIST ACCOUNTS</h5>
      <div class="card-body">
        <div class="table-responsive">
          <!-- field FILTER -->
          <div style="width: 100%" class="mt-3 d-flex">
            <!-- Filter by username -->
            <div class="m-3">
              <label for="filterName" class="form-label me-2"
                >Filter by Name:</label
              >
              <input
                type="text"
                id="filterName"
                v-model="filterName"
                @input="filterUsers"
                class="form-control me-2"
              />
            </div>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th @click="sortTable('Username')">Username</th>
                <th>Password</th>
                <th @click="sortTable('StatusID')">Status</th>
                <th @click="sortTable('RegistrationDate')">
                  Registration Date
                </th>
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
    </nav>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
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
let originalUsers = [];

// GET_DATA
const getUsers = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/users/getusers?page=${page}`
    );
    totalPages.value = response.data.totalPages;

    if (Array.isArray(response.data.users)) {
      originalUsers.value = response.data.users;
      sortUsers();
    } else {
      originalUsers.value = [];
    }

    console.log(originalUsers.value);
  } catch (error) {
    console.error(error);
  }
};

// FILTER
const filterName = ref("");
const filterRoleID = ref("");

const filterUsers = async () => {
  if (!originalUsers.length) {
    originalUsers = [...users.value];
    await getUsers(1);
  }
  await getUsers(currentPage.value);
  const filteredUsers = originalUsers.filter((user) => {
    const nameCondition = user.Username.toLowerCase().includes(
      filterName.value.toLowerCase()
    );

    return nameCondition;
  });

  users.value = filteredUsers;
};

//SORT DATA
const sortColumn = ref(null);
const sortDirection = ref(1);
const sortUsers = () => {
  if (sortColumn.value) {
    users.value = originalUsers.value.slice().sort((a, b) => {
      const fieldA = a[sortColumn.value];
      const fieldB = b[sortColumn.value];

      let comparison = 0;
      if (fieldA > fieldB) {
        comparison = 1;
      } else if (fieldA < fieldB) {
        comparison = -1;
      }

      return sortDirection.value === 1 ? comparison : -comparison;
    });
  } else {
    users.value = [...originalUsers.value];
  }
};

const sortTable = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = -sortDirection.value;
  } else {
    sortColumn.value = column;
    sortDirection.value = 1;
  }

  sortUsers();
};

watch(sortColumn, () => {
  sortUsers();
});

watch(sortDirection, () => {
  sortUsers();
});

watch([sortColumn, sortDirection], () => {
  sortUsers();
});
watch([filterName, filterRoleID], filterUsers);

onMounted(() => {
  getUsers(currentPage.value);
});
</script>
