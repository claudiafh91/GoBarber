import { Router } from 'express';
import multer from 'multer';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import MeetupsController from './app/controllers/MeetupsController';
import BannerController from './app/controllers/BannerController';
import SubscriptionController from './app/controllers/SubscriptionsController';
import EventsController from './app/controllers/EventsController';

import authMiddeware from './app/middleware/authValid';
import multerConfig from './config/multerconfig';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/user-registrer', UsersController.store);
routes.post('/user-login', SessionController.store);

routes.use(authMiddeware);

routes.post('/banner', uploads.single('file'), BannerController.store);
routes.post('/cadastro-meetup', MeetupsController.store);
routes.post('/subscription/:id', SubscriptionController.store);

routes.get('/my-meetups', MeetupsController.index);
routes.get('/subscriptions', SubscriptionController.index);
routes.get('/meetups', EventsController.index);

routes.put('/user', UsersController.update);
routes.put('/update-meetup/:id', MeetupsController.update);

routes.delete('/canceled-meetup/:id', MeetupsController.delete);
routes.delete('/canceled-subscription/:id', SubscriptionController.delete);

export default routes;
