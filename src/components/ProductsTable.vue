<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    size="small"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="productEdit(record)">编辑</a-button>
      <a-button @click="productRemove(record)">删除</a-button>
    </div>
  </a-table>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    align: 'center',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    align: 'center',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
    align: 'center',
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data', 'page'],
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },
    productEdit(record) {
      this.$emit('edit', record);
    },
    productRemove(record) {
      this.$emit('remove', record);
    },
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
};
</script>
