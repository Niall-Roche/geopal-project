<template>
  <div>
    <transition name="slide">
      <div class="tbl" v-show="capturedMarkers.length > 0">
        <table class="fixed_header">
          <thead>
            <tr>
              <th>Address</th>
              <th>Lat</th>
              <th>Lang</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="marker in capturedMarkers" :key="marker.id">
              <td>{{ marker.title }}</td>
              <td>{{ marker.position.lat() }}</td>
              <td>{{ marker.position.lng() }}</td>
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
  props: {
    capturedMarkers: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tbl {
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
