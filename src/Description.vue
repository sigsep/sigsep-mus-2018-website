<template>
  <div class="content">
    <vue-markdown :source='mdText'></vue-markdown>
  </div>
</template>

<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  data: function () {
    return {
      mdText: ""
    }
  },
  props: ["short"],
  mounted: function () {
    var path = [
      '/static/descriptions', this.short, 'description.md'
    ].join('/')
    axios.get(path)
      .then(response => {
        this.mdText = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";

#method {
  margin-top: 2em;
}
</style>
