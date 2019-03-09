<template>
  <div id="App">
    <geoPalMap
      v-bind:locations="locations"
      v-bind:lasso="lasso"
      @onLasso="lasso=!lasso"
      @captured="onCaptured($event)">
    </geoPalMap>
    <div class="buttons">
      <FileUpload @onLoad="onLoad($event)"></FileUpload>
      <div class="wrapper">
        <button class="btn"
                @click="lasso=!lasso">
                Lasso
        </button>
      </div>
      <div class="wrapper">
        <button class="btn"
                @click="colorPickerToggle=capturedMarkers.length>0">
                Change Icon Color
        </button>
      </div>
    </div>
    <CapturedDetails v-bind:capturedMarkers="capturedMarkers"></CapturedDetails>
    <ColorPicker v-bind:toggled="colorPickerToggle"
                 @changeColor="changeMarkers($event)">
    </ColorPicker>
  </div>
</template>

<script>
import geoPalMap from './components/Map.vue';
import FileUpload from './components/FileUpload.vue';
import CapturedDetails from './components/CapturedDetails.vue';
import ColorPicker from './components/ColorPicker.vue';

export default {
  name: 'App',
  components: {
    geoPalMap,
    FileUpload,
    CapturedDetails,
    ColorPicker
  },
  data() {
    return {
      locations: [],
      lasso: false,
      colorPickerToggle: false,
      capturedMarkers: []
    };
  },
  methods: {

    changeMarkers($event) {
      const url = $event;
      this.capturedMarkers.map(marker => marker.setIcon({ url }));
    },

    onLoad($event) {
      this.locations = $event;
    },

    onCaptured($event) {
      this.capturedMarkers = $event;
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

#App {
  width: 100vw;
  height: 100vh;
}

a.menu {
  padding: 10px;
  background-color: #2E2E3A;
  color: #fefefe;
  text-decoration: none;
  margin-top: 15px;
  box-shadow: 0px 0px 0px #888888;
  opacity: 1;
  transition: box-shadow .5s, opacity .5s;
  border-radius: 5px;
}

a.menu:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #888888;
  opacity: 0.7;
}

.buttons {
    position: fixed;
    top: 100px;
    right: 50px;
    z-index: 1;
    display: inline-grid;
    text-align: center;
}

.btn {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
  transition: background-color .5s, color .5s, border-color .5s;
}

.btn:hover {
  cursor: pointer;
  background-color: gray;
  color: white;
  border-color: white;
}

.btn:focus {
  outline: none;
}
</style>
