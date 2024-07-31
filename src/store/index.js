import { createStore } from 'vuex';

const store = createStore({
  state: {
    globalState: {
        t: '',
        isAuthenticated: false,
        flagEmpty: false
      }
  },
  mutations: {
    updateT(state, newToken) {
      state.globalState.t = newToken;
    },
    setAuthState(state, isAuthenticated) {
      state.globalState.isAuthenticated = isAuthenticated;
    },
    setEmptyFlag(state, newValue) {
      state.globalState.flagEmpty = newValue;
    }
  },
});

export default store;

