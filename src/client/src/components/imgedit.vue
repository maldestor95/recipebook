<template>
  <v-container fluid>
    <v-row>
      <v-icon :class="drawmode=='crop'?'activebtn':''" @click="drawmode='crop'">mdi-crop</v-icon>
      <v-icon :class="drawmode=='drag'?'activebtn':''" @click="drawmode='drag'">mdi-arrow-all</v-icon>
      <v-icon :class="drawmode=='mire'?'activebtn':''" @click="drawmode='mire'">mdi-target-variant</v-icon>
      <v-spacer></v-spacer>
      <v-icon class="green--text" @click="publish()">mdi-publish</v-icon>

      <!-- <v-spacer></v-spacer>
      <v-icon :class="drawmode=='extend'?'activebtn':''" @click="drawmode='extend'">mdi-overscan</v-icon>-->

      <v-spacer></v-spacer>
      <v-icon class="red--text" @click="reset">mdi-close-circle</v-icon>
    </v-row>

    <v-row>
      <v-col cols="6" class="ImageEdit" id="originRow">
        <v-row>
          <img :src="originSrc" alt="original image" id="originpic" class="originSrcClass" />

          <canvas
            id="originCanvas"
            @mousemove="canvasEvent($event)"
            @mousedown="mousedown()"
            @mouseup="mouseup()"
            class="originCanvas"
          ></canvas>
        </v-row>
      </v-col>

      <v-col cols="6" class="ImageEdit">
        <v-row justify="center">
          <canvas
            id="destinationcanvas"
            class="canvas"
            :height="mireHeight*zoomFactor"
            :width="mireWidth*zoomFactor"
          ></canvas>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Edit input image for croping and size reduction
  * @module components/imgedit
   * @vue-prop {String} originSrc - Path to source image  (\\img src="xxx"`)
   * @vue-event {DataUrl} saveModifiedCanvas - Emit the final canvas as a DataUrl
   *     
   * @vue-event {null} cancel - Emit if cancel   
   */
export default {
  props: {
    originSrc: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      drawmode: "mire",
      coord: { x: 0, y: 0 },
      points: { x0: 0, y0: 0, x1: 0, y1: 0 },
      position: { x: 0, y: 0 },
      mireHeight: 100,
      mireWidth: 100,
      zoomFactor: 3,
      debug: {}
    };
  },
  methods: {
    canvasEvent(event) {
      var x = event.layerX;
      var y = event.layerY;
      this.position = { x: x, y: y };
      this.coord.x = x;
      this.coord.y = y;
      var srcPic = document.getElementById("originpic");
      var canvas = document.getElementById("originCanvas");
      canvas.width = srcPic.width;
      canvas.height = srcPic.height;

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
        "originCanvas",
        "destinationcanvas"
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
    },
    reset() {
      this.$emit("cancel");
    },
    copyRectangle(sx, sy, wx, wy, src, srcCtxString, destCtxString) {
      var x = new Image();
      x.src = src;
      // let _this=this
      x.onload = function() {
        var ctx = document.getElementById(destCtxString).getContext("2d");
        var ctxOrig = document.getElementById(srcCtxString).getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#FF00000";
        // _this.debug={sx:sx,sy:sy,wx:wx,wy:wy,ctxw:ctx.canvas.width,ctxh:ctx.canvas.height,naturalWidth:x.naturalWidth,origcanvasWidth:ctxOrig.canvas.width}
        ctx.drawImage(
          x,
          (sx * x.naturalWidth) / ctxOrig.canvas.width,
          (sy * x.naturalHeight) / ctxOrig.canvas.height,
          (wx * x.naturalWidth) / ctxOrig.canvas.width,
          (wy * x.naturalHeight) / ctxOrig.canvas.height,
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        this.mireWidth = wx;
        this.mireHeight = wy;
      };
    },
    publish() {
      let canvas = document.getElementById("destinationcanvas");
      this.$emit("saveModifiedCanvas", canvas.toDataURL("image/jpeg"));
    }
  }
};
</script>

<style lang="scss" scoped>
.ImageEdit {
  border: 1px dashed black;
}
.canvas {
  margin: 0px;
  padding: 0px;
  // border: 2px solid red;
}
.originSrcClass {
  margin: 0px;
  padding: 0px;
  width: 100%;
  // border: solid 10px purple;
}
.originCanvas {
  margin: 0px;
  padding: 0px;
  position: absolute;
  // border: solid 10px green;
}
.destsrc {
  position: absolute;
  padding: 0px;
  max-width: 400px;
  width: 100%;
  left: 500px;
}
.activebtn {
  color: blue;
}
</style>