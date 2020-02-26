<template>
  <section class="">
    <h1>👍 Compre ou venda 👎</h1>
    <ProductsSearch />
    <ProductsList />
  </section>
</template>

<script>
import ProductsSearch from '@/components/ProductsSearch.vue';
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'home',
  components: {
    ProductsSearch,
    ProductsList,
  },
};
</script>

<style scoped>
h1 {
  color: #87f;
  font-size: 2rem;
  margin-top: 40px;
  text-align: center;
}
</style>
