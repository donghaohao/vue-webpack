<script>
  import Test from './component/test.vue';
  module.exports = {
    data() {
      return {
        msg: 'hello world!!',
        name: 'xixi',
        age: 24,
      };
    },
    components: {
      Test,
    },
    ready() {
      ['4', '5', '6'].forEach(value => {
        console.log(value);
      });
    },
  };
</script>
<template>
  <Test :my-name="name" :my-age="age"></Test>
  <div>
    <h1>个人信息</h1>
    <p>我的个人信息啊啊啊啊啊！</p>
    <p class="app"></p>
  </div>
</template>
<style src="./css/app.css"></style>