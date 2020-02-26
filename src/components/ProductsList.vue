<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div v-for="(product, index) in products" :key="index" class="product">
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img
              v-if="product.photos && product.photos.length > 0"
              :src="product.photos[0].url"
              :alt="product.photos[0].name"
            />
            <p class="price">{{ product.price | toMoney }}</p>
            <h2 class="title">{{ product.name }}</h2>
            <p class="description">{{ product.description }}</p>
          </router-link>
        </div>
        <ProductsPaginate
          :productsTotal="productsTotal"
          :productsPerPage="productsPerPage"
        />
      </div>

      <div v-else-if="products && products.length === 0" key="no-results">
        <p class="no-results">Busca sem resultado. Tente buscar outro termo.</p>
      </div>
      <PageLoading v-else key="loading" />
    </transition>
  </section>
</template>

<script>
import api from '@/services/api';
import parseQueryParamsAsString from '@/helpers/parseQueryParamsAsString';
import ProductsPaginate from '@/components/ProductsPaginate.vue';

export default {
  name: 'ProductsList',
  components: {
    ProductsPaginate,
  },
  data() {
    return {
      products: null,
      productsPerPage: 9,
      productsTotal: 0,
    };
  },
  computed: {
    url() {
      const queryString = parseQueryParamsAsString(this.$route.query);
      return `?_limit=${this.productsPerPage}${queryString}`;
    },
  },
  methods: {
    async getProducts() {
      this.products = null;
      const { data, headers } = await api.get(`/products${this.url}`);
      this.products = data;
      this.productsTotal = Number(headers['x-total-count']);
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.price {
  color: #e80;
  font-weight: bold;
}

.no-results {
  text-align: center;
}
</style>
