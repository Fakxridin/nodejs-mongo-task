<template>
    <div class="container mt-5 ">
        <div class="topped_part">
            <h1>Books</h1>
            <button class="btn btn-primary mb-3" @click="openModal(null)">Add Book</button>
        </div>
       
        
        <!-- Loading Indicator -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <!-- Books Table -->
        <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
            <table v-if="!loading" class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Published Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in books" :key="book._id">
                        <td>{{ book._id }}</td>
                        <td>{{ book?.user?.email }}</td>
                        <td>{{ book?.title }}</td>
                        <td>{{ book?.author?.name }}</td>
                        <td>{{ book?.category?.name }}</td>
                        <td>{{ book.publishedYear }}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" @click="openModal(book)"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm" @click="deleteBook(book._id)"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal for Add/Edit Book -->
        <div class="modal fade" id="bookModal" tabindex="-1" aria-labelledby="bookModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="bookModalLabel">{{ editMode ? 'Edit Book' : 'Add Book' }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" class="form-control" id="title" v-model="currentBook.title" required>
                            </div>
                            <div class="mb-3">
                                <label for="author" class="form-label">Author</label>
                                <select class="form-select" v-model="currentBook.author" required>
                                    <option disabled value="">Select an author</option>
                                    <option v-for="author in authors" :key="author._id" :value="author._id">{{ author.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label">Category</label>
                                <select class="form-select" v-model="currentBook.category" required>
                                    <option disabled value="">Select a category</option>
                                    <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="publishedYear" class="form-label">Published Year</label>
                                <input type="number" class="form-control" id="publishedYear" v-model="currentBook.publishedYear" required>
                            </div>
                            <div class="mb-3">
                                <label for="summary" class="form-label">Summary</label>
                                <textarea class="form-control" id="summary" v-model="currentBook.summary"></textarea>
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

const books = ref([]);
const authors = ref([]);
const categories = ref([]);
const currentBook = ref({
    _id: null,
    title: '',
    author: '',
    category: '',
    publishedYear: '',
    summary: ''
});
const editMode = ref(false);
const loading = ref(true); // Loading state
let bookModal = null;

// Fetch all books, authors, and categories
const fetchBooks = async () => {
    loading.value = true; // Start loading
    try {
        const response = await axios.get('/books');
        books.value = response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
    } finally {
        loading.value = false; // End loading
    }
};

const fetchAuthors = async () => {
    try {
        const response = await axios.get('/authors');
        authors.value = response.data;
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Add or update a book
const submitForm = async () => {
    try {
        if (editMode.value) {
            // Update book
            await axios.put(`/books/${currentBook.value._id}`, currentBook.value);
        } else {
            // Add new book
            await axios.post('/books', currentBook.value);
        }
        fetchBooks();
        closeModal();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

// Delete a book
const deleteBook = async (id) => {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            await axios.delete(`/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
};

// Open modal for add or edit
const openModal = (book) => {
    editMode.value = !!book;
    currentBook.value = book
        ? {
            ...book, 
            author: book.author ? book.author._id : '', 
            category: book.category ? book.category._id : '' 
        }
        : {
            id: null,
            title: '',
            author: '',
            category: '',
            publishedYear: '',
            summary: ''
        };
    const modalElement = document.getElementById('bookModal');
    bookModal = new bootstrap.Modal(modalElement);
    bookModal.show();
};

// Close modal
const closeModal = () => {
    if (bookModal) {
        bookModal.hide();
    }
};

// Fetch data on mounted
onMounted(() => {
    fetchBooks();
    fetchAuthors();
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
   .topped_part{
       text-align: center;
       display: block;
       position: relative;
       top: -50px;
   }
}
</style>