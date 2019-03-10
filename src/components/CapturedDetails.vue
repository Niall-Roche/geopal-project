<template>
  <div>
    <button class="btn grid-pos"
            v-show="!showGrid && capturedMarkers.length > 0"
            @click="showGrid=!showGrid">
      Show Grid
    </button>
    <transition name="slide">
      <div class="grid-pos" v-show="showGrid && capturedMarkers.length > 0">
        <table class="fixed_header">
          <thead>
            <tr>
              <th>Address</th>
              <th class="position">Lat</th>
              <th class="position">
                Lang
                <button @click="showGrid=!showGrid" class="close">&times;</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="marker in capturedMarkers" :key="marker.id">
              <td>{{ marker.title }}</td>
              <td class="position">{{ marker.position.lat().toString().substr(0,12) }}</td>
              <td class="position">{{ marker.position.lng().toString().substr(0,12) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CapturedDetails',
  data() {
    return {
      showGrid: true
    };
  },
  props: {
    capturedMarkers: Array
  },
  watch: {
    capturedMarkers(val) {
      if (val.length === 0) {
        this.showGrid = false;
      } else {
        this.showGrid = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-pos {
  position: absolute;
  bottom: 50px;
  z-index: 10;
  margin-left: 5%;
}

.fixed_header{
    table-layout: fixed;
    border-collapse: collapse;
}

.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
  max-height: 200px;
}

.fixed_header thead tr {
   display: block;
}

.fixed_header thead {
  background: #374B4A;
  color:#fff;
}

.fixed_header th, .fixed_header td {
  padding: 5px;
  text-align: left;
  width: 200px;
}

.fixed_header td {
  font-size: 12px;
}

.fixed_header th.position, .fixed_header td.position {
  width: 100px;
}

tbody > tr {
  background-color: #8B8BAE;
}

tbody > tr:nth-child(even) {
  background-color: #f2f2f2;
}

.slide-enter-active, .slide-leave-active {
  transition: bottom .5s;
}

.slide-enter, .slide-leave-to {
  bottom: -500px;
}
</style>
