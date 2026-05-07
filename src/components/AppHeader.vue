<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <div class="d-flex align-items-center">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <i class="fas fa-address-book me-2"></i>
          ContactBook
        </router-link>

        <router-link
          class="nav-link text-light ms-4 d-flex align-items-center"
          to="/"
        >
          <i class="fas fa-list me-2"></i>
          Danh bạ
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
