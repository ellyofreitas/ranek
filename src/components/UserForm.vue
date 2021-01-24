<template>
  <form @submit.prevent>
    <template v-if="showDataLogin">
      <label for="name">Nome</label>
      <input v-model.lazy="name" type="text" id="name" />

      <label for="newemail">Email</label>
      <input v-model.lazy="email" type="email" id="newemail" />

      <label for="newpassword">Senha</label>
      <input v-model.lazy="password" type="password" id="newpassword" />

      <template v-if="showOldPassword">
        <label for="oldpassword">Senha Antiga</label>
        <input v-model.lazy="oldPassword" type="password" id="oldpassword" />
      </template>
    </template>

    <label for="zipcode">Cep</label>
    <input v-model.lazy="zipcode" type="text" id="zipcode" maxlength="8" />

    <label for="street">Rua</label>
    <input v-model.lazy="street" type="text" id="street" />

    <label for="number">Número</label>
    <input v-model.lazy="number" type="text" id="number" />

    <label for="strict">Bairro</label>
    <input v-model.lazy="strict" type="text" id="strict" />

    <label for="city">Cidade</label>
    <input v-model.lazy="city" type="text" id="city" />

    <label for="state">Estado</label>
    <input v-model.lazy="state" type="text" id="state" />

    <div class="button">
      <slot />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import { getZipcode } from '@/services/api';
import mapFields from '@/util/mapFields';

export default {
  name: 'UserForm',
  computed: {
    ...mapState(['isLogged']),
    ...mapFields(['name', 'email', 'password', 'oldPassword'], {
      action: 'SET_USER',
      base: 'user',
    }),
    ...mapFields(['zipcode', 'street', 'number', 'strict', 'city', 'state'], {
      action: 'SET_ADDRESS',
      base: 'address',
    }),
    showDataLogin() {
      return !this.isLogged || this.$route.name === 'user-edit';
    },
    showOldPassword() {
      return this.$route.name === 'user-edit';
    },
  },
  // methods: {},
  watch: {
    async zipcode() {
      const zipcode = this.zipcode.replace(/\D/g, '');
      if (zipcode.length === 8) {
        const { data } = await getZipcode(zipcode);
        this.street = data.logradouro;
        this.strict = data.bairro;
        this.state = data.uf;
        this.city = data.localidade;
      }
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
