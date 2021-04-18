<template>
  <div class="card">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="商品总览" :bordered="false" align="center">
          <p>Product Content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="用户总览" :bordered="false" align="center">
          <p>Customer Content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="销售总览" :bordered="false" align="center">
          <p>Sale Content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="less">
.card {
  background-color: #ececec;
  padding: 20px;
}
</style>
