<template>
  <div>
    <h1>Página não encontrada</h1>
    <router-link class="home" :to="{ name: 'home' }"
      >Voltar para a Home</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style scoped>
h1 {
  margin: 20px auto;
  text-align: center;
}

.home {
  display: block;
  text-align: center;
}

a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
