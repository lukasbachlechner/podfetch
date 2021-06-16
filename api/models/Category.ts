import { PIApiCategory } from 'podcastdx-client/dist/src/types';
import podcastIndexClient from '../clients/PodcastClient';
import slugify from 'slugify';

export default class Category {
  public id: number;
  public name: string;
  public slug: any;

  constructor(category: PIApiCategory) {
    this.id = category.id;
    this.name = category.name;
    this.slug = Category.toSlug(category.name);
  }

  public static toSlug(name: string) {
    return slugify(name, {
      lower: true,
    });
  }

  public static async all() {
    const { feeds } = await podcastIndexClient.categories();

    return feeds.map((feed: PIApiCategory) => new Category(feed));
  }

  public static async find(idOrSlug: number | string) {
    const categories = await Category.all();
    const foundCategory = categories.find(
      (category) => category.id === idOrSlug || category.slug === idOrSlug
    );

    if (!foundCategory) {
      throw new Error('No category found.');
    }

    return foundCategory;
  }
}
