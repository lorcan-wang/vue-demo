<template>
  <div>
    <canvas
      id="tutorial"
      width="600"
      height="600"
      @mousemove="handleMousemove"
    ></canvas>
    <canvas id="three" width="600"
      height="600">
    </canvas>
  </div>
</template>
<script>
import { figure,three } from "./utils";
export default {
  name: "canvasDemo",
  mixins: [figure,three],
  data() {
    return {
      // canvas 上下文
      /**
       * @type CanvasRenderingContext2D
       */
      ctx: null,
    };
  },
  mounted() {
    const canvas = document.querySelector("#tutorial");
    this.ctx = canvas.getContext("2d");
    this.getThree()
    this.rectangle(10,10,60,40);
  },
  methods: {
    handleMousemove(event) {
      const x = event.layerX;
      const y = event.layerY;
      this.ctx.isPointInPath(x, y) && this.rectangleBorder()
      
      //    console.log(event.layerX,event.layerY,event)
    },
  },
};
</script>
<style lang="scss" scoped>
canvas {
  border: 1px solid black;
}
</style>