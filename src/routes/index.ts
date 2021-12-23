import {Router} from 'express';
const router = Router();

import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, getTipos } from '../controllers/index.controller';

router.get('/', (req, res) => {
    res.send('<h1>This is the main /</h1>');
    console.log("Database_URL", process.env.DATABASE_URL);
    getOrders
});
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder)
router.delete('/orders/:id', deleteOrder);
router.get('/tipos', getTipos);

export default router;