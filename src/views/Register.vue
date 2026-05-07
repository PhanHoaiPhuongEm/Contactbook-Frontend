<template>
  <div class="page">
    <h3>Đăng ký</h3>

    <input
      v-model="username"
      placeholder="Username"
      class="form-control mb-2"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="form-control mb-2"
    />

    <button class="btn btn-success" @click="register">Đăng ký</button>

    <p class="text-success mt-2">{{ message }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },

  methods: {
    async register() {
      try {
        await axios.post("http://localhost:3000/api/auth/register", {
          username: this.username,
          password: this.password,
        });

        this.message = "Đăng ký thành công!";

        // chuyển sang login
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (error) {
        this.message = "Đăng ký thất bại";
      }
    },
  },
};
</script>
