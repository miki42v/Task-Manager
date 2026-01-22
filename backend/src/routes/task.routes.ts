import { Router } from 'express';
import { taskController } from '../controllers/task.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All task routes are protected
router.use(authMiddleware);

router.get('/', (req, res) => taskController.getTasks(req, res));
router.post('/', (req, res) => taskController.createTask(req, res));
router.get('/:id', (req, res) => taskController.getTaskById(req, res));
router.patch('/:id', (req, res) => taskController.updateTask(req, res));
router.patch('/:id/toggle', (req, res) => taskController.toggleTaskStatus(req, res));
router.delete('/:id', (req, res) => taskController.deleteTask(req, res));

export default router;
