<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ currentRoute[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="currentRoute[1].path">{{
            currentRoute[1].meta.title
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        {{ this.$cookie.get("username") }}
        <a-icon type="down" />
      </li>
      <li @click="changeInfo">修改信息</li>
      <li @click="changeCategory" v-if="isShow">类目管理</li>
      <li @click="exit">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    const role = document.cookie.split(';')[1].split('=')[1];
    if (role === 'admin') {
      this.isShow = true;
    }
  },
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
      isShow: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    exit() {
      this.$cookie.remove('username');
      this.$cookie.remove('role');
      this.$router.push({ name: 'Login' });
    },
    changeInfo() {
      this.$router.push({ name: 'ChangeInfo' });
    },
    changeCategory() {
      this.$router.push({ name: 'ChangeCategory' });
    },
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
};
</script>
