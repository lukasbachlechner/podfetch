export default function ({ $axios, $config }, inject) {
  class ApiClient {
    constructor() {
      this.client = $axios.create({
        baseURL: $config.apiUrl,
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

    getEpisodesByPodcastId(id, page, perPage = 10) {
      return this.client.$get(`podcasts/${id}/episodes`, {
        params: {
          page,
          per_page: perPage,
        },
      });
    }
  }
  const apiClient = new ApiClient();
  inject('api', apiClient);
}
