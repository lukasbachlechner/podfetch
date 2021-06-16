import PodcastIndexClient from 'podcastdx-client';

const podcastIndexClient = new PodcastIndexClient({
  key: process.env.PI_API_KEY,
  secret: process.env.PI_API_SECRET,
  disableAnalytics: true,
});

export default podcastIndexClient;
