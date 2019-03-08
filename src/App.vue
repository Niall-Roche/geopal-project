<template>
  <div id="App">
    <geoPalMap v-bind:locations="locations"></geoPalMap>
    <div class="buttons">
      <FileUpload @onLoad="onLoad($event)"></FileUpload>
      <div class="wrapper">
        <button class="btn">Lasso</button>
      </div>
      <div class="wrapper">
        <button class="btn">Change Icon Color</button>
      </div>
    </div>
  </div>
</template>

<script>
import geoPalMap from './components/Map.vue'
import FileUpload from './components/FileUpload.vue'
// import json from './utils/locations.json'

export default {
  name: 'App',
  components: {
    geoPalMap,
    FileUpload
  },
  data() {
    return {
      locations: []
    }
  },
  methods: {
    onLoad($event) {
      this.locations = $event;
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
    margin-left: 88%;
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
}
</style>
