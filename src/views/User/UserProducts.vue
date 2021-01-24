<template>
  <section class>
    <h2>Adicionar Produto</h2>
    <ProductAdd />
    <h2>Seus produtos</h2>
    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="(product, index) in userProducts" :key="index + 'a'">
        <ProductItem :product="product">
          <p>{{ product.description }}</p>
          <button
            @click="deleteProduct(product.id)"
            :class="{ delete: true, confirm: confirm === product.id }"
          >
            Deletar
          </button>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductAdd from '@/components/ProductAdd.vue';
import ProductItem from '@/components/ProductItem.vue';
import api from '@/services/api';

export default {
  name: 'UserProducts',
  data() {
    return {
      confirm: 0,
      timeout: false,
    };
  },
  components: {
    ProductAdd,
    ProductItem,
  },
  computed: {
    ...mapState(['isLogged', 'user', 'userProducts']),
  },
  methods: {
    ...mapActions(['getUserProducts']),
    async deleteProduct(id) {
      if (this.confirm === id) {
        await api.delete(`products/${id}`);
        this.getUserProducts();
      }

      this.confirm = id;
    },
  },
  watch: {
    isLogged(prox) {
      if (prox) {
        this.getUserProducts();
      }
    },
    confirm() {
      if (!this.timeout) {
        setTimeout(() => {
          this.confirm = 0;
        }, 5000);

        this.timeout = true;
      }
    },
  },
  created() {
    document.title = 'Usuário | Produtos';
    if (this.isLogged) {
      this.getUserProducts();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.delete {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url('../../assets/remove.svg') no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
  transition: 0.2s;
}

.confirm {
  background: url('../../assets/confirm.svg') no-repeat center center;
}
</style>
