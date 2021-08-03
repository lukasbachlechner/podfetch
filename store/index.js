export const state = () => ({
  categories: [],
});

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    await dispatch('getCategories');

    if (this.$auth.loggedIn && this.$auth.user) {
      commit('usermeta/INIT_USER_DATA');
    }
  },
  async getCategories({ commit }) {
    try {
      const categories = await this.$api.getCategories();
      commit('SET_CATEGORIES', categories);
    } catch (e) {
      console.error(e.message);
    }
  },
};

export const getters = {
  allCategories: (state) => state.categories,
  categoryBySlug: (state) => (slug) =>
    state.categories.find((category) => category.slug === slug),
};
