<template>
  <section>
    <div v-if="product" class="product">
      <ul v-if="product.photos && product.photos.length" class="photos">
        <li v-for="(photo, index) in this.product.photos" :key="index">
          <img :src="photo.url" :alt="photo.name" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | toMoney }}</p>
        <p class="description">{{ product.description }}</p>
        <button v-if="product.user_id === user.id" class="btn" disabled>
          Esse produto é seu
        </button>
        <transition v-else-if="!product.selled" mode="out-in">
          <button v-if="!finish" @click="finish = true" class="btn">
            Comprar
          </button>
          <FinishPurchase v-else :product="product" />
        </transition>
        <button v-else class="btn btn-disabled" disabled>
          Produto Vendido
        </button>
      </div>
    </div>
    <PageLoading v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/services/api';
import FinishPurchase from '@/components/FinishPurchase.vue';

export default {
  name: 'Product',
  components: {
    FinishPurchase,
  },
  props: {
    id: {
      type: [Number, String],
      default: () => '0',
    },
  },
  data() {
    return {
      product: null,
      finish: false,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async getProduct() {
      try {
        const { data } = await api.get(`/products/${this.id}`);
        this.product = data;
      } catch (error) {
        this.product = {
          id: 0,
          name: 'Produto Indisponível',
          description: 'Esse produto não está mais diponivel',
          price: 0,
          selled: true,
        };
      }
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.photos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.description {
  font-size: 1.2rem;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.btn {
  margin-top: 60px;
  width: 200px;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
  }

  .photos {
    grid-row: 2;
  }

  .info {
    position: initial;
  }
}
</style>
