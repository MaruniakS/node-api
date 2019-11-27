import { Router } from 'express';
import ItemController from '../controllers/item.controller';

const router = Router();

router.get('/', ItemController.getAllItems);
router.post('/', ItemController.addItem);
router.get('/:id', ItemController.getItem);
router.put('/:id', ItemController.updatedItem);
router.delete('/:id', ItemController.deleteItem);

export default router;