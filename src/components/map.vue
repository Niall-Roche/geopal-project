<template>
  <div class="map"/>
</template>

<script>
import gmapsInit from '../utils/gmaps';

export default {
  name: 'geoPalMap',
  data() {
    return {
      markers: [],
      google: null,
      geocoder: null,
      map: null
    }
  },
  props: {
    locations: Array
  },
  watch: {
    locations(results) {
      const vm = this;
      if (results.length > 0) {
        const markerClickHandler = (marker) => {
          marker.infowindow.open(vm.map, marker);
        }

        vm.markers = results
                       .map((location) => {
                          const marker = new google.maps.Marker({
                            position: location.position,
                            map: vm.map,
                            title: location.title
                          });

                          const contentString = '<div id="content">'+
                                                  '<div id="siteNotice">'+
                                                  '</div>'+
                                                  '<h1 id="firstHeading" class="firstHeading">'+location.title+'</h1>'+
                                                  '<div id="bodyContent">'+
                                                    location.info
                                                  '</div>'+
                                                '</div>';
                                                
                          marker.infowindow = new google.maps.InfoWindow({
                            content: contentString
                          });

                          marker.addListener('click', () => markerClickHandler(marker));
                          return marker;
                       });
      }
    }
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
      });
      this.google = google;
      this.geocoder = geocoder;
      this.map = map;
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
