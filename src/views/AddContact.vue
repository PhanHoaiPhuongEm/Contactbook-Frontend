<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>

    <form @submit.prevent="saveContact">
      <div class="mb-3">
        <label>Tên</label>
        <input v-model="contact.name" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input v-model="contact.email" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Địa chỉ</label>
        <input v-model="contact.address" class="form-control" />
      </div>

      <div class="mb-3">
        <label>Điện thoại</label>
        <input v-model="contact.phone" class="form-control" />
      </div>

      <div class="form-check mb-3">
        <input
          type="checkbox"
          v-model="contact.favorite"
          class="form-check-input"
        />
        <label class="form-check-label">Yêu thích</label>
      </div>

      <button class="btn btn-primary">Lưu</button>
    </form>
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";

export default {
  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
    };
  },

  methods: {
    async saveContact() {
      try {
        await ContactService.create(this.contact);

        alert("Thêm thành công");

        this.$router.push("/");
      } catch (e) {
        console.log(e);
        alert("Lỗi thêm dữ liệu");
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>
