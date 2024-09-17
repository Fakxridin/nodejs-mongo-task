<template>
    <div class="container mt-5 ">
        <div class="toppedpart"><h1>Categories</h1>
            <button class="btn btn-primary mb-3" @click="openModal(null)">Add Category</button>
        </div>
        
        <!-- Loading Indicator -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
  
        <!-- Categories Table -->
        <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
            <table v-if="!loading" class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories" :key="category.id">
                        <td>{{ category._id }}</td>
                        <td>{{ category.name }}</td>
                        <td>{{ category.description }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="openModal(category)"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm" @click="deleteCategory(category._id)"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  
        <!-- Modal for Add/Edit Category -->
        <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="categoryModalLabel">{{ editMode ? 'Edit Category' : 'Add Category' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="currentCategory.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <textarea class="form-control" id="description" v-model="currentCategory.description" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-success">{{ editMode ? 'Update' : 'Add' }}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from '../axios';
  
  const categories = ref([]);
  const currentCategory = ref({ _id: null, name: '', description: '' });
  const editMode = ref(false);
  const loading = ref(true); // Loading state
  let categoryModal = null;
  
  // Fetch all categories
  const fetchCategories = async () => {
    loading.value = true; // Start loading
    try {
        const response = await axios.get('/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        loading.value = false; // End loading
    }
  };
  
  // Add or update a category
  const submitForm = async () => {
    try {
        if (editMode.value) {
            // Update category
            await axios.put(`/categories/${currentCategory.value._id}`, currentCategory.value);
        } else {
            // Add new category
            await axios.post('/categories', currentCategory.value);
        }
        fetchCategories();
        closeModal();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };
  
  // Delete a category
  const deleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
        try {
            await axios.delete(`/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }
  };
  
  // Open modal for add or edit
  const openModal = (category) => {
    editMode.value = !!category;
    currentCategory.value = category ? { ...category } : { _id: null, name: '', description: '' };
    const modalElement = document.getElementById('categoryModal');
    categoryModal = new bootstrap.Modal(modalElement);
    categoryModal.show();
  };
  
  // Close the modal
  const closeModal = () => {
    if (categoryModal) {
        categoryModal.hide();
    }
  };
  
  // Fetch categories on mounted
  onMounted(() => {
    fetchCategories();
  });
  </script>
  
  <style scoped>
  .table th,
  .table td {
    text-align: center;
    vertical-align: middle;
  }
  .spinner-border {
    width: 3rem;
    height: 3rem;
  }
 
  
  @media (max-width: 768px) {
   
   .table th,
   .table td {
       display: block;
       text-align: left;
   }
   .toppedpart{
       text-align: center;
       display: block;
       position: relative;
       top: -50px;
   }
}
  </style>