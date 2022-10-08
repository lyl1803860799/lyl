import Cookies from 'js-cookie'
const user = {
  namespaced: true, //开启命名空间方便解耦，避免冲突 后面语法糖要加user,如果没设置就语法糖不用加user
  state: {
    useId: '',
    user_token: '',
    isAdmin: '',
    userName: '',
    nickName: ''
  },
  getters: {
    useId: (state) => state.useId,
    token: (state) => state.user_token,
    isAdmin: (state) => state.isAdmin,
    userName: (state) => state.userName,
    nickName: (state) => state.nickName
  },
  mutations: {
    SET_USE_ID: (state, useId) => {
      state.useId = useId
    },
    SET_TOKEN: (state, token) => {
      state.user_token = token
    },
    SET_IS_ADMIN: (state, isAdmin) => {
      state.isAdmin = isAdmin
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_NICK_NAME: (state, nickName) => {
      state.nickName = nickName
    }
  },
  actions: {
    //保存用户名登录信息
    saveLoginInfo({ commit }, userInfo) {
      console.log('userInfo',userInfo)
      commit('SET_USE_ID', userInfo.accountId)
      Cookies.set('useId', userInfo.accountId)
      commit('SET_NICK_NAME', userInfo.name)
      Cookies.set('nickName', userInfo.name)
      commit('SET_USER_NAME', userInfo.accountName)
      Cookies.set('userName', userInfo.accountName)
      if (userInfo.token) {
        const inFifteenMinutes = new Date(new Date().getTime() + 5 * 60 * 60 * 1000)
        commit('SET_TOKEN', userInfo.token)
        Cookies.set('user_token', userInfo.token, {
          expires: inFifteenMinutes
        })
      }
      // Cookies.set('isAdmin', userInfo.isAdmin)
    },
    //删除用户信息
    removeLoginInfo({ commit }) {
      commit('SET_USE_ID', '')
      Cookies.remove('useId')
      commit('SET_NICK_NAME', '')
      Cookies.remove('nickName')
      commit('SET_USER_NAME', '')
      Cookies.remove('userName')
      commit('SET_TOKEN', '')
      Cookies.remove('user_token')
    }
  }
}

export default user
