<template>
  <div class="product-list">
    <a-spin size="large" class="spinner" :spinning="spinning" />
    <ProductsSearch @submit="searchSubmit" :data="categoryList.data" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <a-button class="category-add-btn" :disabled="isDisabled">
      <router-link :to="{ name: 'CategoryAdd' }">新增类目</router-link>
    </a-button>
    <ProductsTable
      @edit="productEdit"
      @remove="productRemove"
      :data="tableData"
      :page="page"
      @change="changePage"
    />
  </div>
</template>

<script>
import ProductsSearch from '@/components/ProductsSearch.vue';
import ProductsTable from '@/components/ProductsTable.vue';

const role = document.cookie.split(';')[1].split('=')[1];

export default {
  components: {
    ProductsSearch,
    ProductsTable,
  },
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: [],
      },
      page: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
      },
      categoryList: [],
      tableData: [],
      categoryObj: {},
      spinning: true,
      isDisabled: false,
    };
  },
  watch: {
    tableData() {
      if (this.tableData.length) {
        this.spinning = false;
      } else {
        this.spinning = true;
      }
    },
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    async getTableData() {
      const result = await this.$api.productAll({
        page: this.page.current,
        size: this.page.pageSize,
        searchword: this.searchForm.searchWord,
        category: this.searchForm.category,
      });
      this.tableData = result.data.data.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category].name,
      }));
      this.page.total = result.data.total;
    },
    productEdit(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    productRemove(record) {
      const self = this;
      this.$confirm({
        title: 'Do you want to delete selected item?',
        content: record.title,
        async onOk() {
          self.$api.deleteProduct({
            id: record.id,
          });
          self.getTableData();
        },
        onCancel() {
          self.$message.info('You click canceled.');
        },
      });
    },
  },
  async created() {
    if (role === 'coustomer') {
      this.isDisabled = true;
    }
    const result = await this.$api.category({
      page: this.page.current,
      size: this.page.pageSize,
    });
    result.data.data = result.data.data.filter((item) => item.id);
    this.categoryList = result.data;
    result.data.data.forEach((item) => {
      this.categoryObj[item.id] = item;
    });
    this.getTableData();
  },
};
</script>

<style lang="less">
.spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
