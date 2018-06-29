<template>
  <div>
    <section class="hero is-default is-bold">
    <template v-if="!embed">
     <div class="hero-head">
       <div class="container">
         <nav class="navbar" role="navigation" >
            <div class="navbar-brand">
               <a class="navbar-item" href="/">
                <img src="/static/favicon.png" alt="SISEC"><h1 class="title is-5">SiSEC MUS 2018</h1>
               </a>
               <a role="button" class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }" aria-label="menu" aria-expanded="false">
                 <span aria-hidden="true"></span>
                 <span aria-hidden="true"></span>
                 <span aria-hidden="true"></span>
               </a>
             </div>
            <main-menu :isActive="showNav"></main-menu>
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
         <span class="is-size-7 footerdesc">Organized by</span>
         <span class="logo">
           <a href="http://www.inria.fr">
             <img src="./assets/logo_INRIA.png" alt="Inria" width="180px">
           </a>
         </span>
         <span class="logo">
           <a href="http://www.lirmm.fr">
             <img src="./assets/logo_lirmm.svg" alt="LIRMM" width="70px">
           </a>
         </span>
         <span class="logo org">
           <span class="is-size-7 footerdesc">Sponsored by</span>
           <a href="http://www.native-instruments.com">
             <img src="./assets/logo_ni.svg" alt="LIRMM" width="80px">
           </a>
         </span>
       </p>
     </div>
   </div>
  </footer>
</div>
</template>

<script>
import MainMenu from './Menu.vue'

export default {
  components: { MainMenu },
  data: function () {
    return {
      showNav: false
    }
  },
  computed: {
    embed: function() {
      if (this.$route.query.mode == "embed") {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style>

.footerdesc {
  position: absolute;
}

.footer {
  background-color: #191919!important;
}

.logo {
  margin-right: 2em;
}

.navbar-brand img {
  margin-right: 1em;
}
.navbar-brand {
  padding-left: 1em;
}
</style>
