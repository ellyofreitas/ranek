<template>
  <section class="user">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{ name: 'user' }">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'purchases' }">Compras</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'sales' }">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'user-edit' }">Editar Usuário</router-link>
        </li>
        <li>
          <button @click.prevent="handleSignOut">
            Deslogar
          </button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'User',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['signOut']),
    async handleSignOut() {
      try {
        await this.signOut();
        this.$router.push({ name: 'login' });
      } catch (error) {
        // console.log(error)
      }
    },
  },
};
</script>

<style scoped>
.user {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .user {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

.sidenav button {
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: 'Avenir', Helvetica, sans-serif;
  cursor: pointer;
}
</style>
