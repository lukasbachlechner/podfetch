import { Request, Response } from 'express';
import Podcast from '../models/Podcast';
import ErrorResponse from '../models/ErrorResponse';

class PodcastsController {
  public static async findById(req: Request, res: Response) {
    try {
      const podcast = await Podcast.find(req.params.id);
      res.send(podcast);
    } catch (e) {
      new ErrorResponse(res, 404, e.message);
    }
  }

  public static async getTrending(req: Request, res: Response) {
    try {
      const podcasts = await Podcast.trending();
      res.send(podcasts);
    } catch (e) {
      new ErrorResponse(res, 404, e.message);
    }
  }
}

export default PodcastsController;
