<template>
  <section>
    <template v-if="purchases" class="">
      <h2>Compras</h2>
      <div
        v-for="purchase in purchases"
        :key="purchase.id"
        class="product-wrapper"
      >
        <ProductItem v-if="purchase.product" :product="purchase.product">
          <p class="salesman">
            <span>Vendedor: </span>
            {{ purchase.salesman && purchase.salesman.name }}
          </p>
        </ProductItem>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/services/api';
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'UserPurchases',
  components: {
    ProductItem,
  },
  data() {
    return {
      purchases: null,
    };
  },
  computed: {
    ...mapState(['isLogged', 'user']),
  },
  methods: {
    async getPurchases() {
      const { data } = await api.get(`/transactions?buyer_id=${this.user.id}`);
      this.purchases = data;
    },
  },
  watch: {
    isLogged(prox) {
      if (prox) {
        this.getPurchases();
      }
    },
  },
  created() {
    if (this.isLogged) {
      this.getPurchases();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.salesman span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
