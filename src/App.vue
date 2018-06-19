<template>
  <div>
    <section class="hero is-default is-bold">
    <template v-if="!embed">
     <div class="hero-head">
       <div class="container">
         <nav class="navbar has-shadow" role="navigation" >
            <div class="navbar-brand">
               <a class="navbar-item" href="/">
                <img src="/favicon.png" alt="SISEC"><h1 class="title is-4">SiSEC MUS</h1>
               </a>
               <div class="navbar-menu">
                 <main-menu></main-menu>
               </div>
             </div>
         </nav>
       </div>
     </div>
   </template>
     <div v-bind:class="{ 'hero-body': !embed }">
       <div class="container">
         <router-view></router-view>
       </div>
     </div>
   </section>
   <footer class="footer" v-if="!embed">
   <div class="container">
     <div class="content has-text-centered">
       <p>
         <span><img src="./assets/logo_INRIA.png" alt="Inria" width="200px"></span>
       </p>
       <p>
         The website content
         is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
       </p>
     </div>
   </div>
  </footer>
</div>
</template>

<script>
import bulma from 'bulma/css/bulma.css';
import MainMenu from './Menu.vue'

export default {
  components: { MainMenu },
  computed: {
    embed: function() {
      if (this.$route.query.mode == "embed") {
        return true;
      } else {
        return false;
      }
    },
  }
}
</script>

<style>

.navbar-brand img {
  margin-right: 1em;
}
.navbar-brand {
  padding-left: 1em;
}
</style>
