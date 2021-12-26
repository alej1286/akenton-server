import {Router} from 'express';
const router = Router();

import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, getTipos, getTipoById, createTipo, updateTipo, deleteTipo, getClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/index.controller';

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
router.get('/tipos/:id', getTipoById);
router.post('/tipos', createTipo);
router.put('/tipos/:id', updateTipo)
router.delete('/tipos/:id', deleteTipo);

router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient)
router.delete('/clients/:id', deleteClient);

export default router;