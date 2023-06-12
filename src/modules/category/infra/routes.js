import { Router } from 'express';
import { Controller } from './Controller.js';
import ensureAuthenticated from '../../users/infra/ensureAuthenticated.js';

export const categoryRouter = Router();
const controller = new Controller()

categoryRouter.get('/', controller.get);
categoryRouter.post('/', controller.create);
categoryRouter.patch('/:id', controller.update);
categoryRouter.delete('/:id', controller.delete);