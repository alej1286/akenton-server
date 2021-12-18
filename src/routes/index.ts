import {Router} from 'express';
const router = Router();

import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/index.controller';

router.get('/', (req, res) => {
    res.send('<h1>This is the main /</h1>')
});
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder)
router.delete('/orders/:id', deleteOrder);

export default router;