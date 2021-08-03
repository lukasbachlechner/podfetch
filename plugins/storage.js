export default function ({ $localForage, $formatter, $api, app }, inject) {
  class StorageClient {
    constructor() {
      this.client = $localForage;
    }

    async estimate() {
      if (
        process.client &&
        'storage' in navigator &&
        'estimate' in navigator.storage
      ) {
        try {
          const { usage, quota } = await navigator.storage.estimate();
          const remaining = quota - usage;

          const usageMb = `${$formatter.megaBytes(usage, 0)} MB`;
          const quotaMb = `${$formatter.megaBytes(quota, 0)} MB`;

          return { usage, quota, remaining, usageMb, quotaMb };
        } catch (e) {
          console.log(e.message);
        }
      }
    }

    async setEpisode(episode, blob) {
      episode.blobSize = blob.size;
      const episodeDataResult = await this.client.savedEpisodeData.setItem(
        episode.id.toString(),
        episode
      );
      const audioFileResult = await this.client.savedAudioFiles.setItem(
        episode.id.toString(),
        blob
      );
      return episodeDataResult && audioFileResult;
    }

    async getAllEpisodes() {
      const keys = await this.client.savedEpisodeData.keys();

      const promisedEpisodes = keys.map((key) =>
        this.client.savedEpisodeData.getItem(key)
      );
      return await Promise.all(promisedEpisodes);
    }

    async getEpisode(episodeId) {
      const episode = await this.client.savedEpisodeData.getItem(
        episodeId.toString()
      );
      const audioFile = await this.client.savedAudioFiles.getItem(
        episodeId.toString()
      );

      if (!episode || !audioFile) {
        return false;
      }

      const audioUrl = URL.createObjectURL(audioFile);

      episode.audioUrl = audioUrl;

      return episode;
    }

    getLocalPlayback() {
      return JSON.parse(localStorage.getItem('lastPlayback'));
    }

    setLocalPlayback(episode, playbackTime) {
      localStorage.setItem(
        'lastPlayback',
        JSON.stringify({ episode, playbackTime })
      );
    }

    deleteLocalPlayback() {
      localStorage.removeItem('lastPlayback');
    }

    async deleteEpisode(episodeId) {
      const localPlayback = this.getLocalPlayback();

      if (
        localPlayback?.episode?.id === episodeId &&
        localPlayback?.episode?.audioUrl?.startsWith('blob:')
      ) {
        this.deleteLocalPlayback();
        app.store.commit('player/SET_EPISODE', null);
      }

      await this.client.savedEpisodeData.removeItem(episodeId.toString());
      await this.client.savedAudioFiles.removeItem(episodeId.toString());
    }

    async clearStorage() {
      const episodeDataCleared = await this.client.savedEpisodeData.clear();
      const audioFilesCleared = await this.client.savedAudioFiles.clear();

      app.store.commit('downloader/CLEAR_DOWNLOADED_EPISODES');
      if (
        app.store.getters['player/currentEpisode']?.audioUrl?.startsWith(
          'blob:'
        )
      ) {
        app.store.commit('player/SET_EPISODE', null);
      }

      return episodeDataCleared && audioFilesCleared;
    }
  }

  const storageClient = new StorageClient();
  inject('storage', storageClient);
}
