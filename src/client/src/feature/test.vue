<template>
  <div>
    <canvas id="canvas" height="400" width="400"></canvas>
  
  </div>
</template>

<script>
export default {
data() {
    return {
        key: 0,
        photoOriginal: null
    }

},
mounted () {
    this.photoOriginal=new Image()
    this.photoOriginal.src== 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png'
    let c=document.getElementById('canvas');
    this.ctx=c.getContext('2d')
    // this.draw(this.ctx)
    window.requestAnimationFrame(this.draw);
},
methods: {
    draw(ctx) {
        
ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,300,300); // effacer le canvas

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,300,300); // effacer le canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save();
  ctx.translate(150,150);

  // Terre
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(105,0);
  ctx.fillRect(0,-12,50,24); // Ombre
  ctx.drawImage(this.photoOriginal,-12,-12);

        ctx.drawImage(this.photoOriginal,)

window.requestAnimationFrame(this.draw);
        // this.drawMire(200,200,100,100)

    },
    drawMire(ctx, cx,cy,wx,wy){
        let segmentLength=10
        let segmentWidth=2

        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(cx-wx/2, cx+wy/2, segmentLength, segmentWidth);
        this.ctx.fillRect(cx-wx/2, cx+wy/2,  segmentWidth,-segmentLength);

        this.ctx.fillRect(cx-wx/2, cx-wy/2, segmentLength, segmentWidth);
        this.ctx.fillRect(cx-wx/2, cx-wy/2,  segmentWidth,segmentLength);

        this.ctx.fillRect(cx+wx/2, cx-wy/2, -segmentLength, segmentWidth);
        this.ctx.fillRect(cx+wx/2, cx-wy/2,  segmentWidth,segmentLength);

        this.ctx.fillRect(cx+wx/2, cx+wy/2, -segmentLength, segmentWidth);
        this.ctx.fillRect(cx+wx/2, cx+wy/2,  segmentWidth,-segmentLength);

    }



},
};
</script>

<style lang="scss" scoped>
canvas {
  border: red solid 5px;
}
</style>