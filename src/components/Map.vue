<template>
  <div class="map"/>
</template>

<script>

export default {
  name: 'geoPalMap',
  data() {
    return {
      capturedMarkers: [],
      geocoder: null,
      drawingManager: null,
      places: null,
      rectangle: null,
      allowMove: false,
      currentLocation: null
    };
  },
  props: {
    locations: Array,
    lasso: Boolean
  },
  methods: {
    /*
    * Handle File input
    */
    handleInput(input) {
      const vm = this;
      vm.allowMove = true;
      input.forEach((location) => {
        vm.currentLocation = location;
        vm.geoCoder();
      });
    },

    /*
    * Trigger the lasso
    */
    triggerLasso() {
      const vm = this;
      // Clear the lasso if one exists
      vm.clearLasso();
      // Loading the drawing Tool in the Map.
      vm.drawingManager.setMap(vm.$map);
    },

    /*
    * Checks vm.currentLocation
    * position -> geocoder.geocode
    * address -> geocoder.geocode
    * placeId -> places.getDetails
    */
    geoCoder() {
      const vm = this;
      if (vm.currentLocation.position) {
        vm.geocoder.geocode({
          location: vm.currentLocation.position
        }, (results, status) => vm.handleGeocodeResults(results, status));
      } else if (vm.currentLocation.address) {
        vm.geocoder.geocode({
          address: vm.currentLocation.address
        }, (results, status) => vm.handleGeocodeResults(results, status));
      } else if (vm.currentLocation.placeId) {
        vm.places.getDetails({
          placeId: vm.currentLocation.placeId
        }, (place, sts) => vm.handlePlacesResults(place, sts));
      } else {
        alert('Invalid Input File');
      }
    },

    /*
    * Geocode result handler.
    * Checks for Over query limit and runs a set timeout if found.
    * This will rerun the geoCode method again.
    * Will return results when over 10 in input file but not 100%.
    * Not the most elegant solution.
    */
    handleGeocodeResults(results, status) {
      const vm = this;

      if (status !== 'OK' || !results[0]) {
        if (status === 'OVER_QUERY_LIMIT') {
          setTimeout(() => {
            vm.geoCoder();
          }, 1000);
        } else {
          throw new Error(status);
        }
      } else {
        vm.places.getDetails({
          placeId: results[0].place_id
        }, (place, sts) => { vm.handlePlacesResults(place, sts); });
      }
    },

    /*
    * Create a marker using place info.
    */
    handlePlacesResults(place, status) {
      const vm = this;
      const markerClickHandler = (marker) => {
        marker.infowindow.open(vm.$map, marker);
      };
      if (status === vm.$google.maps.places.PlacesServiceStatus.OK) {
        const marker = new vm.$google.maps.Marker({
          position: place.geometry.location,
          map: vm.$map,
          title: place.formatted_address,
          icon: {
            url: vm.$markerColors.red.url
          }
        });

        marker.infowindow = new vm.$google.maps.InfoWindow({
          content: place.adr_address
        });

        marker.addListener('click', () => markerClickHandler(marker));
        vm.$markers.push(marker);

        if (vm.allowMove) {
          vm.allowMove = false;
          vm.$map.setCenter(place.geometry.location);
          vm.$map.fitBounds(place.geometry.viewport);
          vm.$map.setZoom(9);
        }
      }
    },

    /*
    * Method that will clear any current map markers from the markers array
    */
    clearDownMarkers() {
      this.$markers.map(marker => marker.setMap(null));
      this.$markers = [];
    },

    /*
    * Clear currently drawn lasso. Will also clear any captured markers.
    */
    clearLasso() {
      const vm = this;
      if (vm.rectangle) {
        vm.rectangle.setMap(null);
        vm.rectangle = null;
        vm.capturedMarkers = [];
      }
    },

    /*
    * Check for any markers found within the lasso bounds
    */
    checkMarkers() {
      const vm = this;
      if (vm.$markers.length > 0 && vm.rectangle) {
        vm.capturedMarkers = vm.$markers
          .filter(marker => vm.rectangle.getBounds().contains(marker.getPosition()));
      }
    }

  },
  watch: {

    capturedMarkers(markers) {
      this.$emit('captured', markers);
    },

    lasso(lasso) {
      if (lasso) {
        this.triggerLasso();
      } else {
        this.drawingManager.setMap(null);
      }
    },

    locations(results) {
      const vm = this;
      if (results.length > 0) {
        /* Clear any markers that may exist */
        vm.clearDownMarkers();
        /* Clear lasso if it exists */
        vm.clearLasso();
        /* Create array of markers from file input */
        vm.handleInput(results);
      }
    }

  },
  mounted() {
    try {
      const vm = this;
      /* Register the geocode service */
      vm.geocoder = new vm.$google.maps.Geocoder();
      /* Register the map */
      vm.$map = new vm.$google.maps.Map(this.$el);
      /* Register the drawing service */
      vm.drawingManager = new vm.$google.maps.drawing.DrawingManager();
      /* Register the places service */
      vm.places = new vm.$google.maps.places.PlacesService(vm.$map);

      vm.geocoder.geocode({ address: 'Dublin' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        vm.$map.setCenter(results[0].geometry.location);
        vm.$map.fitBounds(results[0].geometry.viewport);
      });

      // Setting options for the Drawing Tool. In our case, enabling Rectangle shape.
      vm.drawingManager.setOptions({
        drawingMode: vm.$google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
          position: vm.$google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [vm.$google.maps.drawing.OverlayType.RECTANGLE]
        },
        rectangleOptions: {
          strokeColor: '#6c6c6c',
          strokeWeight: 3.5,
          fillColor: '#926239',
          fillOpacity: 0.6
        }
      });

      vm.drawingManager.setOptions({
        drawingControl: false
      });

      vm.$google.maps.event.addListener(vm.drawingManager, 'rectanglecomplete', (rectangle) => {
        this.rectangle = rectangle;
        this.$emit('onLasso');
        this.checkMarkers();
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100vw;
  height: 100vh;
}
</style>
