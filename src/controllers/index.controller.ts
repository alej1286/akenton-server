import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';

export const getOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM orders ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getTipos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM tipo ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getEstados = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM estado ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getClients = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM client ORDER BY id ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getTipoById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM tipo WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const getEstadoById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM estado WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const getClientById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM client WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const createOrder = async (req: Request, res: Response) => {
    const { client, tipo, cantidad, recogida, descr,estado } = req.body;
    const response = await pool.query('INSERT INTO orders (client, tipo, cantidad, recogida, descr) VALUES ($1, $2, $3, $4, $5, $6)', [client, tipo, cantidad, recogida, descr,estado]);
    res.json({
        message: 'Order Added successfully',
        body: {
            order: { client, tipo, cantidad, recogida, descr, estado },
            response : {response}
        }
    })
};

export const createTipo = async (req: Request, res: Response) => {
    const { descr } = req.body;
    const response = await pool.query('INSERT INTO tipo (descr) VALUES ($1)', [descr]);
    res.json({
        message: 'Tipo Added successfully',
        body: {
            tipo: { descr }
        }
    })
};

export const createEstado = async (req: Request, res: Response) => {
    const { descr } = req.body;
    const response = await pool.query('INSERT INTO estado (descr) VALUES ($1)', [descr]);
    res.json({
        message: 'Estado Added successfully',
        body: {
            tipo: { descr }
        }
    })
};

export const createClient = async (req: Request, res: Response) => {
    const { nombre } = req.body;
    const response = await pool.query('INSERT INTO client (nombre) VALUES ($1)', [nombre]);
    res.json({
        message: 'Client Added successfully',
        body: {
            client: { nombre }
        }
    })
};

export const updateOrder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { client, tipo, cantidad, descr, recogida, estado } = req.body;

    const response = await pool.query('UPDATE orders SET client = $1, tipo = $2, cantidad = $3, descr = $4, recogida = $6, estado = $7 WHERE id = $5', [
        client, tipo, cantidad, descr ,id, recogida, estado
    ]);
    res.json('Order Updated Successfully');
};

export const updateTipo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { descr } = req.body;

    const response = await pool.query('UPDATE tipo SET descr = $1 WHERE id = $2', [
         descr ,id
    ]);
    res.json('Tipo Updated Successfully');
};


export const updateEstado = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { descr } = req.body;

    const response = await pool.query('UPDATE estado SET descr = $1 WHERE id = $2', [
         descr ,id
    ]);
    res.json('Estado Updated Successfully');
};

export const updateClient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;

    const response = await pool.query('UPDATE client SET nombre = $1 WHERE id = $2', [
         nombre ,id
    ]);
    res.json('Client Updated Successfully');
};

export const deleteOrder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM orders where id = $1', [
        id
    ]);
    res.json(`Order ${id} deleted Successfully`);
};

export const deleteTipo = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM tipo where id = $1', [
        id
    ]);
    res.json(`tipo ${id} deleted Successfully`);
};

export const deleteEstado = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM estado where id = $1', [
        id
    ]);
    res.json(`Estado ${id} deleted Successfully`);
};

export const deleteClient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM client where id = $1', [
        id
    ]);
    res.json(`client ${id} deleted Successfully`);
};