export const state = () => ({
  isDownloading: false,
  currentDownloads: [],
});

export const mutations = {
  SET_DOWNLOAD(state, episode) {
    episode.canDownload = true;
    state.currentDownloads.push(episode);
  },
  UPDATE_DOWNLOAD_PROGRESS(
    state,
    { episodeId, progress, progressBytes, totalBytes }
  ) {
    const episodeIndex = state.currentDownloads.findIndex(
      (download) => download.id === episodeId
    );

    const newEpisode = {
      ...state.currentDownloads[episodeIndex],
      downloadProgress: progress,
      downloadStarted: true,
      progressBytes,
      audioSize: totalBytes,
    };

    state.currentDownloads.splice(episodeIndex, 1, newEpisode);
  },
  SET_DOWNLOAD_ERROR(state, episodeId) {
    const episodeIndex = state.currentDownloads.findIndex(
      (download) => download.id === episodeId
    );

    state.currentDownloads.splice(episodeIndex, 1, {
      ...state.currentDownloads[episodeIndex],
      canDownload: false,
    });
  },

  RESET_DOWNLOAD_ERROR(state, episodeId) {
    const episodeIndex = state.currentDownloads.findIndex(
      (download) => download.id === episodeId
    );

    state.currentDownloads.splice(episodeIndex, 1, {
      ...state.currentDownloads[episodeIndex],
      canDownload: true,
    });
  },
};

export const actions = {
  async downloadEpisode({ commit, state, dispatch }, episode) {
    const episodeAlreadyDownloading =
      state.currentDownloads.findIndex(
        (download) => download.id === episode.id
      ) !== -1;

    if (episodeAlreadyDownloading) {
      return;
    }

    let proxyDownloadSuccess = true;
    let audioBlob = null;

    episode.downloadProgress = 0;
    commit('SET_DOWNLOAD', episode);
    try {
      const audioUrl =
        this.$config.apiUrl + 'audio/' + encodeURIComponent(episode.audioUrl);
      audioBlob = await dispatch('getEpisodeAsBlob', {
        episode,
        url: audioUrl,
      });
    } catch (e) {
      proxyDownloadSuccess = false;
    }

    if (!proxyDownloadSuccess) {
      try {
        audioBlob = await dispatch('getEpisodeAsBlob', {
          episode,
          url: episode.audioUrl,
        });
      } catch (e) {
        commit('SET_DOWNLOAD_ERROR', episode.id);
      }
    }

    console.log(audioBlob);
  },
  getEpisodeAsBlob({ commit }, { episode, url }) {
    console.log(url);
    return this.$axios.$get(url, {
      responseType: 'blob',
      withCredentials: false,
      onDownloadProgress: ({ loaded, total }) => {
        const currentProgress = loaded / total;
        commit('UPDATE_DOWNLOAD_PROGRESS', {
          episodeId: episode.id,
          progress: currentProgress,
          progressBytes: loaded,
          totalBytes: total,
        });
      },
    });
  },
};

export const getters = {
  currentDownloads: (state) => state.currentDownloads,
};
