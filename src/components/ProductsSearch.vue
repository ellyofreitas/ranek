<template>
  <form @submit.prevent="getProducts">
    <input v-model="search" type="text" placeholder="Buscar..." />
    <button type="submit" />
  </form>
</template>

<script>
export default {
  name: 'ProductsSearch',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    getProducts() {
      if (this.$route.query.q !== this.search) {
        this.$router.push({ query: { q: this.search } });
      }
    },
  },
  created() {
    this.search = this.$route.query.q || '';
  },
};
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
  padding: 0px 10px;
}

input {
  width: 100%;
  padding: 20px;
  border: none;
}

input:focus,
input:hover {
  transform: scale(1.1);
}

button {
  width: 62px;
  height: 62px;
  background: url('../assets/search.svg') no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  /* box-shadow: 0 3px 6px rgba(30, 60, 90, 0.1); */
}
</style>
