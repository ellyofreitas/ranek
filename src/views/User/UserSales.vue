<template>
  <section>
    <template v-if="sales">
      <h2>Vendas</h2>
      <div v-for="sale in sales" :key="sale.id" class="product-wrapper">
        <ProductItem v-if="sale.product" :product="sale.product">
          <p class="buyer">
            <span>Comprador: </span>
            {{ sale.buyer && sale.buyer.name }}
          </p>
        </ProductItem>
        <div class="address">
          <h3>Entrega:</h3>
          <ul v-if="sale.address">
            <li>CEP: {{ sale.address.zipcode }}</li>
            <li>Rua: {{ sale.address.street }}</li>
            <li>Número: {{ sale.address.number }}</li>
            <li>Bairro: {{ sale.address.strict }}</li>
            <li>Cidade: {{ sale.address.city }}</li>
            <li>Estado: {{ sale.address.state }}</li>
          </ul>
        </div>
      </div>
    </template>
    <PageLoading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/services/api';
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'UserSales',
  components: {
    ProductItem,
  },
  data() {
    return {
      sales: null,
    };
  },
  computed: {
    ...mapState(['isLogged', 'user']),
  },
  methods: {
    async getSales() {
      const { data } = await api.get(
        `/transactions?salesman_id=${this.user.id}`
      );
      this.sales = data;
    },
  },
  watch: {
    isLogged(prox) {
      if (prox) {
        this.getSales();
      }
    },
  },
  created() {
    document.title = 'Usuário | Vendas';
    if (this.isLogged) {
      this.getSales();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.buyer span {
  color: #e80;
}

.address {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

.address ul li {
  text-transform: capitalize;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  justify-self: end;
}

@media screen and (max-width: 500px) {
  .address {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  h3 {
    justify-self: start;
  }
}
</style>
