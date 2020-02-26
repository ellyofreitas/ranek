<template>
  <form @submit.prevent="handleSubmit" class="add-product">
    <label for="name">Nome</label>
    <input v-model="product.name" id="name" type="text" />
    <label for="price">Preço (R$)</label>
    <input v-model.number="product.price" id="price" type="number" />
    <label for="photos">Fotos</label>
    <input ref="photos" id="photos" type="file" multiple="multiple" />
    <label for="description">Descrição</label>
    <textarea v-model="product.description" id="description" type="number">
    </textarea>
    <button type="submit" class="btn">Adicionar Produto</button>
    <div />
    <ErrorNotify :errors="errors" />
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/services/api';

export default {
  name: 'ProductAdd',
  data() {
    return {
      product: {
        name: '',
        price: 0,
        description: '',
        selled: 'false',
      },
      errors: [],
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['getUserProducts']),
    async handleSubmit() {
      this.errors = [];
      try {
        await api.post('/products', this.formatProduct());
        this.getUserProducts();
      } catch (error) {
        const { data } = error.response;
        this.errors.push(data.validation[0]);
      }
    },
    formatProduct() {
      const data = new FormData();
      const { files } = this.$refs.photos;

      for (let i = 0; i < files.length; i += 1) {
        data.append('file', files[i]);
      }

      Object.keys(this.product).forEach(key =>
        data.append(key, this.product[key])
      );

      data.append('user_id', Number(this.user.id));
      // data.append('file', files);
      return data;
    },
  },
};
</script>

<style scoped>
.add-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}

/* input[type='file']::-webkit-file-upload-button {
  visibility: hidden;
} */
</style>
