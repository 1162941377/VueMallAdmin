<template>
  <div class="category">
    <categoryArea :form="form" @submit="submitCategory" />
  </div>
</template>

<script>
import CategoryArea from '@/components/CategoryArea.vue';

export default {
  components: {
    CategoryArea,
  },
  data() {
    return {
      form: {
        name: '',
        c_items: '',
      },
    };
  },
  methods: {
    async submitCategory(form) {
      await this.$api.categoryAdd({
        ...form,
        id: new Date().getTime(),
      });
      this.$message.success('新增成功');
      this.$router.push({ name: 'ProductList' });
    },
  },
};
</script>

<style lang="less">
.category {
  margin-top: 100px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>
