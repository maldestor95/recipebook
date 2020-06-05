<template>
  <div>
    <v-card>
      <form enctype="multipart/form-data">
        <input
          type="file"
          name="uploadImgName"
          @change="filesChange($event.target.name, $event.target.files)"
          accept="image/*"
        />
      </form>
      <v-btn color="info" @click="reset">reset</v-btn>
    </v-card>

    <v-card>
      <v-slider v-model="zoomFactor" step="1" :label="`Zoom ${this.zoomFactor}`" min="1" max="4"></v-slider>
      <v-slider
        v-model="mireHeight"
        step="10"
        :label="`Height ${this.mireHeight}`"
        min="20"
        max="400"
      ></v-slider>
      <v-slider v-model="mireWidth" step="10" :label="`Width ${this.mireWidth}`" min="20" max="400"></v-slider>
    </v-card>

    <div>
      <v-container grid-list-xs>
        <v-row v-if="loaded">
          <v-col>
            <p>Name: {{originFileName}}</p>
            <p>Size: {{originFileSize}}</p>
            <div>
              <img
                :src="originSrc"
                alt="original image"
                width="400"
                id="originpic"
                class="canvas originsrc"
              />
              <canvas class="originsrc" id="srccanvas" width="400" @mousemove="cropMireToDest($event)"></canvas>
            </div>
          </v-col>
          <v-col>
            <p>Name: {{finalFileName}}</p>
            <p>Size: {{finalFileSize}}</p>
            <canvas
              id="destcanvas"
              :height="mireHeight*zoomFactor"
              :width="mireWidth*zoomFactor"
              class="canvas"
            ></canvas>
          </v-col>
        </v-row>

        <v-btn color="info" @click="save()">Save</v-btn>
        <v-row></v-row>
      </v-container>
    </div>
    <a
      :href="imageURI"
      target="_blank"
      download="myImage.jpg"
      class="canvas"
      width="200"
      height="200"
    ></a>
  </div>
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
      imageURI: null
    };
  },
  mounted() {},
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
    },
    cropMireToDest(event) {
      var x = event.layerX;
      var y = event.layerY;
      this.coord.x = x;
      this.coord.y = y;
      var ctx = document.getElementById("srccanvas").getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.drawMireOnSource(ctx, x, y, this.mireWidth, this.mireHeight);
      this.copyRectangle(
        x - this.mireWidth / 2,
        y - this.mireHeight / 2,
        this.mireWidth,
        this.mireHeight,this.originSrc,"srccanvas","destcanvas"
      );
    },
    copyRectangle(sx, sy, wx, wy,src,srcCtxString,destCtxString) {
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
      };
    },
    saveCanvas() {
      let ctx = document.getElementById("destcanvas");
      
      this.imageURI = ctx.toDataURL("image/jpeg", 1);

      this.finalFileName = "thumb" + this.originFileName;
      this.finalFileSize = this.imageURI.length + " bytes";
      this.saved = true;
    },
    save() {
      var canvas = document.getElementById("destcanvas");
      var ctx = canvas.getContext("2d");
      var ox = canvas.width / 2;
      var oy = canvas.height / 2;
      ctx.font = "42px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#800";
      ctx.fillRect(ox / 2, oy / 2, ox, oy);

      this.imageURI = canvas.toDataURL("image/jpg");
      // el.href = imageURI;
    },
    drawMireOnSource(ctx, cx, cy, wx, wy) {
      let segmentLength = 10;
      let segmentWidth = 2;

      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(cx - wx / 2, cy + wy / 2, segmentLength, segmentWidth);
      ctx.fillRect(cx - wx / 2, cy + wy / 2, segmentWidth, -segmentLength);

      ctx.fillRect(cx - wx / 2, cy - wy / 2, segmentLength, segmentWidth);
      ctx.fillRect(cx - wx / 2, cy - wy / 2, segmentWidth, segmentLength);

      ctx.fillRect(cx + wx / 2, cy - wy / 2, -segmentLength, segmentWidth);
      ctx.fillRect(cx + wx / 2, cy - wy / 2, segmentWidth, segmentLength);

      ctx.fillRect(cx + wx / 2, cy + wy / 2, -segmentLength, segmentWidth);
      ctx.fillRect(cx + wx / 2, cy + wy / 2, segmentWidth, -segmentLength);
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  border: solid blue;
}
.originsrc {
  position: absolute;
  padding: 0px;
  width: 400px;
}
</style>