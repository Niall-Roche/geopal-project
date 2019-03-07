<template>
  <div class="map"/>
</template>

<script>
import gmapsInit from '../utils/gmaps';

export default {
  name: 'geoPalMap',
  props: {
    locations: Array
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: 'Dublin' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);

        const markers = this.locations.map(x => new google.maps.Marker({...x, map}));
      });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
