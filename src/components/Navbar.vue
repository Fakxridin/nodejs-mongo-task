<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
          <router-link class="navbar-brand" to="/">MyApp</router-link>
          <button
              class="navbar-toggler"
              type="button"
              @click="toggleNavbar"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto">
                  <li class="nav-item">
                      <router-link class="nav-link" to="/category" @click="closeNavbar">Category</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/" @click="closeNavbar">Authors</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/book" @click="closeNavbar">Books</router-link>
                  </li>
              </ul>
              <div class="dropdown">
                  <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                  >
                      <i class="bi bi-person-circle"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                      <li><a class="dropdown-item" href="#" @click="openLoginModal">Log In</a></li>
                      <li><a class="dropdown-item" href="#" @click="handleLogout">Log Out</a></li>
                      <li><a class="dropdown-item" href="#" @click="openRegisterModal">Register</a></li>
                  </ul>
              </div>
          </div>
      </div>

      <!-- Login Modal -->
      <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="loginModalLabel">Log In</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <form @submit.prevent="handleLogin">
                          <div class="mb-3">
                              <label for="username" class="form-label">Username</label>
                              <input type="text" class="form-control" id="username" v-model="username" required>
                          </div>
                          <div class="mb-3">
                              <label for="password" class="form-label">Password</label>
                              <input type="password" class="form-control" id="password" v-model="password" required>
                          </div>
                          <button type="submit" class="btn btn-primary">Log In</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>

      <!-- Register Modal -->
      <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="registerModalLabel">Create an Account</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <form @submit.prevent="handleRegister">
                          <div class="mb-3">
                              <label for="regUsername" class="form-label">Create Username</label>
                              <input type="text" class="form-control" id="regUsername" v-model="regUsername" required>
                          </div>
                          <div class="mb-3">
                              <label for="regEmail" class="form-label">Email</label>
                              <input type="email" class="form-control" id="regEmail" v-model="regEmail" required>
                          </div>
                          <div class="mb-3">
                              <label for="regPassword" class="form-label">Create Password</label>
                              <input type="password" class="form-control" id="regPassword" v-model="regPassword" required>
                          </div>
                          <div class="mb-3">
                              <label for="confirmPassword" class="form-label">Confirm Password</label>
                              <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required>
                          </div>
                          <button type="submit" class="btn btn-primary">Register</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios'; // Your custom axios instance with baseURL set

const username = ref('');
const password = ref('');
const regUsername = ref('');
const regEmail = ref('');
const regPassword = ref('');
const confirmPassword = ref('');
const router = useRouter();

const toggleNavbar = () => {
  const navbarCollapse = document.getElementById('navbarNav');
  const bsCollapse = new bootstrap.Collapse(navbarCollapse);
  bsCollapse.toggle();
};

const closeNavbar = () => {
  const navbarCollapse = document.getElementById('navbarNav');
  const bsCollapse = new bootstrap.Collapse(navbarCollapse);
  bsCollapse.hide();
};

const openLoginModal = () => {
  const modalElement = document.getElementById('loginModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const openRegisterModal = () => {
  const modalElement = document.getElementById('registerModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

const handleLogin = async () => {
  try {
    const response = await axios.post('/user/login', { email: username.value, password: password.value });
    localStorage.setItem('token', response.data.token); // Save JWT to localStorage
    console.log('Logged in successfully');
    router.push('/'); // Redirect user after login, adjust the route as necessary
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  } finally {
    const modalElement = document.getElementById('loginModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
};

const handleRegister = async () => {
  if (regPassword.value !== confirmPassword.value) {
    return console.error('Passwords do not match');
  }

  try {
    const response = await axios.post('/user/register', {
      email: regEmail.value,
      password: regPassword.value,
      username: regUsername.value,
    });
    console.log('Registered successfully:', response.data.message);
    router.push('/auth'); // Redirect to login after registration, adjust as necessary
  } catch (error) {
    console.error('Registration failed:', error.response.data.message);
  } finally {
    const modalElement = document.getElementById('registerModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
};

const handleLogout = () => {
  localStorage.removeItem('token'); // Remove JWT from localStorage
  console.log('Logged out');
  router.push('/'); // Redirect after logout
};

// Expose the closeNavbar method to the parent component
defineExpose({
  closeNavbar
});
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
}
.navbar-nav .nav-link {
  transition: background-color 0.3s;
}
.navbar-nav .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dropdown-toggle::after {
  display: none; /* Hide the default caret */
}
</style>