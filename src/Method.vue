<template>
  <div id='method'>
    <section>
      <div>
        <h1 class="title is-3">
          <span>{{record.short}}</span>
          <span class="tag is-dark is-medium" v-if="record.is_blind">
             Blind Separation
           </span>
           <span class="tag is-info is-medium" v-if="record.add_data">
             Uses additional training data
            </span>
         </h1>
        <h3 class="subtitle">
          <strong>{{record.authors}}</strong>, {{record.affiliation}}
        </h3>
        <p class="control has-addons">
          <p class="buttons">
            <a v-if="record.code" :href="record.code" class="button">
              <span class="icon is-small">
                <i v-bind:class="gh(record.code) ? 'fa fa-github' : 'fa fa-code' "></i>
              </span>
              <span>Code</span>
            </a>
            <a v-if="record.website" :href="record.website" class="button">
              <span class="icon is-small">
                <i class='fa fa-eye'></i>
              </span>
              <span>Website/Demo</span>
            </a>

          </p>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      method: this.short,
      record: Object
    }
  },
  props: {
    short: String
  },
  filters: {
    truncate: function (string, value) {
      if (string) {
        return string.substring(0, value) + '...'
      } else {
        return ''
      }
    }
  },
  mounted: function () {
    this.fetchData(this.method)
  },
  methods: {
    gh: function (string) {
      return string.includes('github.com')
    },
    fetchData: function (v) {
      axios.get('/static/metadata.json')
        .then(response => {
          this.record = response.data.filter(function (d) { return d.short === v })[0]
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  watch: {
    'short': 'fetchData'
  }
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style media="screen">
#method {
  margin-top: 2em;
}
</style>
