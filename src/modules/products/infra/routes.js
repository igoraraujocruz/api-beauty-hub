import { Router } from 'express';
import { Controller } from './Controller.js';
import ensureAuthenticated from '../../users/infra/ensureAuthenticated.js';

export const productsRouter = Router();
const controller = new Controller()

productsRouter.get('/', controller.get);
productsRouter.post('/', controller.create);
productsRouter.patch('/:id', controller.update);
productsRouter.delete('/:id', controller.delete);

