<template>
  <div class="release-management">
    <div class="head">
      <!-- <a-button type="green" class="add-btn" @click="addView">新增</a-button> -->
      <a-input
        v-model.trim="deployVersion"
        class="search-ipt f-r"
        placeholder="请输入版本号搜索"
        style="width: 200px;margin-top:2px;"
        :max-length="50"
      >
        <div slot="suffix" class="search-icon" @click="onSearch"></div>
      </a-input>
    </div>

    <a-table
      :columns="columns"
      :data-source="list"
      :row-key="(record) => record.id"
      :pagination="pagination"
      :loading="loading"
    >
      <span slot="deployType" slot-scope="deployType">
        {{ deployType == 1 ? '可视化' : '组件' }}
      </span>
      <span slot="deployVersion" slot-scope="deployVersion">
        {{ !deployVersion && deployVersion !== 0 ? '--' : deployVersion }}
      </span>
      <span slot="deployTime" slot-scope="deployTime">
        {{ deployTime | formatDate() }}
      </span>
      <span slot="deployStatus">
        已发布
      </span>
      <span slot="action" slot-scope="text, record">
        <span class="top-icon copy-link" @click="copyLink(record)"></span>
        <span class="top-icon delete" @click="del(record)"></span>
      </span>
    </a-table>
  </div>
</template>

<script>
import { findDeployList, cancelDeploySingleDataView } from '@/api/myProject'
export default {
  name: 'release-management',
  components: {},
  data() {
    return {
      columns: [
        {
          title: '发布名称',
          dataIndex: 'deployName',
          key: 'deployName',
          align: 'center'
        },
        // {
        //   title: '类型',
        //   dataIndex: 'deployType',
        //   key: 'deployType',
        //   align: 'center',
        //   width: 100,
        //   scopedSlots: { customRender: 'deployType' }
        // },
        // {
        //   title: '地址',
        //   dataIndex: 'deployAddress',
        //   key: 'deployAddress',
        //   align: 'center',
        //   ellipsis: true
        // },
        {
          title: '发布时间',
          dataIndex: 'deployTime',
          key: 'deployTime',
          align: 'center',
          scopedSlots: { customRender: 'deployTime' }
        },
        // {
        //   title: '状态',
        //   dataIndex: 'deployStatus',
        //   key: 'deployStatus',
        //   align: 'center',
        //   width: 80,
        //   scopedSlots: { customRender: 'deployStatus' }
        // },
        {
          title: '发布版本号',
          dataIndex: 'deployVersion',
          key: 'deployVersion',
          align: 'center',
          scopedSlots: { customRender: 'deployVersion' }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ],
      list: [],
      deployVersion: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false
    }
  },
  props: {},
  computed: {
    pagination() {
      return {
        size: 'small',
        total: this.total,
        current: this.pageNum,
        pageSize: this.pageSize,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (page) => {
          this.changePage(page)
        }
      }
    }
  },
  watch: {},
  created() {
    this.queryDeployList()
  },
  mounted() {},
  methods: {
    addView() {},
    onSearch() {
      this.pageNum = 1
      this.queryDeployList()
    },
    async queryDeployList() {
      this.loading = true
      const { data } = await findDeployList({
        deployVersion: this.deployVersion,
        sourceId: this.$route.params?.id,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      this.list = data.list || []
      this.total = data.total
      this.loading = false
    },
    //删除发布
    del({ id }) {
      this.$confirm({
        title: '提示',
        content: '是否确认删除该发布吗？',
        onOk: async () => {
          await cancelDeploySingleDataView({ id })
          this.onSearch()
        },
        onCancel() {}
      })
    },
    //复制链接
    copyLink(item) {
      const prePath = process.env.NODE_ENV === 'production' ? '/datav' : ''
      const shareLink = `${location.origin + prePath}/show.html#show/${item.deployAddress}`
      this.$copyAction(shareLink)
    },
    changePage(page) {
      this.pageNum = page
      this.queryDeployList()
    }
  }
}
</script>
<style lang="scss" scoped>
.release-management {
  .top-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    &.copy-link {
      margin-right: 22px;
      background: url('~@/assets/home-project/copy_link.png') no-repeat;
      &:hover {
        background: url('~@/assets/home-project/copy_link_active.png') no-repeat;
      }
    }
    &.delete {
      background: url('~@/assets/home-project/delete.png') no-repeat;
      &:hover {
        background: url('~@/assets/home-project/delete_active.png') no-repeat;
      }
    }
  }

  .head {
    height: 36px;
    line-height: 36px;
    margin-bottom: 17px;
  }
}
</style>
