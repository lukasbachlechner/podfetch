import { PIApiPodcast } from 'podcastdx-client/dist/src/types';
import podcastIndexClient from '../clients/PodcastClient';

class Podcast {
  public id: number;
  public title: string;
  public link: string;
  public description: string;
  public author: string;
  public image: string;
  public artwork: string;
  public language: string;
  public categories: { [p: string]: string } | null;

  constructor(podcast: PIApiPodcast) {
    this.id = podcast.id;
    this.title = podcast.title;
    this.link = podcast.link;
    this.description = podcast.description;
    this.author = podcast.author;
    this.image = podcast.image;
    this.artwork = podcast.artwork;
    this.language = podcast.language;
    this.categories = podcast.categories;
  }

  public static async find(id: any) {
    const { feed } = await podcastIndexClient.podcastById(id);

    if (!feed.id) {
      throw new Error('No podcast found with this id.');
    }

    return new Podcast(feed);
  }

  public static async trending() {
    const { feeds } = await podcastIndexClient.raw('/podcasts/trending', {
      lang: 'de',
    });

    return feeds.map((feed: PIApiPodcast) => new Podcast(feed));
  }
}

export default Podcast;
