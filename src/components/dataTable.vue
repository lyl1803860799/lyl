<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      size="small"
      border
      highlight-current-row
    >
      <el-table-column
        label="序号"
        width="60"
        align="center"
        class-name="list-order"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.pageIndex }}</span>
        </template>
      </el-table-column>
      <slot name="columns"></slot>
    </el-table>
<!-- 
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPageData"
        :page-sizes="pageSizes"
        :page-size="pageSizeData"
        layout="total, prev, pager, next, jumper, sizes"
        :total="total"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
// import api from '@/api';

export default {
  data() {
    return {
      tableData: [{name: 'Error in data(): ReferenceError: xxx is not defined', description:'最大的可能原因是data()中存在实例没有使用的数据'}],
      // 出现Invalid prop: custom validator check failed for prop “XXXX”.就是说的这个属性拿到的值类型不兼容。
      // Your local changes to the following files would be overwritten by merge:  别人也在这个分支提交了代码，你需要先pull下来，如果有合并冲突要解决，然后再提交
      // Error in created hook: "Error: Initialize failed: invalid dom."   典型问题：在created中获取dom了
      pageSizes: [10, 20, 50, 100],
      total: 0,
      currentPage: 1,
    };
  },

  created() {
    // this.getData();
  },
 
  props: ['apiUrl'],
  
  methods: {
    // getData() {
    //   api.getGit({})
    //     .then( ({ data }) => {
    //       console.log(data)
    //       this.tableData = data.data
    //     })
    // }
  },
};
</script>


<style scoped lang="less">
.el-table__header {
  margin: 0;
}
</style>