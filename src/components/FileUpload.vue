<template>
    <div class="upload-btn-wrapper">
      <button class="btn">Upload a file</button>
      <input type="file" name="myfile" @change="onFileChange"/>
    </div>
</template>

<script>
  export default {
    name: 'FileUpload',
    data: {
      image: ''
    },
    methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createData(files[0]);
      },
      createData(file) {
        var reader = new FileReader();

        reader.onload = (e) => {
          const result = JSON.parse(e.target.result);
          this.$emit('onLoad', result);
        };
        reader.readAsText(file);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.upload-btn-wrapper {
  overflow: hidden;
  display: inline-block;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

input {
  width: 100%;
  height: 100%;
}

input:hover {
  cursor: pointer;
}

</style>
