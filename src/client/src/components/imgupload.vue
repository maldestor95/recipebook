<template>
  <div>
    {{originSrc}}
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
                width="400"
              />
              <v-spacer></v-spacer>
              <canvas id="finalPic" width="400"></canvas>
              <v-btn color="warning" @click="drawFinalPic()">Draw</v-btn>
            </v-row>
            <v-row>
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Resize</v-btn>
              <!-- <v-btn color="info" @click="save()">Apply</v-btn> -->
              <v-btn color="cancel" @click="cancel()">Cancel</v-btn>
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
      loaded: false
    };
  },
  methods: {
    filesChange(name, files) {
      this.name = name;
      URL.revokeObjectURL(this.originSrc);

      this.originSrc = URL.createObjectURL(files[0]);
      this.originFileName = files[0].name;
      this.originFileSize = files[0].size + " bytes";
      this.loaded = true;
    },
    drawFinalPic() {
      let canvas = document.getElementById("finalPic");
      let canvasOrigin=document.getElementById('imguploadPicSrc')
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = this.originSrc;
      let _this = this;
      canvas.height=canvasOrigin.height*canvas.width/canvasOrigin.width;

      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // ctx.drawImage(img,0,0,canvasOrigin.width,canvasOrigin.height,0,0,ctx.width,ctx.height)
        canvas.toBlob(
          blob => {
            // eslint-disable-next-line no-console
            console.log(blob);
            _this.$emit("ApplyImage", blob);
          },
          "image/jpg",
          1
        );
      };
    },
    save() {
      this.$emit("ApplyImage", this.originSrc);
    },
    resize(dataUrl) {
      this.originSrc = dataUrl;
      this.dialogEdit = false;
    },
    cancel() {
      this.loaded = false;
      this.files = [];
      this.name = "";
      this.originSrc = null;
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