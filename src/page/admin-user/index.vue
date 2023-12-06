<template>
  <div class="admin-user">
    <el-table
    :data="users"
    style="width: 100%"
    :default-sort = "{prop: 'id', order: 'descending'}"
    >
    <el-table-column
      prop="id"
      label="ID"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="身份"
      :formatter="formatter">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.level ? 'primary' : 'success'"
          disable-transitions>{{scope.row.level ? '管理员': '用户'}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { myRequest } from '@/utils'

export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    async getUsers() {
      let resp = await myRequest.get('/userList');
      this.users = resp.data;
      this.users.forEach(user => {
      })
    }
  },
  mounted() {
    this.getUsers();
  }
}
</script>

<style lang="scss" scoped>
.admin-user {
  padding: 50px;
}
</style>
