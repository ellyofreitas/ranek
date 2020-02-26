<template>
  <section class="">
    <h2>Crie a Sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!create" @click.prevent="create = true" class="btn">
        Criar Contar
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="handleSubmit">
          Criar Usuário
        </button>
        <ErrorNotify :errors="errors" />
      </UserForm>
    </transition>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'LoginCreate',
  components: {
    UserForm,
  },
  data() {
    return {
      create: false,
      errors: [],
    };
  },
  methods: {
    ...mapActions(['signUp']),
    async handleSubmit() {
      this.errors = [];
      try {
        await this.signUp();
        this.$router.push({ name: 'user' });
      } catch (error) {
        const { data } = error.response;
        this.errors.push(data.validation[0]);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  /* max-width: 300px; */
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
