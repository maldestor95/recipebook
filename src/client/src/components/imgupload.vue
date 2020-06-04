<template>
  <div>

    <form enctype="multipart/form-data">
      <input
        type="file"
        name="uploadImgName"
        @change="filesChange($event.target.name, $event.target.files)"
        accept="image/*"
      />
    </form>
    <ul id="fileList">
      <li>{{name}}</li>
      <li>{{files}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      name: "",
      files: []
    };
  },
  methods: {
    filesChange(name, files) {
      this.name = name;
      
for (let i = 0; i < files.length; i++) {
      const fileList = document.getElementById("fileList");
      const li = document.createElement("li");
      fileList.appendChild(li);
      
      const img = document.createElement("img");
      img.src = URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function() {
        URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      const info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      li.appendChild(info);
    }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>