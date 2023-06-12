import { Router } from 'express';
import { Controller } from './Controller.js';
import ensureAuthenticated from './ensureAuthenticated.js';

export const usersRouter = Router();
const controller = new Controller();

usersRouter.get('/', controller.get)
usersRouter.post('/', controller.create);
usersRouter.post('/login', controller.auth);
usersRouter.patch('/:id', controller.update);
usersRouter.delete('/:id', controller.delete);