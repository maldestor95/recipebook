<template>
  <div>
    <v-container>
      <v-row v-if="!loaded">
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
        scrollable
        fullscreen
        persistent
        max-width="500px"
        transition="dialog-transition"
        v-if="originSrc"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-container>
            <v-row>
              <img
                :src="originSrc"
                alt="original image"
                class="originsrc"
                id="imguploadPicSrc"
                @load="updateDimension()"
              />
            </v-row>
            <v-row>
              <p>{{picDim.x}}x{{picDim.y}}</p>
              <v-spacer></v-spacer>
              <p>{{originFileSize}} bytes</p>
            </v-row>
            <v-row>
              <v-btn color="warning" @click="applyImage()">Apply</v-btn>
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Resize</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="cancel" @click="cancel()">Cancel</v-btn>
              <v-btn color="cancel" @click="reset()">Reset</v-btn>
            </v-row>
          </v-container>
        </template>
        <v-card>
          <img-edit
            :originSrc="originSrc"
            @saveModifiedCanvas="resize($event)"
            @cancel="dialogEdit=false"
          ></img-edit>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
/**
 * Edit input image for croping and size reduction
 * @vue-prop {String} pictureName - Path to source image  (\\img src="xxx"`)
 * @vue-event {DataUrl} ApplyImage - Emit the final canvas as a DataUrl
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
      required: true
    }
  },
  data() {
    return {
      name: "",
      files: [],
      originSrc: null,
      originFileSize: null,
      originFileName: null,
      dialogEdit: false,
      loaded: false,
      picDim: { x: 0, y: 0 },
      picSize: 0
    };
  },
  methods: {
    filesChange(name, files) {
      this.name = name;
      URL.revokeObjectURL(this.originSrc);

      this.originSrc = URL.createObjectURL(files[0]);
      this.originFileName = files[0].name;
      this.originFileSize = files[0].size;
      this.loaded = true;
    },

    resize(dataUrl) {
      this.originSrc = dataUrl;
      this.dialogEdit = false;
      let _this = this;
      fetch(this.originSrc)
        .then(response => response.blob())
        .then(myblob => {
          _this.originFileSize = myblob.size;
          // _this.originFileSize='ttt'
        });
    },
    cancel() {
      this.loaded = false;
      this.files = [];
      this.name = "";
      this.originSrc = null;
    },
    applyImage() {
      let _this = this;
      fetch(this.originSrc)
        .then(response => response.blob())
        .then(myblob => {
          _this.$emit("ApplyImage", myblob);
        });
    },
    updateDimension() {
      let canvas = document.getElementById("imguploadPicSrc");
      this.picDim = { x: canvas.naturalWidth, y: canvas.naturalHeight };
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