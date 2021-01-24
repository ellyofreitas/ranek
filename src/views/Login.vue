<template>
  <section class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input v-model.lazy="email" type="email" id="email" />
      <label for="password">Senha</label>
      <input v-model.lazy="password" type="password" id="password" />
      <button type="submit" class="btn">Logar</button>
      <ErrorNotify :errors="errors" />
    </form>
    <p class="forgot">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <LoginCreate />
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import mapFields from '@/util/mapFields';
import LoginCreate from '@/components/LoginCreate.vue';

export default {
  name: 'Login',
  components: {
    LoginCreate,
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapFields(['email', 'password'], { action: 'SET_USER', base: 'user' }),
  },
  methods: {
    ...mapActions(['signIn']),
    async handleSubmit() {
      this.errors = [];
      try {
        await this.signIn();
        this.$router.push({ name: 'user' });
      } catch (error) {
        const { data } = error.response;
        this.errors.push(data.validation[0]);
      }
    },
  },
  created() {
    document.title = 'Login';
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.forgot {
  text-align: center;
  margin: 20px auto 0 auto;
}
.forgot a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
