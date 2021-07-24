export default function ({ $axios, $config }, inject) {
  class ApiClient {
    constructor() {
      this.client = $axios.create({
        baseURL: $config.apiUrl,
      });
    }

    register(email, password, passwordConfirmation) {
      return this.client.$post('auth/register', {
        email,
        password,
        passwordConfirmation,
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
  }
  const apiClient = new ApiClient();
  inject('api', apiClient);
}
