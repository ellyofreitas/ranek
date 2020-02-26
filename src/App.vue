<template>
  <div id="app">
    <Header />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { validateToken } from '@/services/api';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions(['getUser']),
    ...mapState(['isLogged']),
  },
  async created() {
    try {
      if (!localStorage.token) {
        throw new Error('Not have token');
      }

      const { data } = await validateToken();

      if (data.valid && this.isLogged) {
        this.getUser();
      } else {
        throw new Error('Token invalid');
      }
    } catch (error) {
      localStorage.removeItem('token');
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

body {
  font-family: 'Avenir', Helvetica, sans-serif;
  color: #345;
  background: url('./assets/pattern.svg') repeat top;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  font-family: 'Avenir', Helvetica, sans-serif;
  cursor: pointer;
}

.btn:hover {
  background: #65d;
  transform: scale(1.1);
}

.btn-disabled,
.btn-disabled:hover {
  background: #bbc;
  transform: scale(1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#main {
  flex: 1;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: 'Avenir', Helvetica, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted #ccc;
  color: #006080;
}

.tooltip .tooltiptext {
  visibility: hidden;
  position: absolute;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.6s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip-top {
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
}
</style>
