<template>
  <div class="admin-user">
    <el-table
    :data="users"
    style="width: 100%"
    >
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
        size="mini"
        type="primary"
        @click="modifyUser(scope.$index)">修改权限</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { myRequest } from '@/utils'
import { confirm } from "@/base/confirm"
import { notify } from '@/utils'

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
    },
    modifyUser(x) {
      confirm(`是否将该用户权限修改为${this.users[x].level ? "普通用户": "管理员"}？`, async () => {
        this.users[x].level = !this.users[x].level;
        const resp = await myRequest.put(`/user/${this.users[x].id}`, {level: this.users[x].level})
        notify.success('修改成功，现在是' + (resp.data.level ? "管理员": "普通用户"))
      });
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
