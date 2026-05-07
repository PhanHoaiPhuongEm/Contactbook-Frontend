<template>
  <div class="page text-center">
    <h1 class="display-1 text-danger">404</h1>
    <h2>Oops, không thể tìm thấy trang</h2>
    <p class="lead">Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.</p>
    <router-link to="/" class="btn btn-primary btn-lg mt-3">
      <i class="fas fa-home"></i> Về Trang Chủ
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
