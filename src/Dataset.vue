<template>
  <div class="hero-body">
      <div class="content">
        <section>
          <h1 class="title is-2">The MUSDB18 Dataset</h1>
          <div class="columns">
            <div class="column is-half">
              <a href="https://doi.org/10.5281/zenodo.1117372"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.1117372.svg" alt="DOI"></a>

              <img src="./assets/hero.svg" width="512" alt="Description">
              <a href="https://www.stems-music.com/">
                <img src="./assets/stems.png" width="410" alt="Description" id='ni_logo'>
              </a>

            </div>

            <div class="column">
              The musdb18 is a dataset of 150 full lengths music tracks (~10h duration) of different styles along with their isolated drums, bass, vocals and others stems.
            <p>
              musdb18 contains two subset, one with training data, composed of 100 songs, and a test set composed of 50 songs. Supervised approaches should be trained on the training set and tested on both sets.
            </p>
            <p>
              All files from the musdb18 dataset are encoded in the Native Instruments stems format (.mp4). It is a multitrack format composed of 5 stereo streams, each one encoded in AAC @256kbps. These signals correspond to:
            </p>
            <ul>
              <li>Mixture</li>
              <li>Drums</li>
              <li>Bass</li>
              <li>Other (rest of the accompaniment)</li>
              <li>Vocals</li>
            </ul>
              <br/>
                <div class="block">
                  <a href="https://sigsep.github.io/datasets/musdb.html" class="button is-danger is-outlined">MUSDB18 Dataset Website</a>
                </div>
                <br/>
            </div>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
import bulma from 'bulma/css/bulma.css';
import * as Howler from 'howler'

export default {
  data: function() {
    return {
      tracklist: null,
      howlerlist: null,
      howler: Object,
    }
  },
  mounted: function() {
    this.$http.get('/data/tracklist.json').then((response) => { return response.json(); }).then((json) => { this.tracklist = json; });
    this.$http.get('/data/howler.json').then((response) => { return response.json(); }).then((json) => { this.howlerlist = json; });
  },
  methods: {
    play: function(id) {
      this.howler.fade(0, 1, 300).play(id)
    },
    stop: function() {
      this.howler.stop()
    }
  },
  computed: {
    sprites: function() {
      var tmp = {};
      for (let i in this.howlerlist) {
        let track = this.howlerlist[i];
        tmp[track.id.toString()] = track.pos;
      }
      return tmp
    }
  },
  watch: {
    'sprites': function() {
      this.howler = new Howler.Howl({
        preload: true,
        src: ['/data/howler.m4a'],
        sprite: this.sprites
      });
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
.playback:hover {
  color: orange;
}

#ni_logo {
  margin-left: 1em;
}
</style>
