<template>
  <div v-if="product" class="product">
    <router-link
      :to="{ name: 'product', params: { id: product.id } }"
      class="product-img"
    >
      <img
        v-if="product.photos.length"
        :src="product.photos[0].url"
        :alt="product.photos[0].name"
      />
    </router-link>
    <div class="info">
      <p class="price">{{ product.price | toMoney }}</p>
      <h2 class="title">{{ product.name }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

@media screen and (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}

.info {
  align-self: end;
}

.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
