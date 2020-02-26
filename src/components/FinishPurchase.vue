<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErrorNotify :errors="errors" />
    <UserForm>
      <button @click.prevent="handleFinishPurchase" class="btn">
        Finalizar Compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserForm from '@/components/UserForm.vue';
import api from '@/services/api';

export default {
  name: 'FinishPurchase',
  components: {
    UserForm,
  },
  data() {
    return {
      errors: [],
    };
  },
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['isLogged', 'user', 'address']),
    purchase() {
      return {
        product: this.product,
        address: this.address,
      };
    },
  },
  methods: {
    ...mapActions(['signIn', 'signUp']),
    async createTransaction() {
      try {
        this.errors = [];
        await api.post('/transactions', this.purchase);
        this.$router.push({ name: 'purchases' });
      } catch (error) {
        const { data } = error.response;
        this.errors.push(data.validation[0]);
      }
    },
    async handleFinishPurchase() {
      if (!this.isLogged) {
        await this.signUp();
      }
      await this.createTransaction();
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
