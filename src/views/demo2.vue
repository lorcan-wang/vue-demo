<template>
  <div>
    <div @click="handleInsertText">产品名称</div>
    <div id="editor"></div>
  </div>
</template>
<script>
import Quill from "quill";
export default {
  name: "demo2",
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // 切换按钮
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // 用户自定义按钮值
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // 上标/下标
      [{ indent: "-1" }, { indent: "+1" }], // 减少缩进/缩进
      [{ direction: "rtl" }], // 文本下划线

      [{ size: ["small", false, "large", "huge"] }], // 用户自定义下拉
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // 清除格式
    ];
    // const toolbarOptions = [
    //     "bold", "italic", "underline", "strike"
    // ]
    const options = {
      debug: "info",
      modules: {
        // toolbar: {
        //   container: "#toolbar",
        //   options:toolbarOptions
        // },
        toolbar: toolbarOptions,
      },
      placeholder: "Compose an epic...",
      //   readOnly: true,
      theme: "snow",
    };

    this.editor = new Quill("#editor", options);
  },
  methods: {
    handleInsertText() {
      // this.editor.focus()
      // console.log(this.editor.getLength())
      // const el = document.createElement('div')
      // el.innerText = '${123}'
      // this.editor.insertEmbed(this.editor.getLength() - 1,'div',el)
      const img = require('@/assets/pexels-photo-3126176.jpeg')
      this.editor.insertEmbed(this.editor.getLength() - 1,'text','${1001001}')
    },
  },
};
</script>
<style lang="scss" scoped>
#editor {
  width: 100%;
  height: 90vh;
}
</style>