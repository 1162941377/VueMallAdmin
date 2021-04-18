<template>
  <div class="home">
    <LeftMenu :key="routeCurrent" />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <MainHeader />
      <router-view :key="routeCurrent"></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './component/menu.vue';
import MainHeader from './component/sliderNav.vue';

export default {
  components: {
    LeftMenu,
    MainHeader,
  },
  data() {
    return {
      routeCurrent: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      const role = document.cookie.split(';')[1].split('=')[1];
      this.routeCurrent = new Date().getTime();
      if (this.$route.name === 'CategoryAdd' && role === 'coustomer') {
        this.$router.replace({ name: 'Index' });
        this.$message.error('You have no permissions.');
      }
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>
