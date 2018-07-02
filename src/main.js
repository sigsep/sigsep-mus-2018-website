import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import Results from './results/Results.vue'
import Unmix from './Unmix.vue'
import Compare from './Compare.vue'
import Player from './player/Player.vue'
import About from './About.vue'
import Methods from './Methods.vue'
import Method from './Method.vue'
import Description from './Description.vue'
import Dataset from './Dataset.vue'
import Home from './Home.vue'

import Icon from 'vue-awesome/components/Icon.vue'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueLazyload)

const router = new VueRouter({
  linkActiveClass: 'is-active',
  routes: [
    { path: '/', component: App,
      children: [
        { path: '', component: Home },
        { path: 'unmix', redirect: { name: 'unmix', params: { track: 'AM Contra - Heart Peripheral', method: 'REF' }}, props: (route) => ({ mode: route.query.mode })},
        { path: 'compare', redirect: { name: 'compare', params: { track: 'AM Contra - Heart Peripheral' }}, props: (route) => ({ mode: route.query.mode })},
        { path: 'unmix/:track/:method', name: 'unmix', component: Unmix},
        { path: 'compare/:track', name: 'compare', component: Compare},
        { path: 'results', redirect: { name: 'results', params: {target: 'vocals', metric: 'SDR' } } },
        { path: 'results/:target/:metric', name: 'results', component: Results },
        { path: 'results/:target/:metric/play/:track_id/:method', name: 'player', component: Results },
        { path: 'about', component: About },
        { path: 'methods', component: Methods },
        { path: 'methods/:short', name: 'description', component: Description, props: true},
        { path: 'dataset', component: Dataset },
      ]
    },
  ]
})

function hasQueryParams(route) {
  return !!Object.keys(route.query).length
}

router.beforeEach((to, from, next) => {
   if(!hasQueryParams(to) && hasQueryParams(from)){
    next({name: to.name, query: from.query});
  } else {
    next()
  }
})

const app = new Vue({
  router
}).$mount('#app')
