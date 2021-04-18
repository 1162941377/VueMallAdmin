<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <stepsBar v-if="current === 0" :form="form" @next="next" />
      <saleArea v-else-if="current === 1" :form="form" @prev="prev" @next="next" />
    </div>
  </div>
</template>

<script>
import StepsBar from '@/components/StepsBar.vue';
import SaleArea from '@/components/SaleArea.vue';

export default {
  async created() {
    const { id } = this.$route.params;
    if (id) {
      const result = await this.$api.detail({ id });
      this.form = result.data;
    }
  },
  components: {
    StepsBar,
    SaleArea,
  },
  data() {
    return {
      current: 0,
      form: {
        title: '',
        desc: '',
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
      steps: [
        { title: '填写商品基本信息' },
        { title: '填写商品销售信息' },
      ],
    };
  },
  methods: {
    async next(form) {
      if (this.current === 0) {
        this.current += 1;
      } else {
        if (this.$route.params.id) {
          await this.$api.edit(this.form);
          this.$message.success('修改成功');
        } else {
          this.$api.add(form);
          this.$message.success('新增成功');
        }
        this.$router.push({ name: 'ProductList' });
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>

<style lang="less">
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>
