<template>
  <div>
    <transition name="slide">
      <div class="color-picker" v-show="toggled">
          <span>Select a Color: </span>
          <input type="color" name="favcolor" :value="value" @change="onChange($event)">
          <button class="btn" @click="$emit('changeColor', value)">Change Color</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CapturedDetails',
  data() {
    return {
      value: '#FF0000'
    };
  },
  props: {
    toggled: Boolean
  },
  methods: {
    onChange($event) {
      this.value = $event.target.value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-picker {
  width: 200px;
  height: 125px;
  position: fixed;
  top: 300px;
  margin-left: 88%;
  z-index: 1;
  text-align: center;
  background-color: #2F323A;
  border-radius: 5px;
}

.color-picker span {
  color: #fefefe;
}

.color-picker input{
  margin-top: 15px;
}

.slide-enter-active, .slide-leave-active {
  transition: margin-left .5s;
}

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  margin-left: 100%;
}
</style>
