import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let site = localStorage.getItem('site');
let user = localStorage.getItem('user');

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') || '',
    user: !user?'':JSON.parse(user) || '',
    //user: '',
    loading: false,
    showFooter: true,
    site: !site?'':JSON.parse(site) || [],

  },
  mutations: {
    saveAccssToken(state, code) {
      localStorage.setItem('accessToken', code)
      state.accessToken = code
    },
    saveUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    changeLoading(state) {
      state.loading = !state.loading
    },
    showFooter(state) {
      state.showFooter = !state.showFooter
    },
    saveSite(state, site) {
      localStorage.setItem('site', JSON.stringify(site))
      state.site = site
    }

  },
  actions: {
    saveAccssToken({ commit }, code) {
      commit('saveAccssToken', code)
    },
    saveUser({ commit }, user) {
      commit('saveUser', user)
    },
    saveSite({ commit }, site) {
      commit('saveSite', site)
    },
    login({ commit }, user) {
      commit('saveUser', user)
    },
    changeLoading({ commit }) {
      commit('changeLoading')
    },
    showFooter({ commit }) {
      commit('showFooter')
    }

  }

})
