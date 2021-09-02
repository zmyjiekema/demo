<template>
  <div id="app">
    <div id="nav">
      <template v-for="(route, index) in routes">
        <router-link :key="index" :to="route.path">{{
          route.meta.title || ' -- '
        }}</router-link>
        <span :key="'span' + index" v-if="index != routes.length - 1"> | </span>
      </template>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    routes() {
      return this.$router.options.routes.filter((e) => e.name != 'Test');
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  width: 100%;
}

#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
