<template>
  <nav class="menu mt-3" mode="inline">
    <!-- dashboard -->
    <router-link
      style="text-decoration: none; text-align: left"
      :to="{ name: 'admin-dashboard' }"
    >
      <div class="item-list">
        <span class="icon"
          ><font-awesome-icon
            class="me-3"
            icon="far fa-clock"
            size="xl" /></span
        ><span class="title-icon-menu">Dashboard</span>
      </div>
    </router-link>

    <!-- users -->
    <router-link
      style="text-decoration: none; text-align: left"
      :to="{ name: 'admin-users' }"
    >
      <div class="item-list" key="admin-users">
        <span class="icon"
          ><font-awesome-icon class="me-3" icon="fas fa-user" size="xl" /></span
        ><span class="title-icon-menu">Accounts</span>
      </div>
    </router-link>

    <!-- product -->
    <router-link
      style="text-decoration: none; text-align: left"
      :to="{ name: 'admin-products' }"
    >
      <div class="item-list" key="admin-products">
        <span class="icon"
          ><font-awesome-icon
            class="me-3"
            icon="fas fa-clipboard-list"
            size="xl" /></span
        ><span class="title-icon-menu">Products</span>
      </div>
    </router-link>

    <!-- oders -->
    <router-link
      style="text-decoration: none; text-align: left"
      :to="{ name: 'admin-oders' }"
    >
      <div class="item-list" key="admin-oders">
        <span class="icon"
          ><font-awesome-icon
            class="me-3"
            icon="fas fa-truck-fast"
            size="xl" /></span
        ><span class="title-icon-menu">Oders</span>
      </div>
    </router-link>

    <!-- tags -->
    <router-link
      style="text-decoration: none; text-align: left"
      :to="{ name: 'admin-tags' }"
    >
      <div class="item-list" key="admin-tags">
        <span class="icon"
          ><font-awesome-icon class="me-3" icon="fas fa-tags" size="xl" /></span
        ><span class="title-icon-menu">Tags</span>
      </div>
    </router-link>

    <!-- settings -->
    <router-link
      style="text-decoration: none; text-align: left"
      :to="{ name: 'admin-settings' }"
    >
      <div class="item-list" key="admin-settings">
        <span class="icon"
          ><font-awesome-icon
            class="me-3"
            icon="fas fa-sliders"
            size="xl" /></span
        ><span class="title-icon-menu">Settings</span>
      </div>
    </router-link>
  </nav>
</template>

<style scoped>
@import url("@/assets/components/Ad_theMenu.css");
</style>
