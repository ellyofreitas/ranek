<template>
  <transition>
    <ul class="error" v-if="errors.length > 0">
      <li v-for="(error, index) in errors" :key="index">
        {{ error }}
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'ErrorNotify',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.error {
  margin: 20px auto;
}

.error li {
  color: #e80;
  text-align: center;
}
</style>
