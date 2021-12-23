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

export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const createOrder = async (req: Request, res: Response) => {
    const { descr, tipo, pallets } = req.body;
    const response = await pool.query('INSERT INTO orders (descr, tipo, pallets) VALUES ($1, $2, $3)', [descr, tipo, pallets]);
    res.json({
        message: 'Order Added successfully',
        body: {
            user: { descr, tipo, pallets }
        }
    })
};

export const updateOrder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { descr, tipo, pallets } = req.body;

    const response = await pool.query('UPDATE orders SET descr = $1, tipo = $2, pallet = $3 WHERE id = $4', [
        descr, tipo, pallets, id
    ]);
    res.json('Order Updated Successfully');
};

export const deleteOrder = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM orders where id = $1', [
        id
    ]);
    res.json(`Order ${id} deleted Successfully`);
};