<template>
  <div>
    <input placeholder="在这里输入要转为二维码的文本内容" v-model="text" />
    <input placeholder="容错率（L M Q L），默认 L" v-model="errLevel" />
    <input placeholder="margin" v-model="margin" />
    <input placeholder="width，默认300" v-model="width" />
    <input
      placeholder="边框颜色(red #FF0000 rgb(255,0,0) 等),默认无"
      v-model="borderColor"
    />
    <div id="result"></div>
  </div>
</template>
<script>
import { BrowserQRCodeSvgWriter, EncodeHintType } from '@zxing/library';

const codeWriter = new BrowserQRCodeSvgWriter();

export default {
  name: 'ZxingQrcode',
  data() {
    return {
      codeWriter: null,
      text: '',
      errLevel: '',
      margin: '',
      width: '',
      borderColor: '',
    };
  },
  watch: {
    text() {
      this.createCodeFn();
    },
    errLevel() {
      this.createCodeFn();
    },
    margin() {
      this.createCodeFn();
    },
    width() {
      this.createCodeFn();
    },
    borderColor() {
      this.createCodeFn();
    },
  },
  mounted() {
    console.log(EncodeHintType);
    // 0: "ERROR_CORRECTION"
    // 1: "CHARACTER_SET"
    // 2: "DATA_MATRIX_SHAPE"
    // 3: "MIN_SIZE"
    // 4: "MAX_SIZE"
    // 5: "MARGIN"
    // 6: "PDF417_COMPACT"
    // 7: "PDF417_COMPACTION"
    // 8: "PDF417_DIMENSIONS"
    // 9: "AZTEC_LAYERS"
    // 10: "QR_VERSION"
    // AZTEC_LAYERS: 9
    // CHARACTER_SET: 1
    // DATA_MATRIX_SHAPE: 2
    // ERROR_CORRECTION: 0
    // MARGIN: 5
    // MAX_SIZE: 4
    // MIN_SIZE: 3
    // PDF417_COMPACT: 6
    // PDF417_COMPACTION: 7
    // PDF417_DIMENSIONS: 8
    // QR_VERSION: 10
    // you can get a SVG element.
    // const svgElement = codeWriter.write(this.text, 300, 300);
    this.createCodeFn();
  },
  methods: {
    createCodeFn() {
      const re = document.getElementById('result');
      re.innerHTML = '';

      // 配置
      let hints = new Map();
      if (this.errLevel)
        hints.set(EncodeHintType.ERROR_CORRECTION, this.errLevel); // 容错率
      if (this.margin) hints.set(EncodeHintType.MARGIN, this.margin); // Margin

      const _width = this.width || 300;

      const svgElement = codeWriter.write(
        this.text || 'https://www.baidu.com',
        _width,
        _width,
        hints,
      );
      if (this.borderColor)
        svgElement.style = 'border: 1px ' + this.borderColor + ' solid';
      re.appendChild(svgElement);

      //添加图片标签
      var image = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'image',
      );

      const _logoW = _width / 7;
      const _center = (_width - _logoW) / 2;
      image.setAttribute('x', _center);
      image.setAttribute('y', _center);
      image.setAttribute('width', _logoW);
      image.setAttribute('height', _logoW);
      image.href.baseVal = require('@/assets/logo.png'); //关键一句，设置image的url图片，要用image.href.baseVal
      svgElement.appendChild(image);
    },
  },
};
</script>
<style lang="less" scoped></style>
