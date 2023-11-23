<template>
  <div class="d-flex justify-content-center">
    <div class="me-3">
      <img src="../assets/bacgr.jpg" alt="" />
    </div>

    <div class="item-header-3">
      <div id="slide" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="900">
            <img
              src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="900">
            <img
              src="https://images.pexels.com/photos/5650052/pexels-photo-5650052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="1000">
            <img
              src="https://images.pexels.com/photos/2720447/pexels-photo-2720447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="900">
            <img
              src="https://images.pexels.com/photos/2170450/pexels-photo-2170450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="800">
            <img
              src="https://images.pexels.com/photos/5650050/pexels-photo-5650050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              class="d-block custom-image"
              alt="Term"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#slide"
          data-bs-slide="prev"
        >
          <span aria-hidden="true">
            <font-awesome-icon
              icon="fa-solid fa-angle-left"
              style="color: #8d9096"
            />
          </span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#slide"
          data-bs-slide="next"
        >
          <span aria-hidden="true">
            <font-awesome-icon
              icon="fa-solid fa-angle-right"
              style="color: #8d9096"
            />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-header-3 {
  max-width: 400px;
}

img {
  max-width: 600px;
}
</style>
