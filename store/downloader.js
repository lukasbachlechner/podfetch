export const state = () => ({
  isDownloading: false,
  storageEstimate: null,
  currentDownloads: [],
  downloadedEpisodes: [],
});

export const mutations = {
  SET_IS_DOWNLOADING(state, isDownloading = true) {
    state.isDownloading = isDownloading;
  },
  SET_DOWNLOAD(state, episode) {
    episode.canDownload = true;
    state.currentDownloads.push(episode);
  },
  REMOVE_DOWNLOAD(state, episodeId) {
    const episodeIndex = state.currentDownloads.findIndex(
      (download) => download.id === episodeId
    );

    state.currentDownloads.splice(episodeIndex);
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

  SET_DOWNLOADED_EPISODE(state, episode) {
    state.downloadedEpisodes.push(episode);
  },

  REMOVE_DOWNLOADED_EPISODE(state, episodeId) {
    const episodeIndex = state.downloadedEpisodes.findIndex(
      (episode) => episode.id === episodeId
    );
    state.downloadedEpisodes.splice(episodeIndex, 1);
  },

  SET_STORAGE_ESTIMATE(state, storageEstimate) {
    state.storageEstimate = storageEstimate;
  },
};

export const actions = {
  async downloadEpisode({ commit, state, dispatch }, episode) {
    commit('SET_IS_DOWNLOADING');
    const storageEstimate = await this.$storage.estimate();

    if (episode.audioSize >= storageEstimate?.remaining) {
      this.$notify(
        'Downloading this episode exceeds your storage quota.',
        'error'
      );
      return;
    }

    const episodeAlreadyDownloading =
      state.currentDownloads.findIndex(
        (download) => download.id === episode.id
      ) !== -1;

    const episodeAlreadyDownloaded =
      state.downloadedEpisodes.findIndex(
        (downloadedEpisode) => downloadedEpisode.id === episode.id
      ) !== -1;

    if (episodeAlreadyDownloading || episodeAlreadyDownloaded) {
      this.$notify(`"${episode.title}" is already downloaded.`, 'error');
      return;
    }

    let downloadSuccess = true;
    let audioBlob = null;

    episode.downloadProgress = 0;
    commit('SET_DOWNLOAD', episode);
    try {
      audioBlob = await dispatch('getEpisodeAsBlob', {
        episode,
        url: episode.audioUrl,
      });
    } catch (e) {
      downloadSuccess = false;
    }

    if (!downloadSuccess) {
      try {
        const audioUrl =
          this.$config.apiUrl + 'audio/' + encodeURIComponent(episode.audioUrl);
        audioBlob = await dispatch('getEpisodeAsBlob', {
          episode,
          url: audioUrl,
        });
        downloadSuccess = true;
      } catch (e) {
        commit('SET_DOWNLOAD_ERROR', episode.id);
      }
    }

    if (downloadSuccess) {
      await dispatch('saveEpisode', { episode, blob: audioBlob });
    } else {
      commit('REMOVE_DOWNLOAD', episode.id);
      this.$notify("Sorry, we couldn't download this episode.", 'error');
    }

    commit('SET_IS_DOWNLOADING', false);
  },
  getEpisodeAsBlob({ commit }, { episode, url }) {
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
  async saveEpisode({ commit, dispatch }, { episode, blob }) {
    commit('REMOVE_DOWNLOAD', episode.id);
    delete episode.canDownload;
    delete episode.downloadProgress;
    commit('SET_DOWNLOADED_EPISODE', episode);

    await this.$storage.setEpisode(episode, blob);

    await dispatch('getStorageEstimate');
  },
  async getAllSavedEpisodes({ commit }) {
    const episodes = await this.$storage.getAllEpisodes();
    episodes.forEach((episode) => {
      commit('SET_DOWNLOADED_EPISODE', episode);
    });
  },
  async getStorageEstimate({ commit }) {
    const storageEstimate = await this.$storage.estimate();
    if (storageEstimate) {
      commit('SET_STORAGE_ESTIMATE', storageEstimate);
    }
  },
  async deleteEpisode({ commit, dispatch }, episodeId) {
    await this.$storage.deleteEpisode(episodeId);
    commit('REMOVE_DOWNLOADED_EPISODE', episodeId);
    await dispatch('getStorageEstimate');
  },
};

export const getters = {
  isDownloading: (state) => state.isDownloading,
  currentDownloads: (state) => state.currentDownloads,
  downloadedEpisodes: (state) => state.downloadedEpisodes,
  storageEstimate: (state) => state.storageEstimate,
  isEpisodeDownloaded: (state) => (episodeId) =>
    state.downloadedEpisodes.findIndex(
      (episode) => episode.id === episodeId
    ) !== -1,
};
