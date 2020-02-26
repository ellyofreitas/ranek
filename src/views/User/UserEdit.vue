<template>
  <section class="">
    <UserForm>
      <button @click.prevent="handleSubmit" type="submit" class="btn">
        Atualizar Usuário
      </button>
      <ErrorNotify :errors="errors" />
    </UserForm>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import UserForm from '@/components/UserForm.vue';

export default {
  name: 'UserEdit',
  components: {
    UserForm,
  },
  data() {
    return {
      errors: [],
    };
  },
  methods: {
    ...mapActions(['updateUser']),
    async handleSubmit() {
      this.errors = [];
      try {
        await this.updateUser();
        this.$router.push({ name: 'user' });
      } catch (error) {
        const { data } = error.response;
        this.errors.push(data.validation[0]);
      }
    },
  },
};
</script>

<style scoped></style>
