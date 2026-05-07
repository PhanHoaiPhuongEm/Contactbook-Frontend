<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>

    <!-- Thông báo -->
    <div v-if="message" class="alert alert-success">
      {{ message }}
    </div>

    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
  </div>

  <div v-else class="p-3">Đang tải dữ liệu...</div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: { ContactForm },

  props: {
    id: { type: String, required: true },
  },

  data() {
    return {
      contact: null,
      message: "",
    };
  },

  methods: {
    async getContact(id) {
      try {
        const data = await ContactService.get(id);
        this.contact = data;
      } catch (error) {
        console.log("Lỗi lấy contact:", error);
      }
    },

    async updateContact(data) {
      try {
        await ContactService.update(this.contact._id, data);

        // 👉 HIỂN THỊ THÔNG BÁO
        this.message = "Cập nhật thành công";

        // 👉 CHỜ 1 CHÚT RỒI MỚI CHUYỂN TRANG
        setTimeout(() => {
          this.$router.push({ name: "contactbook" });
        }, 800);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteContact() {
      if (confirm("Bạn muốn xóa contact này?")) {
        try {
          await ContactService.delete(this.contact._id);

          this.$router.push({ name: "contactbook" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },

  created() {
    this.getContact(this.id);
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>
