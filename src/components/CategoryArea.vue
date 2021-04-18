<template>
  <div class="category-area">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="商品类目" prop="name" required>
        <a-input v-model="form.name" placeholder="Please input category" />
      </a-form-model-item>
      <a-form-model-item label="商品子类目" prop="c_items" required>
        <a-input v-model="form.c_items" placeholder="Please input class" />
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button type="primary" @click="submit">提交</a-button>
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
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>
