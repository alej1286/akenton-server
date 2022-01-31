import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

var moment = require('moment');  

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
  const { ordern, tipo, cantidad, inicio, fin, descr, bigbag } = req.body;
  const response = await pool.query(
    "INSERT INTO produccion (ordern,tipo,cantidad,inicio,fin,descr,bigbag) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [ordern, tipo, cantidad, inicio, fin, descr, bigbag]
  );
  res.json({
    message: "Produccion Added successfully",
    body: {
      produccion: { ordern, tipo, cantidad, inicio, fin, descr, bigbag },
      response: { response },
    },
  });

  substractFromInventory(tipo, cantidad);
};

export const updateProduccion = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { ordern, tipo, cantidad, inicio, fin, descr, bigbag } = req.body;

  const response = await pool.query(
    "UPDATE produccion SET ordern = $1, tipo = $2, cantidad = $3, inicio = $4, fin = $6, descr = $7, bigbag = $8 WHERE id = $8",
    [ordern, tipo, cantidad, inicio, fin, descr, id, bigbag]
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
  const { id, inicio, fin, client } = req.body;
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
  const { inicio, fin, client } = req.body;

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

export const decreaseBigbag = async (
  req: Request, res: Response
) => {
  const response: QueryResult = await pool.query(
    "UPDATE inventory SET in_stock = in_stock - 1 WHERE id = 1;UPDATE variables SET val = val + 1 WHERE id = 1"
  );
  const response2: QueryResult = await pool.query(
    "select * from variables where id = 1"
  );

  return res.json(response2.rows);
  //res.json(`bigbag decreased Successfully`);
}

export const getBigbagCounted = async (
  req: Request, res: Response
) => {
  const response2: QueryResult = await pool.query(
    "select * from variables where id = 1"
  );

  return res.json(response2.rows);
  //res.json(`bigbag decreased Successfully`);
}

export const getBigbagInStock = async (
  req: Request, res: Response
) => {

  const response3: QueryResult = await pool.query(
    "select in_stock from inventory where id = 1"
  );

  return res.json(response3.rows);
  //res.json(`bigbag decreased Successfully`);
}



export const substractFromInventory = async (
  tipoCont: number,
  cantTipoCont: number
  // tipoProduct: number
) => {
  if (tipoCont === 1) {
    //Bolsa 1.5Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Bolsas 1.5Lb Nat
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 3",
        [cantTipoCont]
      );
    //}
  }

  if (tipoCont === 2) {
    //Bolsa 1.5Lbs Org
    //for (let index = 0; index < cantTipoCont; index++) {
      //Bolsas 1.5Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 4",
        [cantTipoCont]
      );
    //}
  }

  if (tipoCont === 3) {
    //Bolsa 3Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Bolsas 3Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 5",
        [cantTipoCont]
      );
    //}
  }

  if (tipoCont === 4) {
    //Bolsa 5Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Bolsas 5Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 6",
        [cantTipoCont]
      );
    //}
  }

  if (tipoCont === 5) {
    //Pomo 2.7Lbs Org
    //for (let index = 0; index < cantTipoCont; index++) {
      //Pomos 2.7Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 7",
        [cantTipoCont]
      );
    //}
  }

  if (tipoCont === 6) {
    //Caja 1.5Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Caja
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont]
      );
      //Bolsas 1.5Lb Nat
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 3",
        [cantTipoCont * 12]
      );
    //}
  }

  if (tipoCont === 7) {
    //Caja 1.5Lbs Org
    //for (let index = 0; index < cantTipoCont; index++) {
      //Caja
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont]
      );
      //Bolsas 1.5Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 4",
        [cantTipoCont * 12]
      );
    //}
  }

  if (tipoCont === 8) {
    //Caja 3Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Caja
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont]
      );
      //Bolsas 3Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 5",
        [cantTipoCont * 9]
      );
    //}
  }

  if (tipoCont === 9) {
    //Caja 5Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Caja
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont]
      );
      //Bolsas 5Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 6",
        [cantTipoCont * 4]
      );
    //}
  }

  if (tipoCont === 10) {
    //Caja de Pomos 2.7Lbs Org
    //for (let index = 0; index < cantTipoCont; index++) {
      //Caja
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont]
      );
      //Pomos 2.7Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 7",
        [cantTipoCont * 6]
      );
      //tapas de Pomos 2.7Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 9",
        [cantTipoCont * 6]
      );
      //etiquetas de Pomos 2.7Lb Org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 8",
        [cantTipoCont * 6]
      );
    //}
  }

  if (tipoCont === 11) {
    //Pallet 1.5Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Pallet
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 10",
        [cantTipoCont]
      );

      //Cajas
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont * 80]
      );

      //bolsas 1.5Lb nat
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 3",
        [cantTipoCont * 80 * 12]
      );
    //}
  }

  if (tipoCont === 12) {
    //Pallet 1.5Lbs Org
    //for (let index = 0; index < cantTipoCont; index++) {
      //Pallet
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 10",
        [cantTipoCont]
      );

      //Cajas
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont * 80]
      );

      //bolsas 1.5Lb org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 4",
        [cantTipoCont * 80 * 12]
      );
    //}
  }

  if (tipoCont === 13) {
    //Pallet 3Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Pallet
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 10",
        [cantTipoCont]
      );

      //Cajas
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont * 72]
      );

      //bolsas 3Lb org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 5",
        [cantTipoCont * 72 * 9]
      );
    //}
  }

  if (tipoCont === 14) {
    //Pallet 5Lbs Nat
    //for (let index = 0; index < cantTipoCont; index++) {
      //Pallet
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 10",
        [cantTipoCont]
      );

      //Cajas
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont * 60]
      );

      //bolsas 5Lb nat
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 6",
        [cantTipoCont * 60 * 4]
      );
    //}
  }

  if (tipoCont === 15) {
    //Pallet 2.7Lbs Org
    //for (let index = 0; index < cantTipoCont; index++) {
      //Pallet
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 10",
        [cantTipoCont]
      );

      //Cajas
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 2",
        [cantTipoCont * 90]
      );

      //pomos 2.7Lb org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 7",
        [cantTipoCont * 90 * 6]
      );
      //etiquetas de pomos 2.7Lb org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 8",
        [cantTipoCont * 90 * 6]
      );
      //tapas de pomos 2.7Lb org
      await pool.query(
        "UPDATE inventory SET in_stock = in_stock - $1 WHERE id = 9",
        [cantTipoCont * 90 * 6]
      );
    //}
  }
};

