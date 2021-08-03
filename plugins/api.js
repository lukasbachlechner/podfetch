export default function ({ $axios, $config, $auth, $storage }, inject) {
  class ApiClient {
    constructor() {
      this.client = $axios.create({
        baseURL: $config.apiUrl,
      });

      this.isOffline = false;

      if (process.client && 'onLine' in navigator) {
        this.isOffline = !navigator.onLine;

        window.addEventListener('online', (e) =>
          this.handleConnectionChange(e)
        );
        window.addEventListener('offline', (e) =>
          this.handleConnectionChange(e)
        );
      }
    }

    setToken() {
      this.client.setToken($auth.strategy.token.get());
    }

    handleConnectionChange({ type }) {
      if (type === 'offline') {
        console.info('%c[CONNECTION] You are offline.', 'color: yellow');
        this.isOffline = true;
      } else {
        console.info('%c[CONNECTION] You are back online!', 'color: green');
        this.isOffline = false;
      }
    }

    register(email, password, passwordConfirmation, categoryPreferences) {
      return this.client.$post('auth/register', {
        email,
        password,
        passwordConfirmation,
        categoryPreferences,
      });
    }

    checkEmail(email) {
      return this.client.$get('auth/check-email', {
        params: {
          email,
        },
      });
    }

    getStats() {
      return this.client.$get('stats');
    }

    getTrending(params) {
      return this.client.$get('podcasts/trending', { params });
    }

    getPodcastById(id) {
      return this.client.$get('podcasts/' + id);
    }

    getPodcastsByCategory(category) {
      return this.client.$get('podcasts/category/' + category.slug);
    }

    getEpisodesByPodcastId(id, page, perPage = 10) {
      return this.client.$get(`podcasts/${id}/episodes`, {
        params: {
          page,
          per_page: perPage,
        },
      });
    }

    getEpisodeById(id) {
      return this.client.$get('episodes/' + id);
    }

    getCategories() {
      return this.client.$get('categories');
    }

    search(term) {
      return this.client.$get('search', {
        params: {
          q: term,
        },
      });
    }

    subscribeToPodcast(podcastId) {
      return this.client.$post('subscriptions/subscribe', {
        podcastId,
      });
    }

    unsubscribeFromPodcast(podcastId) {
      return this.client.$delete('subscriptions/unsubscribe', {
        data: { podcastId },
      });
    }

    likeEpisode(episodeId) {
      return this.client.$post('likes/like', {
        episodeId,
      });
    }

    unlikeEpisode(episodeId) {
      return this.client.$delete('likes/unlike', {
        data: { episodeId },
      });
    }

    getRecentEpisodes() {
      return this.client.$get('user/recent-episodes');
    }

    getLikedEpisodes() {
      return this.client.$get('user/liked');
    }

    getSubscribedPodcasts() {
      return this.client.$get('user/subscribed');
    }

    getPersonalized(params) {
      return this.client.$get('user/personalized', { params });
    }

    async getLastPlayedEpisode() {
      if ($auth.loggedIn && !this.isOffline) {
        return await this.client.$get('user/last-playback');
      } else {
        return $storage.getLocalPlayback();
      }
    }

    setLastPlaybackTime(episodeId, episode, playbackTime = 0) {
      if ($auth.loggedIn && !this.isOffline) {
        const payload = {
          token: $auth.strategy.token.get(),
          playbackTime,
          episodeId,
        };
        this.sendBeacon($config.apiUrl + 'user/last-playback-time', payload);
      } else {
        $storage.setLocalPlayback(episode, playbackTime);
      }
    }

    sendBeacon(url, payload) {
      return navigator.sendBeacon(url, this.toFormData(payload));
    }

    toFormData(object) {
      return Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    }
  }
  const apiClient = new ApiClient();
  inject('api', apiClient);
}
