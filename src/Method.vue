<template>
  <div id='method'>
    <section>
       <div>
         Render Markdown here
       </div>
 </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      data: null,
      record: null
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
  created: function () {
    this.fetchData(this.short)
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

<style media="screen">
#method {
  margin-top: 2em;
}
</style>
