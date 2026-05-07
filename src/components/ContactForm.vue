<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label>Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="contactLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label>Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="contactLocal.address"
      />
    </div>

    <div class="form-group">
      <label>Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <!-- ⭐ FIX CHECKBOX -->
    <div class="form-check mb-3">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="contactLocal.favorite"
        :true-value="true"
        :false-value="false"
      />
      <label class="form-check-label">Liên hệ yêu thích</label>
    </div>

    <div class="form-group mt-3">
      <button type="submit" class="btn btn-primary">Lưu</button>

      <button
        v-if="contactLocal._id"
        type="button"
        class="btn btn-danger ml-2"
        @click="deleteContact"
      >
        Xóa
      </button>

      <button type="button" class="btn btn-secondary ml-2" @click="cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  props: {
    contact: { type: Object, required: true },
  },

  emits: ["submit:contact", "delete:contact"],

  data() {
    return {
      contactLocal: JSON.parse(JSON.stringify(this.contact)),

      contactFormSchema: yup.object({
        name: yup.string().required("Tên bắt buộc").min(2),
        email: yup.string().email("Email không hợp lệ"),
        address: yup.string(),
        phone: yup
          .string()
          .nullable()
          .matches(/(09|03|07|08|05)[0-9]{8}/, "SĐT không hợp lệ"),
      }),
    };
  },

  methods: {
    // 🔥 gửi đúng dữ liệu (có favorite)
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },

    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },

    cancel() {
      this.$router.push({ name: "contactbook" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
