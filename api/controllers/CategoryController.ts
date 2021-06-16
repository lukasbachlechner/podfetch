import { NextFunction, Request, Response } from 'express';
import Podcast from '../models/Podcast';
import ErrorResponse from '../models/ErrorResponse';
import Category from '../models/Category';
import { matchedData, validationResult } from 'express-validator';

class PodcastsController {
  public static async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next();
    }

    try {
      const { id } = matchedData(req);
      const category = await Category.find(id);
      res.send(category);
    } catch (e) {
      new ErrorResponse(res, 404, e.message);
    }
  }

  public static async findBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const category = await Category.find(slug);
      res.send(category);
    } catch (e) {
      new ErrorResponse(res, 404, e.message);
    }
  }

  public static async getAll(req: Request, res: Response) {
    const categories = await Category.all();
    res.send(categories);
  }
}

export default PodcastsController;
