<template>
  <div class="map"/>
</template>

<script>

export default {
  name: 'geoPalMap',
  data() {
    return {
      capturedMarkers: [],
      google: null,
      geocoder: null,
      map: null,
      drawingManager: null,
      rectangle: null,
      clicked: false
    };
  },
  props: {
    locations: Array,
    lasso: Boolean
  },
  methods: {

    triggerLasso() {
      const vm = this;

      if (vm.rectangle) {
        vm.rectangle.setMap(null);
        vm.rectangle = null;
        vm.capturedMarkers = [];
      }
      // Loading the drawing Tool in the Map.
      vm.drawingManager.setMap(vm.$map);
    },
    /*
    * Method that will create an array of map markers from the results of a given input file
    */
    createMarkersFromInput(input) {
      const vm = this;
      const markerClickHandler = (marker) => {
        marker.infowindow.open(vm.$map, marker);
      };
      vm.$markers = input
        .map((location) => {
          const marker = new vm.$google.maps.Marker({
            position: location.position,
            map: vm.$map,
            title: location.title,
            icon: {
              url: vm.$markerColors.red.url
            }
          });


          const contentString = `<div id="content">
                                  <div id="siteNotice">
                                  </div>
                                  <h1 id="firstHeading" class="firstHeading">${location.title}</h1>
                                  <div id="bodyContent">
                                    ${location.info}
                                  </div>
                                 </div>`;

          marker.infowindow = new vm.$google.maps.InfoWindow({
            content: contentString
          });

          marker.addListener('click', () => markerClickHandler(marker));
          return marker;
        });
    },
    /*
    * Method that will clear any current map markers from the markers array
    */
    clearDownMarkers() {
      this.$markers.map(marker => marker.setMap(null));
      this.$markers = [];
    },

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
        /* Create array of markers from file input */
        vm.createMarkersFromInput(results);
      }
    }

  },
  mounted() {
    try {
      const vm = this;
      vm.geocoder = new vm.$google.maps.Geocoder();
      vm.$map = new vm.$google.maps.Map(this.$el);
      vm.drawingManager = new vm.$google.maps.drawing.DrawingManager();

      vm.geocoder.geocode({ address: 'Dublin' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        vm.$map.setCenter(results[0].geometry.location);
        vm.$map.fitBounds(results[0].geometry.viewport);
      });

      // Setting options for the Drawing Tool. In our case, enabling Polygon shape.
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
