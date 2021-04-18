<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit.prevent="handleSubmit"
    >
      <a-form-model-item label="检索关键字">
        <a-input
          v-model="searchForm.searchWord"
          placeholder="input the key word"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          show-search
          placeholder="select product category"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="c in data"
            :key="c.id"
            :value="c.id"
          >
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit">search</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: [],
      },
    };
  },
  props: ['data'],
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less">
.search-box {
  padding: 10px 30px;
}
</style>
