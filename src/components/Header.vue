<template>
  <header class="">
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </router-link>
      <router-link v-if="name" to="/user" class="btn">
        {{ name }}
      </router-link>
      <router-link v-else to="/login" class="btn">
        Vender / Login
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    name() {
      return this.$store.state.user.name.replace(/ .*/, '');
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
