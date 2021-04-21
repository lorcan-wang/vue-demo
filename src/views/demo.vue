<template>
  <div class="box">
    <ul>
      <li v-for="(time, i) in timeList" :key="i">{{ time + "--" }}</li>
    </ul>
    <section class="content">
      <div
        v-for="(item, index) in elList"
        :key="index"
        class="item"
        :style="{
          position: 'absolute',
          top: item.top + 'px',
          left: item.left + 'px',
          height: item.height + 'px',
          width: item.width + 'px'
        }"
      >嘎嘎嘎</div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeList: [],
      elList: [],
      resList: []
    };
  },
  created() {
    this.init();
  },
  mounted() {
    // const events = [
    //   { start: 40, end: 150 },
    //   { start: 39, end: 150 },
    //   { start: 540, end: 600 },
    //   { start: 560, end: 620 },
    //   { start: 610, end: 670 },
    //   { start: 39, end: 150 }
    // ];
    const events = [
      { start: 30, end: 150 },
      { start: 540, end: 600 },
      { start: 540, end: 600 },
      { start: 560, end: 620 },
      { start: 610, end: 670 }
    ];
    // this.layOutDay(events);
    this.getOverList(events)
  },
  methods: {
    //   初始化渲染 y轴时间
    init() {
      let list = [];
      for (let i = 0; i < 26; i++) {
        let a = new Date("1970-01-01 9:00").getTime() + 1800000 * i;
        let hours = new Date(a).getHours();
        let text = "AM";
        if (hours > 12) {
          text = "PM";
          hours = hours - 12;
        }
        let minutes = new Date(a).getMinutes();
        minutes < 10 && (minutes = minutes + "0");
        const timeStr = hours + ":" + minutes + text;
        list.push(timeStr);
      }
      this.timeList.push(...list);
    },
    getOverList(events) {
      let res = [];
      events.forEach((item, index) => {
        let indexList = [];
        indexList.push(index);
        for (let i = 0; i < events.length; i++) {
          if (index !== i) {
            if (
              (events[i].start >= item.start && events[i].start <= item.end) ||
              (events[i].end >= item.start && events[i].end <= item.end)
            ) {
              indexList.push(i)
            }
          }
        }
        res.push(indexList)
        
      });
      console.log(res)
    },
    // 重叠函数
    overlapFn(events, item, index, res = []) {
      let arr = JSON.parse(JSON.stringify(res));
      let isOverlap = false;
      arr.push(item);
      for (let i = 0; i < events.length; i++) {
        if (index !== i) {
          if (
            (events[i].start >= item.start && events[i].start <= item.end) ||
            (events[i].end >= item.start && events[i].end <= item.end)
          ) {
            events.splice(index, 1);
            isOverlap = true;
            let x;
            if (index < i) {
              x = i - 1;
            } else {
              x = i + 1;
            }
            this.overlapFn(events, events[x], x, arr);
          }
        }
      }
      // 没有重叠的情况
      if (!isOverlap) {
        const list = events.splice(index, 1);
        this.resList.push(arr);
        if (events.length > 0) {
          this.overlapFn(events, events[0], 0);
        }
      }
    },
    layOutDay(events) {
      this.overlapFn(events, events[0], 0);
      console.log(this.resList);
      let els = [];
      this.resList.forEach((overLapList, index) => {
        overLapList.forEach((item, overLapIndex) => {
          let minList = overLapList.map((mpItem, mpIndex) => {
            let num = 1;
            let mins = [];
            for (let i = 0; i < overLapList.length; i++) {
              if (overLapIndex !== i) {
                if (
                  (overLapList[i].start >= mpItem.start &&
                    overLapList[i].start <= mpItem.end) ||
                  (overLapList[i].end >= mpItem.start &&
                    overLapList[i].end <= mpItem.end)
                ) {
                  ++num;
                }
              }
            }
            mins.push(num);
            return mins;
          });
          console.log(overLapIndex);
          let min = Math.min.apply(Math, minList);
          const elObj = {
            top: item.start,
            left: 10 + (600 / min) * overLapIndex,
            height: Math.abs(item.end - item.start),
            width: 600 / min
          };
          els.push(elObj);
        });
      });
      this.elList.push(...els);
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  //   height: 740px;
  align-items: center;
  justify-content: center;
  .content {
    width: 620px;
    height: 720px;
    background-color: #e5e5e5;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    > div {
      background-color: #ffffff;
      border-left: 5px solid blue;
      box-sizing: border-box;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    height: 720px;
    justify-content: space-between;
    margin-right: 10px;
  }
}
</style>
