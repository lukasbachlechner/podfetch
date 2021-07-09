export const state = () => ({
  isLoading: false,
});

export const mutations = {
  TOGGLE_LOADING(state) {
    state.isLoading = !state.isLoading;
  },
};

export const getters = {
  isLoading: (state) => state.isLoading,
};
