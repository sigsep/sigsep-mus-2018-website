import * as WaveformPlaylist from 'waveform-playlist'
import headers from '../headers.js'

var Player = function() {
  this.playlist = WaveformPlaylist.init({
    samplesPerPixel: 1260,
    waveHeight: 80,
    container: document.getElementById("playlist"),
    timescale: true,
    mono: true,
    exclSolo: true,
    state: 'cursor',
    colors: {
      waveOutlineColor: '#282828',
      fadeColor: 'black'
    },
    controls: {
      show: true, //whether or not to include the track controls
      width: 160 //width of controls in pixels
    },
    zoomLevels: [1260]
  });
}

Player.prototype.loadTargets = function(trackurls) {
  this.playlist.getEventEmitter().emit('stop')
  this.playlist.tracks = []
  var tracksToLoad = []
  for (let track of trackurls) {
    tracksToLoad.push(
      {
        "src": 'http://sisec18.s3-website.eu-west-3.amazonaws.com/AUDIO/' + track.file,
        "name": track.name,
        "muted": track.mute,
        "customClass": track.customClass,
        "soloed": track.solo,
      }
    );
  }
  this.playlist.load(tracksToLoad);
}

Player.prototype.addTrack = function(track) {
  this.playlist.load([
    {
      "src": 'http://sisec18.s3-website.eu-west-3.amazonaws.com/AUDIO/' + track.file,
      "name": track.name,
      "muted": track.mute,
      "customClass": track.customClass,
      "soloed": track.solo,
    }
  ])
}

export default Player
