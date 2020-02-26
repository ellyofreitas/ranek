<template>
  <ul v-if="pagesTotal > 1">
    <li v-for="(page, index) in pagesRange" :key="page">
      <router-link
        :class="{
          'router-link-exact-active': index === 0 && !$route.query._page,
        }"
        :to="{ query: query(page) }"
      >
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProductsPaginate',
  props: {
    productsPerPage: {
      type: Number,
      default: 1,
    },
    productsTotal: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    pagesRange() {
      const pageCurrent = Number(this.$route.query._page);
      const pagesRange = 9;
      const pagesOffset = Math.ceil(pagesRange / 2);
      const { pagesTotal } = this;
      const pagesArray = [];

      for (let i = 1; i <= pagesTotal; i += 1) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, pageCurrent - pagesOffset);
      pagesArray.splice(pagesRange, pagesTotal);

      return pagesArray;
    },
    pagesTotal() {
      const total = this.productsTotal / this.productsPerPage;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
  },
  methods: {
    query(page) {
      return {
        ...this.$route.query,
        _page: page,
      };
    },
  },
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
