<template>
  <div class="mb-3 bg-body-secondary p-3" style="border-radius: 13px">
    <h1>User Profile</h1>

    <!-- name-avatar -->
    <div class="card bg-light-subtle">
      <div class="card-item mt-5 ms-5">
        <div class="row">
          <div class="col-sm-5">
            <img
              src="https://media.istockphoto.com/id/1410847427/vi/anh/%C4%91%C3%A0n-%C3%B4ng-%C4%91ang-nghe-nh%E1%BA%A1c-b%E1%BA%B1ng-tai-nghe-m%E1%BB%99t-c%C3%A1ch-tho%E1%BA%A3i-m%C3%A1i-v%C3%A0-vui-v%E1%BA%BB-3d-render.jpg?s=1024x1024&w=is&k=20&c=_Lud23trYzC4xehrgfga_qsdoM25nZjXso6Nv0hZWdo="
              alt=""
              width="200"
            />
            <div class="card-name">
              <div class="row">
                <div class="col-sm-3">
                  <b class="mb-0 ms-2">Username:</b>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{{ username }}</p>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-3">
                  <b class="mb-0 ms-2">Status:</b>
                </div>
                <div class="col-sm-9">
                  <span v-if="users.StatusID == 1" class="text-success">
                    {{ users.StatusName }}
                  </span>
                  <span v-if="users.StatusID == 1" class="ms-2"
                    ><font-awesome-icon
                      icon="fa-solid fa-circle-check"
                      style="color: #04ff00"
                  /></span>
                  <span v-if="users.StatusID == 2" class="text-warning">
                    {{ users.StatusName }}
                  </span>
                  <span v-if="users.StatusID == 3" class="text-danger">
                    {{ users.StatusName }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-7">
            <ul class="list-group" style="list-style: none">
              <router-link
                style="text-decoration: none"
                :to="{
                  name: 'admin-usersdetails-products',
                  params: { username },
                }"
              >
                <li class="mb-4">
                  <font-awesome-icon
                    icon="fa-solid fa-store"
                    size="xl"
                    style="color: #0b2d60; padding-right: 10px"
                  />Purchased Product <span class="text-info">78</span>
                </li>
              </router-link>

              <li class="mb-4">
                <font-awesome-icon
                  icon="fas fa-chalkboard-user"
                  size="xl"
                  style="color: #0b2d60; padding-right: 10px"
                />Joined:
                <span class="text-info">{{
                  formatDatetime(users.RegistrationDate)
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- social-media-info -->
      <div class="card-item mt-5">
        <ul class="list-group">
          <!-- facebook -->
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <font-awesome-icon
              icon="fab fa-facebook"
              style="color: #1a6eff"
              size="2xl"
            />
            <span>facebook.com</span>
          </li>

          <!-- ins -->
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <font-awesome-icon
              icon="fa-brands fa-instagram"
              size="2xl"
              style="color: #8a0a86"
            />
            <span>https://www.instagram.com/</span>
          </li>

          <!-- twitter -->
          <li
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <font-awesome-icon
              icon="fa-brands fa-twitter"
              size="2xl"
              style="color: #55acee"
            />
            <span>https://twitter.com/</span>
          </li>
        </ul>
      </div>

      <!-- info-details -->
      <div class="card-item mt-5">
        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0 ms-2">Full Name</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">
              {{ users.FirstName + " " + users.LastName }}
            </p>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0 ms-2">Email</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">{{ users.Email }}</p>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0 ms-2">Number phone</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">{{ users.PhoneNumber }}</p>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0 ms-2">Birthday</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">{{ formatBirhDay(users.BirthDay) }}</p>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0 ms-2">Citizen identification number</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">{{ users.CitizenID }}</p>
          </div>
        </div>
        <hr />

        <div class="row">
          <div class="col-sm-3">
            <p class="mb-0 ms-2">Contact Address</p>
          </div>
          <div class="col-sm-9">
            <p class="text-muted mb-0">{{ users.ContactAddress }}</p>
          </div>
        </div>
        <hr />
      </div>

      <div class="card-item mt-5">
        <div class="mb-3">
          <Ad_chart></Ad_chart>
        </div>
      </div>
    </div>
  </div>

  <!-- delete button -->
  <div class="footer border bg-danger-subtle d-flex justify-content-center">
    <button @click="onDelete" class="btn" type="button">
      <font-awesome-icon
        icon="fa-solid fa-trash"
        size="xl"
        style="color: #ff0000"
      />
    </button>
  </div>

  <!-- showMessDelete -->
  <div
    id="focusDeleteMess"
    class="alert alert-danger position-absolute top-50 start-50 translate-middle"
    v-if="showDelete"
  >
    <div class="text-center mb-3">
      <p class="lead">Are you sure you want to delete this user?</p>
      <!-- click ok to detele this user -->
      <button @click="deteUser()" class="btn btn-danger p-2 me-3">OK</button>
      <button @click="closeDelete" class="btn btn-success p-2">Cancel</button>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { useRouter } from "vue-router";
import Ad_chart from "@/components/Ad_chart.vue";
import { ref, onMounted, nextTick } from "vue";
import moment from "moment";

const showDelete = ref(false);
const closeDelete = () => {
  showDelete.value = false;
};
const onDelete = () => {
  showDelete.value = true;

  nextTick(() => {
    const deleteContainer = document.getElementById("focusDeleteMess");
    if (deleteContainer) {
      console.log("Scrolling into view...");
      deleteContainer.scrollIntoView({ behavior: "smooth" });
    }
  });
};
const router = useRouter();
const users = ref([]);
const username = router.currentRoute.value.params.username;

const formatDatetime = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY (HH:mm)");
};

const formatBirhDay = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY");
};

const deteUser = async () => {
  try {
    const response = await window.axios.delete(
      `http://localhost:3000/api/users/delete_user/${username}`
    );
    console.log(response);
    router.push("/admin/users");
  } catch (error) {
    console.log(error);
  }
};
const getUsersbyUsername = async () => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/users/getuserbyusername/${username}`
    );

    users.value = response.data;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// will be call when router be call
onMounted(() => {
  console.log(username);
  getUsersbyUsername();
});
</script>

<style scoped>
.card-item {
  padding: 10px;
}
</style>
