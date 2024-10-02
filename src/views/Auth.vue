<template>
    <div class="app-container">
        <div class="landing-content">
            <h1>Welcome to the Landing Page!</h1>
            <p>This is some content for the landing page.</p>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    text-align: center;
    margin-top: 50px;
}

button {
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #388e71;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.modal-actions button {
    padding: 10px 15px;
}
</style>