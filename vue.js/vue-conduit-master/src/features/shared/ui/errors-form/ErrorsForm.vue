<template>
  <ul class="error-messages" v-if="errorList.length > 0">
    <li v-for="(error, index) in errorList" :key="index">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  name: 'ErrorsForm',
  props: {
    errors: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorList() {
      return Object.keys(this.errors).map((key) => `${key} ${this.errors[key]}`);
    }
  }
};
</script>
