<template>
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
      <!-- <v-btn color="info" @click="reset">reset</v-btn> -->
    </v-row>

    <v-row v-if="loaded" no-gutter>
      <v-col class="menu grey lighten-4">
        <v-icon :class="drawmode=='crop'?'activebtn':''" @click="drawmode='crop'">mdi-crop</v-icon>
        <v-icon :class="drawmode=='drag'?'activebtn':''" @click="drawmode='drag'">mdi-arrow-all</v-icon>
        <v-icon :class="drawmode=='mire'?'activebtn':''" @click="drawmode='mire'">mdi-target-variant</v-icon>
        <v-spacer></v-spacer>
        <v-icon @click="reset">mdi-close-circle</v-icon>
      </v-col>
      <v-col class="grey lighten-5">
        <v-row>
          <p>Name: {{originFileName}}</p>
          <v-spacer></v-spacer>
          <p>Size: {{originFileSize}}</p>
        </v-row>
        <v-row>
          <img
            :src="originSrc"
            alt="original image"
            width="400"
            id="originpic"
            class="canvas originsrc"
          />
          <canvas
            class="originsrc"
            id="srccanvas"
            width="400"
            @mousemove="canvasEvent($event)"
            @mousedown="mousedown()"
            @mouseup="mouseup()"
          ></canvas>
        </v-row>
      </v-col>

      <v-col class="lighten-4">
        <v-row>
          <p>Name: {{finalFileName}}</p>
          <v-spacer></v-spacer>
          <p>Size: {{finalFileSize}}</p>
        </v-row>
        <v-row>
          <canvas
            id="destcanvas"
            :height="mireHeight*zoomFactor"
            :width="mireWidth*zoomFactor"
            class="canvas"
          ></canvas>
        </v-row>
        <v-row>
          <v-btn color="info" @click="save()">Save</v-btn>
          <v-spacer></v-spacer>
          <a :href="imageURI" target="_blank" download="myImage.jpg" v-if="saved">Download Link</a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "",
      files: [],
      originSrc: null,
      originFileSize: null,
      originFileName: null,
      finalFileSize: null,
      finalFileName: null,
      loaded: false,
      coord: { x: 0, y: 0 },
      imgdata: null,
      sx: 0,
      sy: 0,
      imgmod: null,
      saved: false,

      mireHeight: 100,
      mireWidth: 100,
      zoomFactor: 4,
      imageURI: null,
      drawmode: "mire",
      editMode: false,
      isDrawing: false,
      points: { x0: 0, y0: 0, x1: 0, y1: 0 },
      position: { x: 0, y: 0 }
    };
  },
  mounted() {
    //for dev only
    //this.originSrc =       "https://elements-cover-images-0.imgix.net/61135a49-0307-4638-bab1-8ec3e78055ea?auto=compress%2Cformat&fit=max&w=710&s=03c225c60518ba88a505e980ba511ce8";
    // this.loaded = true;
  },
  methods: {
    filesChange(name, files) {
      this.name = name;
      URL.revokeObjectURL(this.originSrc);

      this.originSrc = URL.createObjectURL(files[0]);

      this.originFileName = files[0].name;
      this.originFileSize = files[0].size + " bytes";

      var x = new Image();
      x.src = this.originSrc;
      this.loaded = true;
      x.onload = function() {
        var ctx = document.getElementById("srccanvas").getContext("2d");
        ctx.canvas.height = Math.floor((ctx.canvas.width * x.height) / x.width);
        ctx.drawImage(
          x,
          0,
          0,
          x.width,
          x.height,
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
      };
    },

    reset() {
      var ctx = document.getElementById("srccanvas").getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.originSrc = null;
      this.loaded = false;
      this.saved = false;
    },
    canvasEvent(event) {
      var x = event.layerX;
      var y = event.layerY;
      this.position = { x: x, y: y };
      this.coord.x = x;
      this.coord.y = y;
      var canvas = document.getElementById("srccanvas");
      var ctx = canvas.getContext("2d");

      switch (this.drawmode) {
        case "mire":
          canvas.style.cursor = "crosshair";
          if (this.editMode) {
            this.points = {
              x0: x - this.mireWidth / 2,
              y0: y - this.mireHeight / 2,
              x1: x + this.mireWidth / 2,
              y1: y + this.mireHeight / 2
            };
          }
          break;
        case "crop":
          canvas.style.cursor =
            "url('https://img.icons8.com/material-outlined/24/000000/crop.png'),auto";
          if (this.isDrawing) {
            this.points.x1 = x;
            this.points.y1 = this.points.y0 + x - this.points.x0;
            // this.mireHeight = Math.abs(this.points.y1 - this.points.y0);
            // this.mireWidth = Math.abs(this.points.x1 - this.points.x0);
          }
          break;
        case "drag":
          if (this.isDrawing) {
            canvas.style.cursor = "all-scroll";
            this.points = {
              x0: x - Math.abs(this.points.x0 - this.points.x1) / 2,
              y0: y - Math.abs(this.points.y0 - this.points.y1) / 2,
              x1: x + Math.abs(this.points.x0 - this.points.x1) / 2,
              y1: y + Math.abs(this.points.y0 - this.points.y1) / 2
            };
          }
          break;
        default:
          break;
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.drawMireOnSource(
        ctx,
        this.points.x0,
        this.points.y0,
        this.points.x1,
        this.points.y1
      );
      this.copyRectangle(
        this.points.x0,
        this.points.y0,
        this.points.x1 - this.points.x0,
        this.points.y1 - this.points.y0,
        this.originSrc,
        "srccanvas",
        "destcanvas"
      );
    },
    mousedown() {
      this.isDrawing = true;
      switch (this.drawmode) {
        case "mire":
          this.editMode = !this.editMode;
          break;

        case "crop":
          this.points = {
            x0: this.position.x,
            y0: this.position.y,
            x1: this.position.x,
            y1: this.position.y
          };
          break;
        default:
          break;
      }
    },
    mouseup() {
      switch (this.drawmode) {
        case "mire":
          break;
        case "crop":
          this.isDrawing = false;
          break;

        default:
          this.isDrawing = false;
          break;
      }
    },
    copyRectangle(sx, sy, wx, wy, src, srcCtxString, destCtxString) {
      var x = new Image();
      x.src = src;

      x.onload = function() {
        var ctx = document.getElementById(destCtxString).getContext("2d");
        var ctxOrig = document.getElementById(srcCtxString).getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(
          x,
          sx * Math.floor(x.naturalWidth / ctxOrig.canvas.width),
          sy * Math.floor(x.naturalWidth / ctxOrig.canvas.width),
          wx * Math.floor(x.naturalWidth / ctxOrig.canvas.width),
          wy * Math.floor(x.naturalWidth / ctxOrig.canvas.width),
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        this.mireWidth = wx;
        this.mireHeight = wy;
      };
    },
    save() {
      let ctx = document.getElementById("destcanvas");

      this.imageURI = ctx.toDataURL("image/jpeg", 1);
      // let _this=this
      // if (ctx.toBlob) {
      //   ctx.toBlob(function(blob) {
      //     _this.$emit("saveModifiedCanvas", blob);
      //     });
      // }
          this.$emit("saveModifiedCanvas", ctx);

      this.finalFileName = "thumb" + this.originFileName;
      this.finalFileSize = this.imageURI.length + " bytes";
      this.saved = true;
    },
    drawMireOnSource(ctx, x0, y0, x1, y1) {
      let segmentLength = 10;
      let segmentWidth = 2;

      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(x0, y1, segmentLength, segmentWidth);
      ctx.fillRect(x0, y1, segmentWidth, -segmentLength);

      ctx.fillRect(x0, y0, segmentLength, segmentWidth);
      ctx.fillRect(x0, y0, segmentWidth, segmentLength);

      ctx.fillRect(x1, y0, -segmentLength, segmentWidth);
      ctx.fillRect(x1, y0, segmentWidth, segmentLength);

      ctx.fillRect(x1, y1, -segmentLength, segmentWidth);
      ctx.fillRect(x1, y1, segmentWidth, -segmentLength);
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  margin: auto;
}
.originsrc {
  position: absolute;
  padding: 0px;
  width: 400px;
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