<template>
  <div id="app">
    <head>
      <!-- 预加载字体 -->
      <link rel="preload" href="https://s900207.github.io/book-front/assets/materialdesignicons-webfont-48d3eec6.woff" as="font" type="font/woff" crossorigin="anonymous">
    </head>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: 'MaterialDesignIcons';
  src: url('https://s900207.github.io/book-front/assets/materialdesignicons-webfont-48d3eec6.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: 'MaterialDesignIcons', sans-serif;
}
</style>
