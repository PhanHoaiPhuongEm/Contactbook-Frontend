<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Ứng dụng Quản lý danh bạ</a>
      </div>
    </nav>

    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
