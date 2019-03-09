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
      map: null,
      drawingManager: null,
      rectangle: null,
      clicked: false,
      rectCoordinates: {
        north: null,
        west: null,
        south: null,
        east: null
      }
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
      }
      // Loading the drawing Tool in the Map.
      vm.drawingManager.setMap(vm.map);
    },
    /*
    * Method that will create an array of map markers from the results of a given input file
    */
    createMarkersFromInput(input) {
      const vm = this;
      const markerClickHandler = (marker) => {
        marker.infowindow.open(vm.map, marker);
      };
      vm.markers = input
        .map((location) => {
          const marker = new vm.google.maps.Marker({
            position: location.position,
            map: vm.map,
            title: location.title
          });


          const contentString = `<div id="content">
                                  <div id="siteNotice">
                                  </div>
                                  <h1 id="firstHeading" class="firstHeading">${location.title}</h1>
                                  <div id="bodyContent">
                                    ${location.info}
                                  </div>
                                 </div>`;

          marker.infowindow = new vm.google.maps.InfoWindow({
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
      this.markers.map(marker => marker.setMap(null));
      this.markers = [];
    },

    clearDownRectangle() {
      if (this.rectangle) {
        this.rectangle.setMap(null);
        this.rectangle = [];
      }
    },

    drawRect(coordinates) {
      this.rectangle = new this.google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.map,
        bounds: { ...coordinates }
      });
    }

  },
  watch: {

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
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);
      const drawingManager = new google.maps.drawing.DrawingManager();

      geocoder.geocode({ address: 'Dublin' }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      // Setting options for the Drawing Tool. In our case, enabling Polygon shape.
      drawingManager.setOptions({
        drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.RECTANGLE]
        },
        rectangleOptions: {
          strokeColor: '#6c6c6c',
          strokeWeight: 3.5,
          fillColor: '#926239',
          fillOpacity: 0.6
        }
      });

      drawingManager.setOptions({
        drawingControl: false
      });

      google.maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
        this.rectangle = rectangle;
        this.$emit('onLasso');
      });

      this.google = google;
      this.geocoder = geocoder;
      this.map = map;
      this.drawingManager = drawingManager;
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
