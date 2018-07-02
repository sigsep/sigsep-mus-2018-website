<template>
  <section>
    <h1 class="title is-2">Objective Evaluation Results</h1>
    <div class="content">
      The participants were asked to provide estimates for the separated targets
      for all mixtures. The quality of these estimates was then evaluated by
      comparison with the true source images using four objective
      performance criteria. For more information about the evaluation metrics see or python based evaluation tool <a href='https://sigsep.github.io/sigsep-mus-eval/museval.metrics.html'>BSSeval v4</a>.
    </div>
    <div class="notification">
      The <b>heatmap</b> below shows the result for each audio track and each submitted method.
      You can use the selections below the heatmap to filter the results by <b>target source</b>, <b>metric</b>.
      </p></p>
        You can click on each rectangle to open the multitrack player. For details about the selected method, click on the "Show Details" button below the player.
    </div>

      <span><scale-loader :color="loaderColor" :size="loaderHeight" :loading="isLoading"></scale-loader></span>
      <div id="d3container" v-bind:class="{ 'hide': isLoading }" data-balloon="Click on any square to start playback" data-balloon-pos="top" >
        <svg id='heatmap'width="900" height="300"></svg>
        <div id='tracktip'></div>
        <div id='tracklabeltip'></div>
        <div id='methodtip'></div>
        <div id='tracktiph'></div>
        <div id='methodtiph'></div>
      </div>
      <map-menu></map-menu>
    <transition name="slide-fade">
      <div v-if="tracklist.length > 0">
          <div class="container">
            <player :urls="tracklist" :title="title"></player>
          </div>
          <div class='column has-text-right'>
            <router-link class='button is-info' :to="{ name: 'unmix', params: { track: this.tracks[this.$route.params.track_id], method: this.$route.params.method }}">
              Open in Separate Player
            </router-link>
            <router-link class='button is-info' :to="{ name: 'compare', params: { track: this.tracks[this.$route.params.track_id], method: this.$route.params.method }}">
              Compare Methods
            </router-link>
          </div>
      </div>
    </transition>
    <div class="content">

      <h2>Further Results</h2>
      <div class="buttons">
        <a href="https://github.com/sigsep/sigsep-mus-2018" class="button">Download Objective Scores</a>
        <a href="https://doi.org/10.5281/zenodo.1256003" class="button">Download Audio Submissions</a>
      </div>

    </div>
  </div>

  </section>

</template>

<script>
import * as d3 from 'd3'
import MapMenu from './Menu.vue'
import Player from '../player/Player.vue'
import plot from './heatmap.js'
import headers from '../headers.js'
import balloon from 'balloon-css/balloon.css';
import axios from 'axios'

