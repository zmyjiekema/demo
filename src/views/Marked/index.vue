<template>
  <div class="content">
    <div>
      <h1>markdown</h1>
      <textarea v-model="markeDownText"></textarea>
    </div>

    <div>
      <h1>html</h1>
      <div id="result" class="markdown wikistyle 绿清爽"></div>
    </div>
  </div>
</template>
<script>
import marked from 'marked';

export default {
  name: 'Marked',
  data() {
    return { markeDownText: '' };
  },
  watch: {
    markeDownText(text) {
      document.getElementById('result').innerHTML = marked(text);
    },
  },
  mounted() {
    console.log();

    this.getFile('./README.md');
  },
  methods: {
    getFile(url) {
      fetch(url)
        .then(function(response) {
          return response.text();
        })
        .then((text) => {
          this.markeDownText = text;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../assets/markdown/绿清爽.css';
.content {
  width: 100%;
}
@media screen and (min-width: 768px) {
  .content > div {
    width: 46%;
    float: left;
    margin: 0 2%;
  }
}
textarea,
#result {
  border: 1px solid #ccc;
  width: 100%;
  min-height: 600px;
  padding: 16px;
}
h1 {
  line-break: anywhere;
}
</style>
