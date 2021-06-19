export default function ({ $axios }, inject) {
  class ApiClient {
    constructor() {
      this.client = $axios.create();
    }

    getStats() {
      return this.client.$get('http://api.podfetch.app/v1/podcasts/stats');
    }
  }
  const apiClient = new ApiClient();
  inject('api', apiClient);
}
