<template>
  <div class="navbar-end navbar-menu" :class="{ 'is-active': isActive }">
      <router-link class="navbar-item is-tab" :to="{ path: '/dataset' }">Dataset</router-link>
      <router-link class="navbar-item is-tab" :to="{ path: '/methods' }">Methods</router-link>
      <router-link class="navbar-item is-tab" :to="{ path: '/results' }">Results</router-link>
      <router-link class="navbar-item is-tab" :to="{ path: '/listen' }">
        <span class="icon">
           <i class="fa fa-volume-up"></i>
        </span>
        <span>Listen</span>
      </router-link>
      <router-link class="navbar-item is-tab" :to="{ path: '/about' }">About</router-link>
      <div class="navbar-item">
        <a
        href="http://sisec.inria.fr" class="button is-info is-outlined"
        >
          <span>SiSEC Website</span>
        </a>
      </div>
      <div class="navbar-item">
        <a
        class="button is-primary"
        v-on:click="toggleCite"
        >
          <span class="icon">
            <i class="fa fa-quote-left"></i>
          </span>
          <span>Cite</span>
        </a>
      </div>
   <div class="modal" v-bind:class="{ 'is-active': showCite }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">The 2018 Signal Separation Evaluation Campaign</p>
        <button class="delete" v-on:click="toggleCite"></button>
      </header>
      <section class="modal-card-body" v-bind:class="{ 'bibtex': showBibtex }" >
        <div v-if="!showBibtex">
          Fabian-Robert Stöter, Antoine Liutkus, Nobutaka Ito</br>
          14th International Conference on Latent Variable Analysis and Signal Separation (LVA/ICA 2018)</br>
        </div>
        <pre v-if="showBibtex">@InProceedings{SiSEC18,
  author="St{\"o}ter, Fabian-Robert and Liutkus, Antoine and Ito, Nobutaka",
  title="The 2018 Signal Separation Evaluation Campaign",
  booktitle="Latent Variable Analysis and Signal Separation:
  14th International Conference, LVA/ICA 2018, Surrey, UK",
  year="2018",
  pages="293--305"
}</pre>
      </section>
      <footer class="modal-card-foot">
        <a class="button" v-bind:class="{ 'is-danger': showBibtex }" v-on:click="toggleBibtex">
          <span class="icon">
             <i class="fa fa-book"></i>
          </span>
          <span>BibTex</span>
        </a>
        <a class="button" href="mailto:fabian-robert.stoter@inria.fr">
          <span class="icon">
             <i class="fa fa-envelope"></i>
          </span>
          <span>Contact</span>
        </a>
      </footer>
    </div>
  </div>
    </div>
</template>

<script>
import bulma from 'bulma/css/bulma.css';
import fontawesome from 'font-awesome/css/font-awesome.min.css';

export default {
  props: {
    isActive: Boolean
  },
  data: function () {
    return {
      showCite: false,
      showBibtex: false,
    }
  },
  methods: {
    toggleCite: function() {
      this.showCite = !this.showCite
    },
    toggleBibtex: function() {
      this.showBibtex = !this.showBibtex
    },
  }
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style media="screen">
.navbar {
    margin-top: 10px;
    z-index: 1000;
}

.modal-card-body pre {
  text-align: left;
}

.modal {
  z-index: 9998;
}

.modal-card {
  z-index: 9999;
}

.bibtex {
  background-color: #ff3860;
  color: white;
}

.bibtex pre {
  background-color: #ff3860;
  color: white;
}

</style>
