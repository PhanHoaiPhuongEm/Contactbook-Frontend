<template>
  <div class="page">
    <h3>Đăng nhập</h3>

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

    <button class="btn btn-primary" @click="login">Đăng nhập</button>
    <p class="text-danger mt-2">{{ message }}</p>
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
    async login() {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          username: this.username.trim(),
          password: this.password.trim(),
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        this.$router.push("/");
      } catch (error) {
        console.log(error); // 👈 để thấy lỗi thật
        this.message = "Sai tài khoản hoặc mật khẩu";
      }
    },
  },
};
</script>
