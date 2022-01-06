import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM orders ORDER BY id ASC"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getTipos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM tipo ORDER BY id ASC"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getEstados = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM estado ORDER BY id ASC"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getClients = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM client ORDER BY id ASC"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getInventories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM inventory ORDER BY id ASC"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getTipoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query(
    "SELECT * FROM tipo WHERE id = $1",
    [id]
  );
  return res.json(response.rows);
};

export const getEstadoById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query(
    "SELECT * FROM estado WHERE id = $1",
    [id]
  );
  return res.json(response.rows);
};

export const getClientById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query(
    "SELECT * FROM client WHERE id = $1",
    [id]
  );
  return res.json(response.rows);
};

export const getInventoryById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query(
    "SELECT * FROM inventory WHERE id = $1",
    [id]
  );
  return res.json(response.rows);
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query(
    "SELECT * FROM orders WHERE id = $1",
    [id]
  );
  return res.json(response.rows);
};

export const createOrder = async (req: Request, res: Response) => {
  const { client, tipo, cantidad, recogida, descr, estado, terminada } =
    req.body;
  const response = await pool.query(
    "INSERT INTO orders (client, tipo, cantidad, recogida, descr, estado, terminada) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [client, tipo, cantidad, recogida, descr, estado, terminada]
  );
  res.json({
    message: "Order Added successfully",
    body: {
      order: { client, tipo, cantidad, recogida, descr, estado, terminada },
      response: { response },
    },
  });
};

export const createTipo = async (req: Request, res: Response) => {
  const { descr } = req.body;
  const response = await pool.query("INSERT INTO tipo (descr) VALUES ($1)", [
    descr,
  ]);
  res.json({
    message: "Tipo Added successfully",
    body: {
      tipo: { descr },
    },
  });
};

export const createEstado = async (req: Request, res: Response) => {
  const { descr } = req.body;
  const response = await pool.query("INSERT INTO estado (descr) VALUES ($1)", [
    descr,
  ]);
  res.json({
    message: "Estado Added successfully",
    body: {
      tipo: { descr },
    },
  });
};

export const createClient = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  const response = await pool.query("INSERT INTO client (nombre) VALUES ($1)", [
    nombre,
  ]);
  res.json({
    message: "Client Added successfully",
    body: {
      client: { nombre },
    },
  });
};

export const createInventory = async (req: Request, res: Response) => {
  const { nombre, in_stock, notify } = req.body;
  const response = await pool.query(
    "INSERT INTO client (nombre,in_stock, notify) VALUES ($1,$2,$3)",
    [nombre, in_stock, notify]
  );
  res.json({
    message: "Inventory Added successfully",
    body: {
      inventory: { nombre, in_stock, notify },
    },
  });
};

export const updateOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { client, tipo, cantidad, descr, recogida, estado, terminada } =
    req.body;

  const response = await pool.query(
    "UPDATE orders SET client = $1, tipo = $2, cantidad = $3, descr = $4, recogida = $6, estado = $7, terminada = $8 WHERE id = $5",
    [client, tipo, cantidad, descr, id, recogida, estado, terminada]
  );
  res.json("Order Updated Successfully");
};

export const updateTipo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { descr } = req.body;

  const response = await pool.query(
    "UPDATE tipo SET descr = $1 WHERE id = $2",
    [descr, id]
  );
  res.json("Tipo Updated Successfully");
};

export const updateEstado = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { descr } = req.body;

  const response = await pool.query(
    "UPDATE estado SET descr = $1 WHERE id = $2",
    [descr, id]
  );
  res.json("Estado Updated Successfully");
};

export const updateClient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;

  const response = await pool.query(
    "UPDATE client SET nombre = $1 WHERE id = $2",
    [nombre, id]
  );
  res.json("Client Updated Successfully");
};

export const updateInventory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nombre, in_stock, notify } = req.body;

  const response = await pool.query(
    "UPDATE inventory SET nombre = $1,in_stock = $3,notify = $4 WHERE id = $2",
    [nombre, id, in_stock, notify]
  );
  res.json("Inventory Updated Successfully");
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM orders where id = $1", [id]);
  res.json(`Order ${id} deleted Successfully`);
};

export const deleteTipo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM tipo where id = $1", [id]);
  res.json(`tipo ${id} deleted Successfully`);
};

export const deleteEstado = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM estado where id = $1", [id]);
  res.json(`Estado ${id} deleted Successfully`);
};

export const deleteClient = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM client where id = $1", [id]);
  res.json(`client ${id} deleted Successfully`);
};

export const deleteInventory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM inventory where id = $1", [id]);
  res.json(`inventory ${id} deleted Successfully`);
};



//---------

export const getProduccion = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const response: QueryResult = await pool.query(
        "SELECT * FROM produccion ORDER BY id ASC"
      );
      return res.status(200).json(response.rows);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Internal Server error");
    }
  };
  
  
  export const getProduccionById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
      "SELECT * FROM produccion WHERE id = $1",
      [id]
    );
    return res.json(response.rows);
  };
  
  export const createProduccion = async (req: Request, res: Response) => {
    const { ordern,tipo,cantidad,inicio,fin,descr,bigbag } =
      req.body;
    const response = await pool.query(
      "INSERT INTO produccion (ordern,tipo,cantidad,inicio,fin,descr,bigbag) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [ordern,tipo,cantidad,inicio,fin,descr,bigbag]
    );
    res.json({
      message: "Produccion Added successfully",
      body: {
        produccion: { ordern,tipo,cantidad,inicio,fin,descr, bigbag },
        response: { response },
      },
    });
  };
  
  export const updateProduccion = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { ordern,tipo,cantidad,inicio,fin,descr, bigbag } =
      req.body;
  
    const response = await pool.query(
      "UPDATE produccion SET ordern = $1, tipo = $2, cantidad = $3, inicio = $4, fin = $6, descr = $7, bigbag = $8 WHERE id = $8",
      [ordern,tipo,cantidad,inicio,fin,descr,id, bigbag]
    );
    res.json("produccion Updated Successfully");
  };
  
  export const deleteProduccion = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM produccion where id = $1", [id]);
    res.json(`produccion ${id} deleted Successfully`);
  };

  //----------------------------------------
  
//---------

export const getBigbag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT * FROM bigbag ORDER BY id ASC"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};


export const getBigbagById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const response: QueryResult = await pool.query(
    "SELECT * FROM bigbag WHERE id = $1",
    [id]
  );
  return res.json(response.rows);
};

export const createBigbag = async (req: Request, res: Response) => {
  const { id, inicio, fin, client } =
    req.body;
  const response = await pool.query(
    "INSERT INTO bigbag (id, inicio, fin, client) VALUES ($1, $2, $3, $4)",
    [id, inicio, fin, client]
  );
  res.json({
    message: "Bigbag Added successfully",
    body: {
      bigbag: { id, inicio, fin, client },
      response: { response },
    },
  });
};

export const updateBigbag = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const {inicio, fin, client } =
    req.body;

  const response = await pool.query(
    "UPDATE bigbag SET inicio = $2, fin = $3, client = $4 WHERE id = $1",
    [id, inicio, fin, client]
  );
  res.json("bigbag Updated Successfully");
};

export const deletebigbag = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM bigbag where id = $1", [id]);
  res.json(`bigbag ${id} deleted Successfully`);
};