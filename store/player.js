export const state = () => ({
  isPlaying: false,
  episodeLoading: false,
  totalDuration: null,
  currentTime: null,
  currentEpisode: null,
  mobilePlayerOpen: false,
  lastPlayedEpisodeUrl: null,
  lastPlaybackTime: null,
});

export const mutations = {
  SET_PLAYING(state, playing = true) {
    state.isPlaying = playing;
  },

  SET_DURATION(state, duration) {
    state.totalDuration = duration;
  },

  SET_CURRENT_TIME(state, time) {
    state.currentTime = time;
  },

  SET_EPISODE(state, episode) {
    state.currentEpisode = episode;
  },

  SET_MOBILE_PLAYER(state, open = false) {
    state.mobilePlayerOpen = open;
  },
  SET_LAST_PLAYED_EPISODE_URL(state, episodeUrl) {
    state.lastPlayedEpisodeUrl = episodeUrl;
  },
  SET_LAST_PLAYBACK_TIME(state, playbackTime) {
    state.lastPlaybackTime = playbackTime;
  },
  SET_EPISODE_LOADING(state, isLoading = true) {
    state.episodeLoading = isLoading;
  },
};

export const actions = {
  async addEpisode({ commit, state }, episode) {
    commit('SET_EPISODE_LOADING', true);
    const savedEpisode = await this.$storage.getEpisode(episode.id);
    if (savedEpisode) {
      commit('SET_EPISODE', savedEpisode);
    } else {
      commit('SET_EPISODE', episode);
    }
    commit('SET_PLAYING', false);

    if (episode.audioUrl !== state.lastPlayedEpisodeUrl) {
      commit('SET_LAST_PLAYED_EPISODE_URL', null);
    }
  },
  async getLastPlayedEpisode({ commit }) {
    const episodeData = await this.$api.getLastPlayedEpisode();

    if (episodeData) {
      const { episode, playbackTime = 0 } = episodeData;

      const savedEpisode = await this.$storage.getEpisode(episode.id);
      if (savedEpisode) {
        commit('SET_EPISODE', savedEpisode);
        commit('SET_LAST_PLAYED_EPISODE_URL', savedEpisode.audioUrl);
      } else {
        commit('SET_EPISODE', episode);
        commit('SET_LAST_PLAYED_EPISODE_URL', episode.audioUrl);
      }

      commit('SET_LAST_PLAYBACK_TIME', playbackTime);
    }
  },
};

export const getters = {
  isPlaying: (state) => state.isPlaying,
  mobilePlayerOpen: (state) => state.mobilePlayerOpen,
  totalDuration: (state) => state.totalDuration,
  currentTime: (state) => state.currentTime,
  currentEpisode: (state) => state.currentEpisode,
  hasEpisode: (state) => !!state.currentEpisode,
  isLastPlayedEpisode: (state) =>
    state.currentEpisode.audioUrl === state.lastPlayedEpisodeUrl,
  lastPlaybackTime: (state) => state.lastPlaybackTime,
  episodeLoading: (state) => state.episodeLoading,
};
