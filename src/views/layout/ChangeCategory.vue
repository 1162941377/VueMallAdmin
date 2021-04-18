<template>
  <div class="change-category">
    <a-form-model
      ref="categoryForm"
      :model="form"
      :rules="rules"
      class="category-form"
    >
      <a-form-model-item label="商品类目" prop="category" required>
        <a-select
          placeholder="Please select category"
          @change="changeCategory"
          v-model="form.category"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            <template v-if="c.name">{{ c.name }}</template>
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_items" placeholder="Please select class">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="name" required>
        <a-input v-model="form.name" placeholder="Please input category" />
      </a-form-model-item>
      <a-form-model-item label="商品子类目" prop="c_items" required>
        <a-input v-model="form.c_items" placeholder="Please input class" />
      </a-form-model-item>
      <a-form-model-item class="btn">
        <a-button type="primary" @click="editCategory" class="edit-btn">Edit</a-button>
        <a-button @click="deleteCategory">Delete</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  async created() {
    const result = await this.$api.category();
    this.categoryList = result.data.data.filter((item) => {
      if (item.id) {
        // console.log(item);
        return item;
      }
      return false;
    });
    console.log(this.categoryList);
  },
  data() {
    return {
      rules: {},
      form: {
        name: '',
        id: 0,
      },
      categoryList: [],
      categoryItems: [],
      index: 0,
    };
  },
  methods: {
    changeCategory(category) {
      this.index = category - 1;
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
          this.form.name = this.categoryList[this.index].name;
          this.form.id = this.categoryList[this.index].id;
        }
      }
    },
    editCategory() {
      this.$refs.categoryForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$api.categoryEdit({
            id: this.form.id,
            name: this.form.name,
            c_items: [this.form.c_items],
          });
          console.log(result);
          return true;
        }
        return false;
      });
    },
    deleteCategory() {
      this.$refs.categoryForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$api.categoryDelete({ id: this.form.id });
          console.log(result);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less">
.change-category{
  max-width: 500px;
  margin: 100px auto!important;
  border: 1px solid #eee;
  padding: 30px 20px 6px !important;
  .btn {
    text-align: center;
    .edit-btn {
      margin-right: 50px;
    }
  }
}
</style>
