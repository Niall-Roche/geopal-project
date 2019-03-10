<template>
  <div>
    <transition name="slide">
      <div class="color-picker" v-show="toggled">
          <span>Select a Color: </span>
          <button @click="$emit('close')" class="close">&times;</button>
          <select ref="select" id="color-select">
            <option :value="color.url" v-for="color in $markerColors" :key="color.id">
              {{ color.text | capitalize }}
            </option>
          </select>
          <button class="btn"
                  @click="$emit('changeColor', $refs.select.value)">
                  Change Color
          </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'CapturedDetails',
  props: {
    toggled: Boolean
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-picker {
  width: 250px;
  height: 140px;
  position: fixed;
  top: 300px;
  right: 30px;
  z-index: 1;
  text-align: center;
  background-color: #2F323A;
  border-radius: 5px;
}

.color-picker span {
  color: #fefefe;
}

select#color-select {
   -webkit-appearance: button;
   -webkit-border-radius: 2px;
   -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
   -webkit-padding-end: 20px;
   -webkit-padding-start: 2px;
   -webkit-user-select: none;
   background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);
   background-position: 97% center;
   background-repeat: no-repeat;
   border: 1px solid #AAA;
   color: #555;
   font-size: inherit;
   margin-top: 5px;
   overflow: hidden;
   padding: 5px 10px;
   text-overflow: ellipsis;
   white-space: nowrap;
   width: 200px;
}

.slide-enter-active, .slide-leave-active {
  transition: right .5s;
}

.slide-enter, .slide-leave-to {
  right: -280px;
}
</style>
