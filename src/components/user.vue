<template>
  <div class="user">
    <!-- 登录前 -->
    <div @click="onOpenModal" class="login-trigger" v-if="!isLogin">
      <i class="user-icon iconfont icon-yonghu" />
      <p class="user-name">未登录</p>
    </div>
    <!-- 登录后 -->
    <div @click="onLogout" class="logined-user" v-else>
      <img v-lazy="$utils.genImgUrl(user.avatarUrl, 80)" class="avatar" />
      <p class="user-name">{{ user.nickname }}</p>
    </div>

    <!-- 登录框 -->
    <el-dialog
      :modal="false"
      :visible.sync="visible"
      :width="$utils.toRem(320)"
    >
      <p slot="title">{{this.isRegister ? "注册": "登录"}}</p>
      <div class="login" v-if="!isRegister">
        <div class="login-body">
          <el-input class="input" placeholder="电话号码" v-model="phone" />
          <el-input class="input" type="password" placeholder="密码" v-model="password" />
          <div class="register">
            <a @click="switchRegister()">没有账户？点击注册</a>
          </div>
        </div>
        <span class="dialog-footer" slot="footer">
          <el-button
            :loading="loading"
            @click="onLogin(null, phone, password)"
            class="login-btn"
            type="primary"
            >登 录</el-button
          >
        </span>
      </div>
      <div class="register" v-if="isRegister">
        <div class="register-body">
          <el-input class="input" placeholder="电话号码" v-model="phone" style="margin-bottom: 20px;" />
          <el-input class="input" type="password" placeholder="密码" v-model="password" style="margin-bottom: 20px;" />
          <el-input class="input" placeholder="昵称" v-model="nickname" style="margin-bottom: 20px;" />
          <!-- <el-input class="input" placeholder="性别" v-model="gender" style="margin-bottom: 20px;" /> -->
          <el-input class="input" placeholder="地址" v-model="address" style="margin-bottom: 20px;" />
          <!-- <el-input class="input" placeholder="网易云uid" v-model="uid" style="margin-bottom: 20px;" /> -->
          <div class="register">
            <a @click="switchRegister()">已有账户？点击登录</a>
          </div>
        </div>
        <span class="dialog-footer" slot="footer">
          <el-button
            :loading="loading"
            @click="onRegister(phone, password, nickname, address, uid)"
            class="login-btn"
            type="primary"
            >注册并登录</el-button
          >
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import storage from "good-storage"
import { TOKEN, isDef, myRequest } from "@/utils"
import { confirm } from "@/base/confirm"
import {
  mapActions as mapUserActions,
  mapState as mapUserState,
  mapGetters as mapUserGetters
} from "@/store/helper/user"

export default {
  //自动登录
  created() {
    const token = storage.get(TOKEN)
    if (isDef(token)) {
      this.onLogin(token)
    }
  },
  data() {
    return {
      visible: false,
      loading: false,
      isRegister: false,
      phone: "",
      nickname: "",
      password: "",
      uid: "8914255095",
      gender: "",
      address: "",
      token: ""
    }
  },
  methods: {
    switchRegister() {
      this.isRegister = !this.isRegister
    },
    onOpenModal() {
      this.visible = true
    },
    onCloseModal() {
      this.visible = false
    },
    async getUid(phone, password) {
      const resp = await myRequest.post('/login', {phone, password})
      return resp.data
    },
    async onLogin(token, phone, password) {
      let resp = {}
      if (token) {
        resp = await myRequest.post('/myInfo')
        resp = resp.data;
        resp.access_token = token;
      } else {
        resp = await this.getUid(phone, password)
      }
      this.loading = true
      const success = await this.login(resp).finally(() => {
        this.loading = false
      })
      if (success) {
        this.onCloseModal()
      }
      this.$router.push('/')
    },
    async onRegister(phone, password, nickname, address, uid) {
      let resp = await myRequest.post('/registration', {phone, password, nickname, address, uid})
      if(resp !== undefined) {
        await this.onLogin(resp.data.access_token, resp.data.phone, resp.data.password) //注意：目前后端registration接口不返回access_token，如果要做密码加密存储，记得改后端
      }
    },
    onLogout() {
      confirm("确定要注销吗？", () => {
        this.logout()
        this.$router.push('/')
      })
    },
    ...mapUserActions(["login", "logout"])
  },
  computed: {
    ...mapUserState(["user"]),
    ...mapUserGetters(["isLogin"])
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.user {
  padding: 16px;
  padding-bottom: 0;
  margin-bottom: 12px;

  .login-trigger {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-icon {
    font-size: 24px;
  }

  .user-name {
    margin-left: 8px;
  }

  .logout {
    transform: translateY(1px);
    margin-left: 8px;
    color: var(--font-color-shallow-grey);
  }

  .login-body {
    .input {
      margin-bottom: 16px;
    }

    .input {
      .input {
        margin-bottom: 40px;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 8px 0;
  }

  .logined-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      @include round(40px);
    }
  }
}
</style>
