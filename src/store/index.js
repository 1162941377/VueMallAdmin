import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    menuRoutes: [],
    data: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
  modules: {
  },
});