import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  components: {
    MapMenu, Player, ScaleLoader
  },
  data: function() {
    return {
      data: [],
      isLoading: true,
      loaderColor: 'orange',
      loaderHeight: '26px',
      tracks: []
    }
  },
  created: function() {
    this.isLoading = true;
  },
  beforeUpdate: function() {
    this.isLoading = false;
  },
  mounted: function() {
    plot.setRoute(
        this.$route.params.target,
        this.$route.params.metric,
        this.$route.params.track_id,
        this.$route.params.method
    );

    plot.init()

    d3.csv("/static/scores.csv").then((data) => {
      this.data = data
      this.update()
    })

    this.tracks = headers.tracks
  },
  methods: {
    update: function() {
      plot.setRoute(
          this.$route.params.target,
          this.$route.params.metric,
          this.$route.params.track_id,
          this.$route.params.method
      );
      plot.update(this.subset);
    },
  },
  computed: {
    title: function() {
      return this.tracks[this.$route.params.track_id]
    },
    subset: function() {
      return this.data.filter(function(d) {
        return (
          d.target_id == headers.targets.indexOf(this.$route.params.target) &&
          d.metric_id == headers.metrics.indexOf(this.$route.params.metric)
        );
      }.bind(this));
    },
    tracklist: function() {

      var trackstoload = []

      if (this.$route.params.method == 'REF') {
        trackstoload.push(
          { 'name': 'Mixture',
            'customClass': 'mix',
            'solo': true,
            'mute': true,
            'file': [
              'REF', 'test',
              this.tracks[this.$route.params.track_id],
              'mixture'
            ].join("/") + '.m4a'
          }
        );

        for (let target of headers.targets) {
          var isAccompaniment
          if(target == 'accompaniment') {
            isAccompaniment = true
          } else {
            isAccompaniment = false
          }
          trackstoload.push(
            { 'name': target,
              'customClass': target,
              'solo': target == this.$route.params.target,
              'mute': isAccompaniment,
              'file': [
                'REF', 'test',
                this.tracks[this.$route.params.track_id],
                target
              ].join("/") + '.m4a'
            }
          );
        }
        return trackstoload;
      }

      var filterByMethod = this.data.filter(function(d) {
        return (
          d.track_id == this.$route.params.track_id &&
          d.method_id == headers.methods.indexOf(this.$route.params.method) &&
          d.metric_id == headers.metrics.indexOf(this.$route.params.metric)
        );
      }.bind(this));

      var filterByTarget = this.data.filter(function(d) {
        return (
          d.track_id == this.$route.params.track_id &&
          d.target_id == headers.targets.indexOf(this.$route.params.target) &&
          d.metric_id == headers.metrics.indexOf(this.$route.params.metric)
        );
      }.bind(this));

      if(this.$route.params.track_id == null || !filterByMethod.length) {
        return [];
      }

      this.availableMethods = []
      for (let track of filterByTarget) {
        this.availableMethods.push(
          {
            'name': headers.methods[track.method_id],
            'customClass': track.method_id
          }
        );
      }

        trackstoload.push(
          { 'name': 'Mixture',
            'customClass': 'mix',
            'solo': true,
            'mute': true,
            'file': [
              'REF', 'test',
              this.tracks[this.$route.params.track_id],
              'mixture'
            ].join('/') + '.m4a'
          }
        );

        for (let track of filterByMethod) {
          var isAccompaniment
          if(headers.targets[track.target_id] == 'accompaniment') {
            isAccompaniment = true
          } else {
            isAccompaniment = false
          }
          trackstoload.push(
            { 'name': headers.targets[track.target_id],
              'customClass': headers.targets[track.target_id],
              'solo': track.target_id == this.$route.params.target_id,
              'mute': isAccompaniment,
              'file': [
                headers.methods[track.method_id], 'test',
                this.tracks[this.$route.params.track_id],
                headers.targets[track.target_id]
              ].join("/") + '.m4a'
            }
          );
        }
      return trackstoload;
    }
  },
  watch: {
    '$route.params.target': 'update',
    '$route.params.metric': 'update',
    '$route.params.method' : 'update',
    '$route.params.track_id' : 'update'
  }
}
</script>

<style lang="scss">
@import "~bulmaswatch/darkly/_variables.scss";
@import "~bulma";
@import "~bulmaswatch/darkly/_overrides.scss";
</style>

<style>

#d3container {
  margin-top: 0px;
}

.hide {
  opacity: 0;
}

#tracktiph {
    position: absolute;
    text-align: center;
    width: 0px;
    height: 100px;
    padding: 2px;
    opacity: 0;
    font: 12px sans-serif;
    background-color: transparent;
    border-left: 1px solid white;
    border-right: 1px solid white;
    pointer-events: none;
}

#methodtiph {
    position: absolute;
    text-align: center;
    width: 0px;
    height: 100px;
    padding: 2px;
    opacity: 0;
    background-color: transparent;
    font: 12px sans-serif;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    pointer-events: none;
}

#tracktip {
    position: absolute;
    text-align: center;
    width: 0px;
    height: 100px;
    padding: 2px;
    opacity: 0;
    font: 12px sans-serif;
    background-color: transparent;
    border-left: 2px solid #00d1b2;
    border-right: 2px solid #00d1b2;
    pointer-events: none;
}

#tracklabeltip {
    position: absolute;
    z-index: 1000;
    text-align: left;
    height: 10px;
    top: 2.5em;
    margin-left: 50px;
    padding: 0px;
    font: 12px sans-serif;
    color: white;
    pointer-events: none;
}

#methodtip {
    position: absolute;
    text-align: center;
    width: 0px;
    height: 100px;
    opacity: 0;
    padding: 2px;
    background-color: transparent;
    font: 12px sans-serif;
    border-top: 2px solid #00d1b2;
    border-bottom: 2px solid #00d1b2;
    pointer-events: none;
}


.axisWhite line{
  stroke: white;
}

.axisWhite path{
  stroke: white;
}

.axisWhite text{
  fill: white;
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
