<script>
export default {
  props: {
    contact: { 
      type: Object, 
      required: true 
    }
  },
  emits: ["toggle-favorite"],

  methods: {
    toggleFavorite() {
      this.$emit("toggle-favorite", this.contact);
    }
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ contact.name }}</h5>
      <p class="card-text">
        <strong>Email:</strong> {{ contact.email || "Không có" }}<br />
        <strong>Địa chỉ:</strong> {{ contact.address || "Không có" }}<br />
        <strong>Điện thoại:</strong> {{ contact.phone || "Không có" }}<br />
        
        <strong>Liên hệ yêu thích: </strong>
        <span 
          @click.stop="toggleFavorite"
          style="cursor: pointer; font-size: 1.6rem; margin-left: 8px;"
          :class="{ 'text-warning': contact.favorite, 'text-muted': !contact.favorite }"
        >
          <i class="fas fa-star"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>