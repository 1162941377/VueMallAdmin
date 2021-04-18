<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" placeholder="Please input title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" placeholder="Please input description" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          placeholder="Please select category"
          @change="changeCategory"
          v-model="form.category"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="Please select class">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="Please add tags"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达"
            >包邮，最晚次日达</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  props: ['form'],
  data() {
    return {
      rules: {},
      categoryList: [],
      categoryItems: [],
      current: 0,
      category: [],
      categoryForm: [],
    };
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
  },
  async created() {
    const result = await this.$api.category();
    result.data.data = result.data.data.filter((item) => item.id);
    this.categoryList = result.data.data;
  },
};
</script>

<style lang="less">
.basic-detail {
  .next-btn {
    text-align: center;
  }
}
</style>
