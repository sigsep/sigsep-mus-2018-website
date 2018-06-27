<template>
  <section>
    <h1 id='title' class="title is-2">Submitted Methods</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Method</th>
          <th>Authors</th>
          <th>Affiliation</th>
          <th>Blind
          </th>
          <th><abbr title="Additional Training Data">Add. Data</abbr></th>
          <th>Code/Website</th>
        </tr>
      </thead>
      <tbody v-for="record in data" :key="record.short">
      <tr>
        <td>
          <router-link class="button is-small"
            active-class="is-primary"
            :to="{ name: 'method', params: { short: record.short}}"
          ><span class="icon" v-if="record.is_oracle">
              <i class="fa fa-magic"></i>
            </span>
            {{record.short}}
          </router-link>
        </td>
        <td>{{record.authors | truncate(40) }}</td>
        <td>{{record.affiliation | truncate(40)}}</td>
        <td>
          <span class="icon" v-if="record.is_blind">
            <i class="fa fa-check"></i>
          </span>
        </td>
        <td>
          <span class="icon" v-if="record.add_data">
            <i class="fa fa-check"></i>
          </span>
        </td>
        <td>
          <p class="buttons has-addons">
            <a class="button is-small is-success" v-if="record.code" :href="record.code">
              <span class="icon">
                <i v-bind:class="gh(record.code) ? 'fa fa-github' : 'fa fa-code' "></i>
              </span>
            </a>
            <a class="button is-small is-info" v-if="record.website" :href="record.website">
              <span class="icon">
                <i class="fa fa-eye"></i>
              </span>
            </a>
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from 'axios'
import fontawesome from 'font-awesome/css/font-awesome.min.css'

export default {
  data: function () {
    return {
      data: null
    }
  },
  filters: {
    truncate: function (string, value) {
      if (string.length >= value) {
        return string.substring(0, value) + '...'
      } else {
        return string
      }
    }
  },
  mounted: function () {
    axios.get('/static/metadata.json')
      .then(response => {
        this.data = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    gh: function (string) {
      return string.includes('github.com')
    }
  }
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style media="screen">
</style>
