<template>
    <div class="upload-btn-wrapper">
      <button @click="$refs.file.click()" class="btn">Upload a file</button>
      <input type="file" ref="file" name="myfile" @change="onFileChange"/>
    </div>
</template>

<script>
export default {
  name: 'FileUpload',
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createData(files[0]);
    },
    createData(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.$emit('onLoad', JSON.parse(e.target.result));
      };
      reader.readAsText(file);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.upload-btn-wrapper {
  overflow: hidden;
  display: inline-block;
}

.upload-btn-wrapper input[type=file] {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}

input {
  width: 100%;
  height: 100%;
}

</style>
