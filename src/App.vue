<template>
  <div id="App">
    <geoPalMap v-bind:locations="locations"></geoPalMap>
    <div class="buttons">
      <a class="menu" id="upload" href="#">Upload GeoJson File</a>
      <a class="menu" id="lasso" href="#">Lasso</a>
      <a class="menu" id="change" href="#">Change Icon Color</a>
    </div>
  </div>
</template>

<script>
import geoPalMap from './components/map.vue'

export default {
  name: 'App',
  components: {
    geoPalMap
  },
  data() {
    return {
      locations: [{
        position: {
          lat: 53.3244431,
          lng: -6.3857856
        },
      },
      {
        position: {
          lat: 53.3244431,
          lng: -6.4057856
        },
      }]
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
  padding: 10px;;
  background-color: #2E2E3A;
  color: #fefefe;
  text-decoration: none;
  margin-top: 15px;
  box-shadow: 0px 0px 0px #888888;
  opacity: 1;
  transition: box-shadow .5s, opacity .5s;
}

a.menu:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #888888;
  opacity: 0.7;
}

.buttons {
    position: fixed;
    top: 100px;
    margin-left: 90%;
    z-index: 1;
    display: inline-grid;
    text-align: center;
}
</style>
