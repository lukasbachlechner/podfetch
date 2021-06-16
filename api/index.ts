import express, { Application } from 'express';
import PodcastsController from './controllers/PodcastsController';
import CategoryController from './controllers/CategoryController';
import { checkSchema } from 'express-validator';

import helmet from 'helmet';
import cors from 'cors';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/podcasts/trending', PodcastsController.getTrending);
app.get('/podcasts/:id', PodcastsController.findById);

app.get('/categories', CategoryController.getAll);
app.get(
  '/categories/:id',
  checkSchema({
    id: {
      in: ['params'],
      isInt: true,
      toInt: true,
    },
  }),
  CategoryController.findById
);

app.get('/categories/:slug', CategoryController.findBySlug);

export default {
  path: '/api/',
  handler: app,
};
