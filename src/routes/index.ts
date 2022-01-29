import {Router} from 'express';
const router = Router();

import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder, getTipos, getTipoById, createTipo, updateTipo, deleteTipo, getClients, getClientById, createClient, updateClient, deleteClient, getEstados, getEstadoById, createEstado, updateEstado, deleteEstado, getInventories, getInventoryById, createInventory, updateInventory, deleteInventory, getProduccion, getProduccionById, createProduccion, updateProduccion, deleteProduccion, getBigbag, getBigbagById, createBigbag, updateBigbag, deletebigbag, decreaseBigbag, getBigbagInStock, getWeekProductionStat } from '../controllers/index.controller';

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

router.get('/estados', getEstados);
router.get('/estados/:id', getEstadoById);
router.post('/estados', createEstado);
router.put('/estados/:id', updateEstado)
router.delete('/estados/:id', deleteEstado);

router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient)
router.delete('/clients/:id', deleteClient);

router.get('/inventories', getInventories);
router.get('/inventories/:id', getInventoryById);
router.post('/inventories', createInventory);
router.put('/inventories/:id', updateInventory)
router.delete('/inventories/:id', deleteInventory);

router.get('/produccion', getProduccion);
router.get('/produccion/:id', getProduccionById);
router.post('/produccion', createProduccion);
router.put('/produccion/:id', updateProduccion)
router.delete('/produccion/:id', deleteProduccion);

router.get('/bigbag', getBigbag);
router.get('/bigbag/:id', getBigbagById);
router.post('/bigbag', createBigbag);
router.put('/bigbag/:id', updateBigbag)
router.delete('/bigbag/:id', deletebigbag);
router.get('/decreasebigbag', decreaseBigbag);
router.get('/getbigbaginstock', getBigbagInStock);
router.get('/getweekproductionstat', getWeekProductionStat);


export default router;