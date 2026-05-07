<template>
  <div class="page row">
    <!-- Search -->
    <div class="col-12 mb-4">
      <InputSearch v-model="searchText" @submit="refreshList" />
    </div>

    <!-- Danh sách -->
    <div class="col-md-6">
      <h5 class="mb-3">Danh bạ</h5>

      <ContactList
        v-if="filteredContacts.length > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />

      <p v-else class="text-muted">Không có liên hệ nào</p>

      <div class="mt-3 d-flex gap-2">
        <button class="btn btn-primary" @click="refreshList">Làm mới</button>
        <router-link to="/add">
          <button class="btn btn-success">Thêm mới</button>
        </router-link>
        <button class="btn btn-danger" @click="removeAllContacts">Xóa tất cả</button>
      </div>
    </div>

    <!-- Chi tiết -->
    <div class="col-md-6">
      <h5 class="mb-3">Chi tiết Liên hệ</h5>
      
      <div v-if="activeContact" class="card p-3 shadow-sm">
        <ContactCard 
          :contact="activeContact" 
          @toggle-favorite="toggleFavorite"
        />
        
        <router-link 
          :to="{ name: 'contact.edit', params: { id: activeContact._id }}"
        >
          <button class="btn btn-warning mt-3">
            <i class="fas fa-edit"></i> Hiệu chỉnh
          </button>
        </router-link>
      </div>
      
      <div v-else class="text-muted p-3">Chọn một liên hệ để xem chi tiết</div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactCard from "@/components/ContactCard.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    InputSearch,
    ContactList,
    ContactCard,
  },

  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },

  computed: {
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      const text = this.searchText.toLowerCase();
      return this.contacts.filter(c => 
        [c.name, c.email, c.phone, c.address]
          .join("")
          .toLowerCase()
          .includes(text)
      );
    },

    activeContact() {
      return this.activeIndex >= 0 ? this.filteredContacts[this.activeIndex] : null;
    }
  },

  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (e) {
        console.error(e);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    async removeAllContacts() {
      if (confirm("Bạn có chắc muốn xóa tất cả liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (e) {
          console.error(e);
        }
      }
    },

    async toggleFavorite(contact) {
      try {
        const updatedData = {
          name: contact.name,
          email: contact.email,
          address: contact.address,
          phone: contact.phone,
          favorite: !contact.favorite
        };

        await ContactService.update(contact._id, updatedData);

       
        const index = this.contacts.findIndex(c => c._id === contact._id);
        if (index !== -1) {
          this.contacts[index].favorite = !contact.favorite;
        }

      } catch (error) {
        console.error(error);
        alert("chọn liên hệ yêu thích thành công");
      }
    }
  },

  mounted() {
    this.retrieveContacts();
  }
};
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: auto;
}
</style>