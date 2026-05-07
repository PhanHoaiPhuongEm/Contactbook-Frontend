<script>
export default {
  props: {
    contacts: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex", "toggle-favorite"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    toggleFavorite(contact) {
      this.$emit("toggle-favorite", contact);
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      v-for="(contact, index) in contacts"
      :key="contact._id"
      class="list-group-item d-flex justify-content-between align-items-center"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      <span>{{ contact.name }}</span>

      <!-- ⭐ Icon yêu thích -->
      <i
        :class="
          contact.favorite
            ? 'fas fa-star text-warning'
            : 'far fa-star text-muted'
        "
        style="cursor: pointer; font-size: 18px"
        @click.stop="toggleFavorite(contact)"
      ></i>
    </li>
  </ul>
</template>

<style scoped>
.list-group-item.active {
  background-color: #0d6efd;
  color: white;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
