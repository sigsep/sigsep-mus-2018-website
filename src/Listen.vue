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
            <label class="label">Select Method</label>
          </div>
          <div class="control">
            <span class="select">
              <select v-model="selectedMethod">
                <option v-for="method in availableMethods" v-bind:value="method.name" v-bind:key="method.name">
                  {{ method.name }}
                </option>
              </select>
            </span>
          </div>
        </div>
    </div>
    <transition name="slide-fade">
      <div v-if="tracklist.length > 0">
          <div class="container">
            <player :urls="tracklist" :title="selectedTrack" :method='method'></player>
        </div>
      </div>
    </transition>
    <method v-if="!embed" :short='selectedMethod'></method>
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
      selectedMethod: '-1',
      selectedTrack: '',
      isLoading: true,
      loaderColor: 'orange',
      loaderHeight: '26px'
    }
  },
  created: function () {
    this.isLoading = true
    this.availableMethods.push(
      {
        'name': 'REF'
      }
    )
    for (let method of headers.methods) {
      this.availableMethods.push(
        {
          'name': method
        }
      )
    }
    this.selectedMethod = this.$route.params.method
    this.selectedTrack = this.$route.params.track
  },
  updated: function () {
    this.isLoading = false
  },
  mounted: function () {
    d3.csv('/static/scores.csv').then((data) => {
      this.data = data
    })
    this.tracks = headers.tracks
  },
  methods: {
    updateMethod: function () {
      this.selectedMethod = this.$route.params.method
    },
    updateTrack: function () {
      this.selectedTrack = this.$route.params.track
    },
    updateURLforMethod: function () {
      this.$router.push({params: {method: this.selectedMethod}})
    },
    updateURLforTrack: function () {
      this.$router.push({params: {track: this.selectedTrack}})
    },
    toggleMode: function (d) {
      this.decompose = !this.decompose
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
    method: function () {
      for (let method of this.availableMethods) {
        if (method.name === this.selectedMethod) {
          return method.name
        }
      }
    },
    tracklist: function () {
      var trackstoload = []
      if (this.$route.params.method === 'REF') {
        trackstoload.push(
          { 'name': 'Mixture',
            'customClass': 'mix',
            'solo': true,
            'mute': true,
            'file': [
              'REF', 'test',
              this.selectedTrack,
              'mixture'
            ].join('/') + '.m4a'
          }
        )

        for (let target of headers.targets) {
          var isAccompaniment
          if (target === 'accompaniment') {
            isAccompaniment = true
          } else {
            isAccompaniment = false
          }
          trackstoload.push({
            'name': target,
            'customClass': target,
            'solo': false,
            'mute': isAccompaniment,
            'file': [
              'REF', 'test',
              this.selectedTrack,
              target
            ].join('/') + '.m4a'
          })
        }
      } else {
        var filterByMethod = this.data.filter(function (d) {
          return (
            d.track_id == headers.tracks.indexOf(this.selectedTrack) &&
            d.method_id == headers.methods.indexOf(this.selectedMethod) &&
            d.metric_id == 2
          )
        }.bind(this))
        if (!filterByMethod.length) {
          return []
        }

        trackstoload.push(
          { 'name': 'Mixture',
            'customClass': 'mix',
            'solo': true,
            'mute': true,
            'file': [
              'REF', 'test',
              this.selectedTrack,
              'mixture'
            ].join('/') + '.m4a'
          }
        )

        for (let track of filterByMethod) {
          if (headers.targets[track.target_id] === 'accompaniment') {
            isAccompaniment = true
          } else {
            isAccompaniment = false
          }
          trackstoload.push(
            { 'name': headers.targets[track.target_id],
              'customClass': headers.targets[track.target_id],
              'solo': false,
              'mute': isAccompaniment,
              'file': [
                headers.methods[track.method_id], 'test',
                this.selectedTrack,
                headers.targets[track.target_id]
              ].join('/') + '.m4a'
            }
          )
        }
      }
      return trackstoload
    }
  },
  watch: {
    '$route.params.method': 'updateMethod',
    '$route.params.track': 'updateTrack',
    'selectedMethod': 'updateURLforMethod',
    'selectedTrack': 'updateURLforTrack'
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
