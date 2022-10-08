import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
Vue.use(Vuex)

const state = {
  nodeList: [], //大屏分组
  componentList: [],
  // 只保留一步操作，仅支持添加/删除组件的撤回操作
  historyList: null,
  swipeEl: null,
  weatherCity:'上海',
  mtvMachineLimit:0
}

const mutations = {
  SET_NODE_LIST(state, list) {
    state.nodeList = list
  },
  SET_COMPONENT_LIST(state, list) {
    state.componentList = list
  },
  SET_HISTORY_LIST(state, list) {
    state.historyList = list
  },
  SET_SWIPE_EL(state, el) {
    state.swipeEl = el
  },
  SET_WEATHER_CITY(state, el) {
    state.weatherCity = el
  },
  SET_MTVMACHINELIMIT(state, el) {
    console.log('保存设备限制信息'+el)
    state.mtvMachineLimit = el
  },
}

const actions = {
  setNodeList({ commit }, list) {
    commit('SET_NODE_LIST', list)
  },
  setComponentList({ commit }, list) {
    commit('SET_COMPONENT_LIST', list)
  },
  setHistoryList({ commit }, list) {
    commit('SET_HISTORY_LIST', list)
  },
  setSwipeEl({ commit }, list) {
    commit('SET_SWIPE_EL', list)
  },
  setWeatherCity({ commit }, list) {
    commit('SET_WEATHER_CITY', list)
  },
  setMtvMachineLimit({ commit }, list) {
    commit('SET_MTVMACHINELIMIT', list)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user
  }
})
