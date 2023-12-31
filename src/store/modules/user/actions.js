import storage from 'good-storage'
import { UID_KEY, TOKEN } from '@/utils'
import { notify, isDef } from '@/utils'
import { getUserDetail, getUserPlaylist } from "@/api"

export default {
  async login({ commit }, resp) {
    const error = () => {
      notify.error('登录失败，用户名或密码错误')
      return false
    }
    
    if (!isDef(resp.uid)) {
      return error()
    }

    try {
      const user = await getUserDetail(resp.uid)
      const { profile } = user
      
      profile.nickname = resp.nickname;
      profile.level = resp.level;
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
      storage.set(TOKEN, resp.access_token)
      storage.set('__role__', resp.level)
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
    storage.set(TOKEN, null)
    storage.set('__role__', null)
  }
}
