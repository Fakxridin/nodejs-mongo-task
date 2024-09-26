<template>
    <div class="container mt-5 toppedpart">
        <h1>Authors</h1>
        <button class="btn btn-primary mb-3" @click="openModal(null)">
            <i class="bi bi-person-plus-fill"></i> Add Author
        </button>

        <!-- Authors Table -->
        <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Biography</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loading">
                        <td colspan="4" class="text-center">
                            <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-for="author in authors" :key="author.id" v-else>
                        <td>{{ author._id }}</td>
                        <td>{{ author.name }}</td>
                        <td>{{ author.biography }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="openModal(author)">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteAuthor(author._id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal for Add/Edit Author -->
        <div class="modal fade" id="authorModal" tabindex="-1" aria-labelledby="authorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="authorModalLabel">{{ editMode ? 'Edit Author' : 'Add Author' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="currentAuthor.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="biography" class="form-label">Biography</label>
                                <textarea class="form-control" id="biography" v-model="currentAuthor.biography" required></textarea>
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

const authors = ref([]);
const currentAuthor = ref({ _id: null, name: '', biography: '' });
const editMode = ref(false);
const loading = ref(false); // Loading state
let authorModal = null;

// Fetch all authors
const fetchAuthors = async () => {
    loading.value = true;  // Set loading to true before fetching
    try {
        const response = await axios.get('/authors');
        // Sort the authors by creation date (assuming there is a field like `createdAt`) or reverse the array
        authors.value = response.data.reverse(); // This will display the newest authors first
    } catch (error) {
        console.error('Error fetching authors:', error);
    } finally {
        loading.value = false;  // Set loading to false after fetching
    }
};


// Add or update an author
const submitForm = async () => {
    try {
        if (editMode.value) {
            // Update author
            await axios.put(`/authors/${currentAuthor.value._id}`, currentAuthor.value);
        } else {
            // Add new author
            await axios.post('/authors', currentAuthor.value);
        }
        fetchAuthors();
        closeModal();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

// Delete an author
const deleteAuthor = async (id) => {
    if (confirm('Are you sure you want to delete this author?')) {
        try {
            await axios.delete(`/authors/${id}`);
            fetchAuthors();
        } catch (error) {
            console.error('Error deleting author:', error);
        }
    }
};

// Open modal for add or edit
const openModal = (author) => {
    editMode.value = !!author;
    currentAuthor.value = author ? { ...author } : { _id: null, name: '', biography: '' };
    const modalElement = document.getElementById('authorModal');
    authorModal = new bootstrap.Modal(modalElement);
    authorModal.show();
};

// Close the modal
const closeModal = () => {
    if (authorModal) {
        authorModal.hide();
    }
};

onMounted(() => {
    fetchAuthors();
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
.table-responsive {
    max-height: 400px;
    overflow-y: auto;
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