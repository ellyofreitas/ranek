import Vue from 'vue';
import Vuex from 'vuex';

import api from '@/services/api';

Vue.use(Vuex);

const INITIAL_STATE = {
  isLogged: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    oldPassword: '',
  },
  address: {
    zipcode: '',
    street: '',
    number: '',
    strict: '',
    district: '',
    city: '',
    state: '',
  },
  userProducts: [],
};

export default new Vuex.Store({
  strict: true,
  state: INITIAL_STATE,
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogged = payload;
    },
    SET_USER(state, payload) {
      state.user = { ...state.user, ...payload };
    },
    SET_ADDRESS(state, payload) {
      state.address = { ...state.address, ...payload };
    },
    SET_USER_PRODUCTS(state, payload) {
      state.userProducts = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.userProducts.unshift(payload);
    },
  },
  actions: {
    async getUserProducts({ state, commit }) {
      const { user } = state;
      const { data } = await api.get(`/products?user_id=${user.id}`);

      commit('SET_USER_PRODUCTS', data);
    },
    async getUser({ commit }) {
      const { data } = await api.get('/users/');

      commit('SET_ADDRESS', data.address);

      delete data.address;
      delete data.address_id;

      commit('SET_USER', {
        ...data,
        oldPassword: undefined,
        password: undefined,
      });

      commit('SET_LOGIN', true);
    },
    async signIn({ state, commit, dispatch }) {
      const { email, password } = state.user;

      const { data } = await api.post('/sessions/', {
        email,
        password,
      });

      commit('SET_USER', data.user);

      dispatch('getUser');

      localStorage.token = data.token;
    },
    async signUp({ state, commit, dispatch }) {
      const { data } = await api.post('/users', {
        ...state.user,
        address: state.address,
      });

      commit('SET_USER', {
        email: data.email,
      });

      dispatch('signIn');
    },
    async signOut({ commit }) {
      commit('SET_USER', {
        id: '',
        name: '',
        email: '',
        password: '',
        oldPassword: '',
      });

      commit('SET_ADDRESS', {
        city: '',
        state: '',
        street: '',
        strict: '',
        number: '',
        zipcode: '',
        district: '',
      });

      commit('SET_LOGIN', false);

      localStorage.removeItem('token');
      api.defaults.headers.Authorization = null;
    },
    async updateUser({ state, commit }) {
      const { data } = await api.put(`/users/${state.user.id}`, {
        ...state.user,
        address: state.address,
      });

      commit('SET_USER', data);
    },
  },
  modules: {},
});
