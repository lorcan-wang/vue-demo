import { Component } from 'vue'
/**
 * @type  Component
 */
const figure = {
    methods: {
        // 绘制矩形
        rectangle(x, y, w, h) {
            this.ctx.rect(x, y, w, h)
            this.ctx.fillStyle = "green"
            this.ctx.fill()
        },
        // 绘制矩形边框
        rectangleBorder() {
            this.ctx.stroke()
        }
    }
}
export default figure