export function getMonday(d: string | number | Date) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export const getWeekProductionStat = async (
  req: Request, res: Response
) => {
  var arr = new Array();
  var dataBb = new Array();
  var dataProd = new Array();

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* const d = new Date(); */



  let obj = {
    labels:arr,
    datasets:[
    {data:arr,label:'Big Bag'},
    {data:arr,label:'Produccion'}
  ]};

  /* {
    labels: [ 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Big Bag' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Produccion' }
    ]
  }; */

  //var startOfWeek = moment().startOf('isoweek').toDate();
  var startOfWeek = getMonday(new Date());
  //var endOfWeek   = moment().endOf('isoweek').toDate();
  var endOfWeek   = new Date();
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  console.log('startOfWeek:',startOfWeek);
  console.log('endOfWeek:',endOfWeek);
  
  
  var m = moment(startOfWeek);
/* 
  for (var m = moment(startOfWeek); m.isBefore(endOfWeek); m.add(1, 'days')) {
    obj.labels.push(m.format('ddd'));
  } */

  for (var d = startOfWeek; d <= endOfWeek; d.setDate(d.getDate() + 1)) {
    console.log(d.getDate());
    let next = new Date();
    next.setDate(d.getDate() + 1);
    console.log(weekday[d.getDay()]);
    obj.labels.push(weekday[d.getDay()]);

    const response: QueryResult = await pool.query(
      "select COUNT(DISTINCT bigbag)  from (select * from produccion where inicio between $1 and $2) as bb"
      ,[d.toISOString().slice(0, 19).replace('T', ' '),next.toISOString().slice(0, 19).replace('T', ' ')]
    );
    /* d.toISOString(),d.toISOString()+1 */

    console.log("select COUNT(DISTINCT bigbag)  from (select * from produccion where inicio between "+d.toISOString().slice(0, 19).replace('T', ' ')+" and "+next.toISOString().slice(0, 19).replace('T', ' ')+") as bb");
    
    
    //format(new Date("2020-01-01"), "MMMM do yyyy")
    dataBb.push(parseInt(response.rows[0].count));

  }
  
  /* for (var m = moment(startOfWeek); m.diff(endOfWeek, 'days') <= 0; m.add(1, 'days')) {
    console.log("m.format('YYYY-MM-DD'):",m.format('YYYY-MM-DD'));
    var next = moment(m);
    const response: QueryResult = await pool.query(
      "select COUNT(DISTINCT bigbag)  from (select * from produccion where inicio between $1 and $2) as bb"
      ,[m.format('YYYY-MM-DD'),next.add(1,'days').format('YYYY-MM-DD')]
    );
      console.log("select COUNT(DISTINCT bigbag)  from (select * from produccion where inicio between "+m.format('YYYY-MM-DD')+" and "+next.add(1,'days').format('YYYY-MM-DD')+") as bb");
    dataBb.push(response.rows[0].count)

    //console.log(m.format('YYYY-MM-DD'));
  } */

  obj.datasets[0].data = dataBb;
  obj.datasets[1].data = dataProd;



  //return res.json(response.rows);
  //res.json(`bigbag decreased Successfully`);
  return res.json(obj);
}
