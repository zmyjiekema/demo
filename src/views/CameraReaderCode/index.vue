<template>
  <div class="v-body">
    <video ref="video" id="video" poster="@/assets/loading.jpg"></video>
    <p v-if="videoInputDevicesArray.length == 0">{{ textContent }}</p>
    <a v-else :href="textContent">{{ textContent }}</a>
    <button v-if="videoInputDevicesArray.length > 0" @click="changeCamera">
      切换摄像头
    </button>
  </div>
</template>

<script>
// import Vue from 'vue';
// eslint-disable-next-line no-unused-vars
import adapter from 'webrtc-adapter';
// WebRTC适配器 只需要引入就ok
import { BrowserMultiFormatReader } from '@zxing/library';
/**
 * zxing demo
 */
export default {
  name: 'ZxingCameraReaderCode',
  data: () => ({
    codeReader: null,
    videoInputDevicesArray: [],
    selectedIndex: -1,
    textContent: undefined,
  }),
  created() {
    this.codeReader = new BrowserMultiFormatReader();
    console.log(this.codeReader);
    setTimeout(() => {
      this.init();
    }, 500);
  },
  destroyed() {
    this.codeReader.reset();
  },
  methods: {
    changeCamera() {
      this.selectedIndex = this.selectedIndex + 1;
      if (this.selectedIndex >= this.videoInputDevicesArray.length) {
        this.selectedIndex = 0;
      }
      this.decodeFromInputVideo();
    },
    init() {
      this.codeReader
        .listVideoInputDevices()
        .then((videoInputDevices) => {
          videoInputDevices.forEach((device) =>
            console.log(`${device.label}, ${device.deviceId}`),
          );
          this.videoInputDevicesArray = videoInputDevices;
          this.decodeFromInputVideo();
        })
        .catch((err) => console.error(err));
    },
    decodeFromInputVideo() {
      if (this.videoInputDevicesArray.length == 0) {
        this.textContent = '没有检测到可用的摄像头';
        this.$toast(this.textContent);
        document.getElementById('video').style.display = 'none';
        return;
      }
      if (this.selectedIndex >= this.videoInputDevicesArray.length) {
        this.selectedIndex = 0;
      }
      let selectedDeviceId;
      if (this.selectedIndex == -1) {
        selectedDeviceId = undefined;
      } else {
        selectedDeviceId = this.videoInputDevicesArray[this.selectedIndex]
          .deviceId;

        this.codeReader.reset();
      }

      console.log(
        `Started continous decode from camera with id ${selectedDeviceId}`,
      );

      this.codeReader.decodeFromInputVideoDeviceContinuously(
        selectedDeviceId,
        'video',
        (result, err) => {
          if (result) {
            console.log(result);
            this.textContent = result.text;
          }
          if (err && !err) {
            console.error(err);
          }
        },
      );
    },
  },
};
</script>

<style lang="less" scoped>
video {
  width: 100%;
  height: calc(~'(100vh - 156px)');
  background-color: black;
}
.v-body {
  font-family: 'Ropa Sans', sans-serif;
  color: #333;
  max-width: 640px;
  margin: 0 auto;
  position: relative;
  padding: 8px 16px;
}
#githubLink {
  position: absolute;
  right: 0;
  top: 12px;
  color: #2d99ff;
}
h1 {
  margin: 10px 0;
  font-size: 40px;
}
#loadingMessage {
  text-align: center;
  padding: 40px;
  background-color: #eee;
}
#canvas {
  width: 100%;
}
#output {
  margin-top: 20px;
  background: #eee;
  padding: 10px;
  padding-bottom: 0;
}
#output div {
  padding-bottom: 10px;
  word-wrap: break-word;
}
#noQRFound {
  text-align: center;
}
</style>
