<template>
  <div class="d-flex justify-content-center">
    <div class="me-3">
      <img
        src="https://plus.unsplash.com/premium_photo-1678752713875-17fe3fd98ba3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>

    <div class="item-header-3">
      <div id="slide" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="900">
            <img
              src="https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="900">
            <img
              src="https://images.unsplash.com/photo-1519643225200-94e79e383724?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="1000">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="900">
            <img
              src="https://images.unsplash.com/photo-1511389026070-a14ae610a1be?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="d-block custom-image"
              alt="Term"
            />
          </div>

          <div class="carousel-item active" data-bs-interval="800">
            <img
              src="https://plus.unsplash.com/premium_photo-1678402545077-7a9ec2b5e5b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
