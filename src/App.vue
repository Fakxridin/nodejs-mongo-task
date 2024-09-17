<template >
  <div>
    <Navbar ref="navbar" />
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <RouterView v-else />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const loading = ref(false);
const route = useRoute();
const navbar = ref(null); // Reference to the Navbar component

// Watch for route changes to control loading state and close navbar
watch(route, () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500); // Simulate loading time; adjust as necessary

  // Close the navbar on small screens
  if (navbar.value) {
    navbar.value.closeNavbar(); // Call the method to close the navbar
  }
});
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
  margin-top: 20px;
}
</style>