<template>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-mobile">
          <h1 class="title is-2">
            Demixing Professionally Produced Music
          </h1>
          <figure class="image">
            <img src="./assets/hero_header.svg" alt="Description">
          </figure>
          <h2 class="subtitle is-5">
              This website aims to introduce state-of-the-art algorithms in
              audio source separation.
              Here we present the <strong>Music (MUS)</strong> task of the <strong>sixth
              community-based Signal Separation Evaluation Campaign (SiSEC 2018)</strong>.
              We show both, objective and subjective results of 50 full-track songs of
              different styles separated into five components: <strong>vocals, accompaniment, drums, bass and other</strong>.
          </h2>
          <br>
              <router-link class="button is-large is-primary" :to="{ path: '/listen/REF'}">
                  <span class="icon">
                      <i class="fa fa-volume-up"></i>
                  </span>
                  <span>Listen to Separation Results</span>
              </router-link>
              <a class="button is-large is-info" href="https://arxiv.org/abs/1804.06267">
                  <span class="icon">
                      <i class="fa fa-book"></i>
                  </span>
                  <span>
                        LVA/ICA Paper
                  </span>
              </a>

        </div>
      </div>
    </div>
</template>

<script>

export default {
    methods: {
        getRandomNumber: function() {
            var min = 1
            var max = 100
            return Math.floor(Math.random() * (max -min +1)) + min;
        },
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
