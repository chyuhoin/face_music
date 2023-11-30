import storage from 'good-storage'
import { UID_KEY } from '@/utils'
import { notify, isDef } from '@/utils'
import { getUserDetail, getUserPlaylist } from "@/api"

export default {
  async login({ commit }, resp) {
    const error = () => {
      notify.error('登录失败，请输入正确的uid。')
      return false
    }
    console.log(resp)
    
    if (!isDef(resp.uid)) {
      return error()
    }

    try {
      const user = await getUserDetail(resp.uid)
      const { profile } = user
      
      profile.nickname = resp.nickname;
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
      storage.set(TOKEN, resp.token)
    } catch (e) {
      return error()
    }

    const { playlist } = await getUserPlaylist(resp.uid)
    commit('setUserPlaylist', playlist)
    return true
  },
  logout({ commit }) {
    commit('setUser', {})
    commit('setUserPlaylist', [])
    storage.set(UID_KEY, null)
  }
}
