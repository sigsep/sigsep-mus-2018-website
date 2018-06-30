<template>
  <section>
      <div v-if="!embed" class="columns is-centered">
        <div class="column is-narrow">
          <div class="control-label">
            <label id='track-label' class="label">Select Track</label>
          </div>
          <p class="control has-addons has-addons-centered">
            <span class="select">
              <select v-model="selectedTrack">
                <option v-for="track in tracks" v-bind:value="track" v-bind:key="track">
                  {{ track }}
                </option>
              </select>
            </span>
          </p>
        </div>
        <div class="column is-narrow">
          <div class="control-label">
            <label class="label">Select Target</label>
          </div>
          <div class="control">
            <span class="select">
              <select v-model="selectedTarget">
                <option v-for="target in availableTargets" v-bind:value="target" v-bind:key="target">
                  {{ target }}
                </option>
              </select>
            </span>
          </div>
        </div>
    </div>
    <transition name="slide-fade">
      <div v-if="tracklist.length > 0">
          <div class="container">
            <player ref="mplayer" :urls="tracklist" :title="selectedTrack"></player>
        </div>
      </div>
    </transition>
    <div class="column is-narrow">
      <div class="control-label">
        <label class="label">Add Method</label>
      </div>
      <div class="control">
        <span class="select">
          <select v-model="selectedMethod">
            <option v-for="method in availableMethods" v-bind:value="method" v-bind:key="method">
              {{ method }}
            </option>
          </select>
        </span>
        <a class="button" @click="addTrack">
          <span class="icon">
            <i class='fa fa-plus'></i>
          </span>
        </a>
        <a class="button" @click="clear">
          <span class="icon is-danger">
            <i class='fa fa-trash'></i>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import * as d3 from 'd3'
import Player from './player/Player.vue'
import Method from './Method.vue'
import headers from './headers.js'

import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  components: {
    Selection, Player, ScaleLoader, Method
  },
  data: function () {
    return {
      data: [],
      tracks: [],
      availableMethods: [],
      availableTargets: [],
      trackstoload: [],
      selectedMethod: 'REF',
      selectedTarget: '',
      selectedTrack: 'AM Contra - Heart Peripheral',
      isLoading: true,
      loaderColor: 'orange',
      loaderHeight: '26px'
    }
  },
  created: function () {
    this.isLoading = true
    this.availableTargets = headers.targets
  },
  updated: function () {
    this.isLoading = false
  },
  mounted: function () {
    d3.csv('/static/scores.csv').then((data) => {
      this.data = data
    })
    this.tracks = headers.tracks
    this.updateTarget()
  },
  methods: {
    updateTarget: function () {
      this.selectedTrack = this.$route.params.track
      this.trackstoload = [
        { 'name': 'Mixture',
          'customClass': 'mix',
          'solo': true,
          'mute': true,
          'file': [
            'REF', 'test',
            this.selectedTrack,
            'mixture'
          ].join('/') + '.m4a'
      }]

      this.availableMethods = []
      var filterByTarget = this.data.filter(function(d) {
        return (
          d.track_id == headers.tracks.indexOf(this.selectedTrack) &&
          d.target_id == headers.targets.indexOf(this.selectedTarget) &&
          d.metric_id == 2
        );
      }.bind(this))
      for (let row of filterByTarget) {
        this.availableMethods.push(headers.methods[row.method_id])
      }
      if (!filterByTarget.length) {
        this.trackstoload = []
      } else {
        this.trackstoload.push(
          { 'name': 'GT ' + this.selectedTarget,
            'customClass': 'mix',
            'solo': false,
            'mute': false,
            'file': [
              'REF', 'test',
              this.selectedTrack,
              this.selectedTarget
            ].join('/') + '.m4a'
        })
      }
    },
    addTrack: function () {
      this.$refs.mplayer.addTrack(
        { 'name': this.selectedMethod,
          'customClass': 'mix',
          'solo': false,
          'mute': false,
          'file': [
            this.selectedMethod, 'test',
            this.selectedTrack,
            this.selectedTarget
          ].join('/') + '.m4a'
        }
      )
    },
    clear: function () {
      this.updateTarget()
    },
    updateURLforTrack: function () {
      this.$router.push({params: {track: this.selectedTrack}})
    }
  },
  computed: {
    embed: function () {
      if (this.$route.query.mode === 'embed') {
        return true
      } else {
        return false
      }
    },
    tracklist: function () {
      return this.trackstoload
    }
  },
  watch: {
    '$route.params.track': 'updateTarget',
    'selectedTrack': 'updateURLforTrack',
    'selectedTarget': 'updateTarget'
  }
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style>
#title {
  margin-top: 20px;
}

#d3container {
  margin-top: -1em;
}

.hide {
  opacity: 0;
}

text.method_label.active {
  fill: orange;
}

.grid text.track_label.active {
  fill: red;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  opacity: 0;
}

</style>
