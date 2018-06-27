<template>
  <div class="columns">
    <div class="column is-narrow">
    </div>
    <div class="column is-narrow">
      <div class="buttons has-addons">
        <router-link class="button is-vocals" active-class="is-primary"   :to="{ name: $route.name, params: Object.assign({}, $route.params, { target: 'vocals' })}">Vocals</router-link>
        <router-link class="button is-acc" active-class="is-primary"      :to="{ name: $route.name, params: Object.assign({}, $route.params, { target: 'accompaniment' })}">Accompaniment</router-link>
        <router-link class="button is-drums" active-class="is-primary"    :to="{ name: $route.name, params: Object.assign({}, $route.params, { target: 'drums' })}">Drums</router-link>
        <router-link class="button is-bass" active-class="is-primary"     :to="{ name: $route.name, params: Object.assign({}, $route.params, { target: 'bass' })}">Bass</router-link>
        <router-link class="button is-other" active-class="is-primary"    :to="{ name: $route.name, params: Object.assign({}, $route.params, { target: 'other' })}">Other</router-link>
      </div>
    </div>
    <div class="column is-narrow">
      <div class="buttons has-addons">
        <router-link class="button" active-class="is-primary"             :to="{ name: $route.name, params: Object.assign({}, $route.params, { metric: 'SDR' })}">SDR</router-link>
        <router-link class="button" active-class="is-primary"             :to="{ name: $route.name, params: Object.assign({}, $route.params, { metric: 'ISR' })}">ISR</router-link>
        <router-link class="button" active-class="is-primary"             :to="{ name: $route.name, params: Object.assign({}, $route.params, { metric: 'SIR' })}">SIR</router-link>
        <router-link class="button" active-class="is-primary"             :to="{ name: $route.name, params: Object.assign({}, $route.params, { metric: 'SAR' })}">SAR</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import bulma from 'bulma/css/bulma.css';
import headers from '../headers.js'

export default {
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style media="screen">

.button.is-vocals.is-primary,
.button.is-vocals.is-primary:hover {
  color: white;
  background-color: #56B4E9;
  border-color: #56B4E9;
}

.button.is-vocals:hover {
  color: #56B4E9;
  border-color: #56B4E9;
}

.button.is-acc.is-primary,
.button.is-acc.is-primary:hover {
  color: white;
  background-color: #818181;
  border-color: #818181;
}

.button.is-acc:hover {
  color: #818181;
  border-color: #818181;
}

.button.is-drums.is-primary,
.button.is-drums.is-primary:hover {
  color: white;
  background-color: #009E73;
  border-color: #009E73;
}

.button.is-drums:hover {
  color: #009E73;
  border-color: #009E73;
}

.button.is-bass.is-primary,
.button.is-bass.is-primary:hover {
  color: white;
  background-color: #D55E00;
  border-color: #D55E00;
}

.button.is-bass:hover {
  color: #D55E00;
  border-color: #D55E00;
}

.button.is-other.is-primary,
.button.is-other.is-primary:hover {
  color: white;
  background-color: #CC79A7;
  border-color: #CC79A7;
}

.button.is-other:hover {
  color: #CC79A7;
  border-color: #CC79A7;
}

.nav {
    margin-top: 10px
}
</style>
