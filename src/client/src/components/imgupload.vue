<template>
  <div>
    <v-container>
      <v-row>
        <form enctype="multipart/form-data">
          <input
            type="file"
            name="uploadImgName"
            @change="filesChange($event.target.name, $event.target.files)"
            accept="image/*"
          />
        </form>
      </v-row>
      <v-dialog
        v-model="dialogEdit"
        scrollable fullscreen 
        persistent 
        max-width="500px"
        transition="dialog-transition"
        v-if="originSrc"
      >
        <template v-slot:activator="{ on, attrs }">
          <img :src="originSrc" alt="original image" class="originsrc"/>
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Resize
        </v-btn>
      </template>
      <v-card>
        <img-edit :originSrc="originSrc" @saveModifiedCanvas="save($event)" @cancel="dialogEdit=false"></img-edit>
      </v-card>
      </v-dialog>
      
    </v-container>
  </div>
</template>

<script>
/**
 * Edit input image for croping and size reduction
   * @vue-prop {String} pictureName - Path to source image  (\\img src="xxx"`)
   * @vue-event {DataUrl} saveModifiedCanvas - Emit the final canvas as a DataUrl
   * @vue-event {null} cancel - Emit if cancel   
   */
import imgEdit from "./imgedit";
export default {
  components: {
    imgEdit
  },
  props: {
    pictureName: {
      type: String,
      default: null,
      required:true
    },
  },
  data() {
    return {
      name: "",
      files: [],
      originSrc: null,
      originFileSize: null,
      originFileName: null,
      dialogEdit:false,
    
    };
  },
  methods: {
    filesChange(name, files) {
      this.name = name;
      URL.revokeObjectURL(this.originSrc);

      this.originSrc = URL.createObjectURL(files[0]);

      this.originFileName = files[0].name;
      this.originFileSize = files[0].size + " bytes";
    },

    save(data) {
      // let ctx = document.getElementById("destcanvas");

      // this.imageURI = ctx.toDataURL("image/jpeg", 1);
      // this.$emit("saveModifiedCanvas", ctx);

      // this.finalFileName = "thumb" + this.originFileName;
      // this.finalFileSize = this.imageURI.length + " bytes";
      // this.saved = true;
     this.originSrc=data
    //  .toDataUrl("image/jpeg", 1)
     this.resize=false
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  margin: auto;
}
.originsrc {
  max-width: 100%;
}

#miresetup,
#fileSelect {
  width: 300px;
}
.activebtn {
  color: blue;
}
.menu {
  max-width: 30px;
  margin: 10px;
  padding: 0px;
  border: red solid;
}
</style>