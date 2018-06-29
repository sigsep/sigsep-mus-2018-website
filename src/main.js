import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import Results from './results/Results.vue'
import Listen from './Listen.vue'
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
        { path: 'listen', redirect: { name: 'listen', params: { track: 'AM Contra - Heart Peripheral', method: 'REF' }}, props: (route) => ({ mode: route.query.mode })},
        { path: 'listen/:track/:method', name: 'listen', component: Listen},
        { path: 'compare/:track/:target', name: 'compare', component: Compare},
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
