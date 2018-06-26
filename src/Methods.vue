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
            <span class="icon has-text-info">
              <i class="fa fa-info-circle"></i>
            </span>
          </th>
          <th>Additional Training</th>
          <th>Code/Website</th>
        </tr>
      </thead>
      <tbody v-for="record in data" :key="record.short">
      <tr>
        <td>
          <router-link
            active-class="is-primary"
            :to="{ name: 'method', params: { short: record.short}}"
          >{{record.short}}
          </router-link>
        </td>
        <td>{{record.authors}}</td>
        <td>{{record.affiliation}}</td>
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

export default {
  data: function () {
    return {
      data: null
    }
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

<style media="screen">
</style>
