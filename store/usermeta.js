export const state = () => ({
  categoryPreferences: [],
  playedEpisodes: [],
  likedEpisodes: [],
  subscribedPodcasts: [],
});

export const mutations = {
  INIT_USER_DATA(state) {
    const {
      category_preferences: categoryPreferences,
      playedEpisodes,
      likedEpisodes,
      subscribedPodcasts,
    } = this.$auth.user;
    state.categoryPreferences = categoryPreferences;
    state.playedEpisodes = playedEpisodes;
    state.likedEpisodes = likedEpisodes;
    state.subscribedPodcasts = subscribedPodcasts;
  },
  SET_SUBSCRIBED_PODCAST(state, podcastSubscription) {
    state.subscribedPodcasts.push(podcastSubscription);
  },
  REMOVE_SUBSCRIBED_PODCAST(state, podcastId) {
    const subscriptionIndex = state.subscribedPodcasts.findIndex(
      (subscription) => subscription.podcast_id === podcastId
    );
    state.subscribedPodcasts.splice(subscriptionIndex, 1);
  },
  SET_LIKED_EPISODE(state, likedEpisode) {
    state.likedEpisodes.push(likedEpisode);
  },
  REMOVE_LIKED_EPISODE(state, episodeId) {
    const episodeIndex = state.likedEpisodes.findIndex(
      (subscription) => subscription.episode_id === episodeId
    );
    state.likedEpisodes.splice(episodeIndex, 1);
  },
};

export const actions = {};

export const getters = {
  isPodcastSubscribed: (state) => (podcastId) =>
    state.subscribedPodcasts.findIndex(
      (subscription) => parseInt(subscription.podcast_id) === podcastId
    ) !== -1,
  isEpisodeLiked: (state) => (episodeId) =>
    state.likedEpisodes.findIndex(
      (episode) => parseInt(episode.episode_id) === episodeId
    ) !== -1,
};
