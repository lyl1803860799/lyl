<template>
  <div id="git-container">
    <pre>
      git提交规范：
      1.feat: （新功能）
      2.fix: （修复）
      3.refactor： （重构）(既不是增加feature，也不是修复bug)


      代码暂存&&释放
      git stash save “XXX” =》暂存
      git stash list =》暂存列表
      git stash apply 0 =》释放暂存（释放之后不会清除）
      git stash pop=》释放暂存（释放之后会清缓存）
    </pre>

      <dataTable 
       :apiUrl="listUrl"
      >
        <template slot="columns">
          <!--列设置 TODO 根据需要修改-->

          <el-table-column prop="name" label="问题名" >
            <template slot-scope="scope">
              <a style="margin-left: 10px">{{ scope.row.name }} </a>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="说明" />
          <el-table-column prop="method" label="解决方法" />
          <el-table-column prop="grade" align="center" width="100" label="问题频度" />
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="180"> 
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
              <el-button 
                type="primary" size="mini" @click="openEditDialog(scope.row)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </template>
      </dataTable> 
  </div>
</template>

<script>
// 在这里写全局变量会污染吗，是不是vue在合并script的时候会做处理
// const xx = xx;
import dataTable from '@/components/dataTable';
export default {
  components: { dataTable },

  data() {
    return {
      listUrl: '/git/list', // TODO 列表数据获取接口
    }
  }
}
</script>

<style scoped>

</style>