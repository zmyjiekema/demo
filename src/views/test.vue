<template>
  <div>
    <h1>test</h1>

    <ul>
      <li v-for="(a, b) in f()" :key="b">{{ a.label }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data() {
    return {
      m: [],
    };
  },
  mounted() {
    console.log(this.$router.options.routes);

    this.m = new Map([
      [1, '小美女g'],
      [2, 'da美女g'],
    ]);
  },
  methods: {
    f() {
      const ar = [];
      this.m.forEach((value, key) => {
        ar.push({
          label: value,
          value: key,
        });
      });
      return ar;
    },
  },
};
</script>
