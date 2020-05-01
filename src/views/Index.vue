<template>
  <div class="list-box" ref="listBox">
    <div
      @touchstart="handleStart(index)"
      @touchmove="handleMove(index)"
      @touchend="handleEnd(index)"
      :class="['item',{'active':index === startIndex}]"
      v-for="(str,index) in dataList"
      :key="index"
      :ref="'item'+index"
      :style="{transition: isTransition ? 'all 0.5s ease' : 'none',background:`rgb(${$utils.RandomNum(1,255)},${$utils.RandomNum(1,255)},${$utils.RandomNum(1,255)})`}"
    >{{str}}</div>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      dataList: ["苹果", "香蕉", "葡萄", "橘子", "菠萝", "椰子", "鸭梨"],
      startIndex: null,
      resIndex: null,
      startY: null,
      listBoxHeight: null,
      isTransition: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.listBoxHeight = this.$refs.listBox.clientHeight;
    });
  },
  methods: {
    default() {
      event.preventDefault();
    },
    initial() {
      this.resIndex = null;
      this.startY = null;
      this.startIndex = null;

      this.dataList.forEach((str, index) => {
        this.$refs["item" + index][0].style.transform = "";
      });
    },
    handleStart(index) {
      document.body.addEventListener("touchmove", this.default, {
        passive: false
      });

      this.startY = event.targetTouches[0].clientY;
      this.startIndex = index;
      this.isTransition = true;
    },
    handleMove(index) {
      const el = event.target;
      const moveY = event.targetTouches[0].clientY;
      const y = moveY - this.startY;
      el.style.transform = "translateY(" + y + "px)";
      const height = el.clientHeight;
      let i =
        y > 0
          ? index + Math.abs(Math.round(y / height))
          : index - Math.abs(Math.round(y / height));

      i < 0 && (i = 0);
      i > this.dataList.length - 1 && (i = this.dataList.length - 1);
      this.resIndex = i;
      for (let strIndex = 0; strIndex < this.dataList.length; strIndex++) {
        if (strIndex >= i && strIndex < index) {
          this.$refs["item" + strIndex][0].style.transform =
            "translateY(" + height + "px)";
          // break;
        } else if (strIndex <= i && strIndex > index) {
          this.$refs["item" + strIndex][0].style.transform =
            "translateY(" + -height + "px)";
          // break;
        } else {
          strIndex !== index &&
            (this.$refs["item" + strIndex][0].style.transform = "");
        }
      }
    },
    handleEnd(index) {
      document.body.removeEventListener("touchmove", this.default, {
        passive: false
      });
      const str = this.dataList[index];
      this.isTransition = false;
      this.dataList.splice(index, 1);
      this.dataList.splice(this.resIndex, 0, str);
      this.initial();
    }
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  border: 1px solid #e5e5e5;

  .item {
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #e5e5e5;
    background-color: #f6f6f6;
    width: 100%;
    // transition: all 0.5s ease;
  }
  .active {
    transition: none !important;
    z-index: 11;
  }
}
</style>