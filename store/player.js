export const state = () => ({
  isPlaying: false,
  totalDuration: null,
  currentTime: null,
  currentEpisode: null,
  mobilePlayerOpen: false,
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
};

export const actions = {
  addEpisode({ commit }, episode) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: episode.title,
        artist: episode.podcastTitle,
        artwork: [
          {
            src: 'https://dummyimage.com/96x96',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      });
    }
    commit('SET_EPISODE', episode);
    commit('SET_PLAYING', false);
  },
};

export const getters = {
  isPlaying: (state) => state.isPlaying,
  mobilePlayerOpen: (state) => state.mobilePlayerOpen,
  totalDuration: (state) => state.totalDuration,
  currentTime: (state) => state.currentTime,
  currentEpisode: (state) => state.currentEpisode,
  hasEpisode: (state) => !!state.currentEpisode,
};
