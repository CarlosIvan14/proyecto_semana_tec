import {pool} from '../db_connection.js';

const get_productos = async(req, res) => {
    try{
    const negocio = req.params.negocio;
    console.log(negocio);
    const [productos]  = await pool.query('SELECT nombre, descripcion, precio, imagen FROM productos WHERE negocio = ?', negocio);
    res.json(productos);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const realizar_pedido = async(req, res)=>{
    try{
    const {negocio, usuario, producto} = req.body;
    await pool.query(`INSERT INTO pedidos (estado, negocio, usuario, producto) VALUES ('pendiente', '${negocio}', '${usuario}', '${producto}')`);
        res.json("Pedido creado");
        }catch(err){
            res.status(500);
            res.send(err.message);
        }
};

const get_pedidos = async(req, res)=>{
    try{
        const negocio = req.params.negocio;
        console.log(negocio);
        const [pedidos] = await pool.query(`SELECT estado, producto FROM pedidos WHERE negocio = '${negocio}'`);
        res.json(pedidos);
    }catch(err){
        res.status(500);
        res.send(err.message);   
    }
};

const get_compras = async(req, res)=>{
    try{
        const usuario = req.params.usuario;
        console.log(usuario);
        const [pedidos] = await pool.query(`SELECT pedidos.producto, productos.imagen, productos.precio FROM pedidos INNER JOIN productos WHERE usuario = '${usuario}' AND estado = 'realizado' AND productos.nombre = pedidos.producto`);
        res.json(pedidos);
    }catch(err){
        res.status(500);
        res.send(err.message);   
    }
};

const get_compras_negocio = async(req, res)=>{
    try{                                    //SELECT pedidos.negocio, pedidos.producto, productos.precio FROM pedidos INNER JOIN productos WHERE productos.nombre = pedidos.producto;
        const negocio = req.params.negocio;
        console.log(negocio);
        const [carrito] = await pool.query(`SELECT pedidos.producto, productos.imagen, productos.precio FROM pedidos INNER JOIN productos WHERE pedidos.negocio = '${negocio}' AND estado = 'realizado' AND productos.nombre = pedidos.producto`);
        res.json(carrito);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const get_carrito = async(req, res)=>{
    try{                                    //SELECT pedidos.negocio, pedidos.producto, productos.precio FROM pedidos INNER JOIN productos WHERE productos.nombre = pedidos.producto;
        const usuario = req.params.usuario;
        const [carrito] = await pool.query(`SELECT pedidos.negocio, pedidos.producto, pedidos.id,  productos.precio, productos.imagen FROM pedidos INNER JOIN productos WHERE productos.nombre = pedidos.producto AND pedidos.usuario = '${usuario}' AND estado = 'pendiente'`);
        res.json(carrito);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const get_carrito_negocio = async(req, res)=>{
    try{                                    //SELECT pedidos.negocio, pedidos.producto, productos.precio FROM pedidos INNER JOIN productos WHERE productos.nombre = pedidos.producto;
        const negocio = req.params.negocio;
        console.log(negocio);
        const [carrito] = await pool.query(`SELECT pedidos.negocio, pedidos.producto, pedidos.id,  productos.precio, productos.imagen FROM pedidos INNER JOIN productos WHERE productos.nombre = pedidos.producto AND pedidos.negocio = '${negocio}' AND estado = 'pendiente'`);
        res.json(carrito);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const update_pedido = async(req, res)=>{
    try{                                    //SELECT pedidos.negocio, pedidos.producto, productos.precio FROM pedidos INNER JOIN productos WHERE productos.nombre = pedidos.producto;
        const id= req.params.id;
        const [resultado] = await pool.query(`UPDATE pedidos SET estado = 'realizado' WHERE estado = 'pendiente'`);
        res.json({
            estado: "existos"
        });
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const add_producto = async(req, res)=>{
    try{
    const {nombre, descripcion, negocio, cantidad, precio} = req.body;
    await pool.query(`INSERT INTO productos (nombre, descripcion, negocio, cantidad, precio) VALUES('${nombre}', '${descripcion}', '${negocio}', ${cantidad}, ${precio})`);
    res.send("Producto añadido");
    }catch(err){
        res.status(500);
        res.send(err.message);  
    }
};

const delete_producto = async (req, res) => {
    try{
        const negocio = req.params.negocio;
        const producto = req.params.producto;
        console.log(negocio);
        console.log(producto);
        const [rows] = await pool.query(`DELETE FROM productos WHERE negocio = '${negocio}' AND nombre = '${producto}' AND cantidad > 0`);
        if(rows.affectedRows == 0 ){
            return res.status(404).json({
                massage: 'Puede que no exista el producto, el negocio, o que no haya existencia de este'
            })
        }
        res.send("Producto eliminado");
        }catch(err){
            res.status(500);
            res.send(err.message);
        }
};

const get_negocio_info = async(req, res)=>{
    try{
        const negocio = req.params.negocio;
        const [info] = await pool.query('SELECT ubicacion, descripcion, horario FROM comercios WHERE nombre = ?', negocio);
        res.json(info);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const get_negocios = async(req, res)=>{
    try{
        const [info] = await pool.query('SELECT nombre FROM comercios');
        res.json(info);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};


const registrar_usuario = async(req, res)=>{
    try{
        const {nombre, correo, password} = req.body;
        await pool.query(`INSERT INTO usuarios (nombre, correo, password) VALUES ('${nombre}', '${correo}', '${password}')`);
        res.json({
            estado: "existoso"
        });
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const delete_pedido = async(req, res)=>{
    try{
        const id = req.params.id;
        await pool.query('DELETE FROM pedidos WHERE id = ?', id);
        res.send("Pedido eliminado");
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const verify_login = async(req, res)=>{
    try{
        const {correo, password} = req.body;
        console.log(correo, password);
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE correo = '${correo}' AND password = '${password}'`);
        if(rows.length > 0){
            return res.json(rows);
        }
        res.json({
            estado: "error"
        });
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

const update_producto = async (req, res) => {
    try{
        const id = req.params.id;
        const {nombre, descripcion, negocio, cantidad, precio, imagen} = req.body;
        const [query] = await pool.query('UPDATE productos SET nombre = IFNULL(?, nombre), descripcion = IFNULL(?, descripcion), negocio = IFNULL(?, negocio), cantidad = IFNULL(?, cantidad), precio = IFNULL(?, precio), imagen = IFNULL(?, imagen) WHERE id = ?', [nombre, descripcion, negocio, cantidad, precio, imagen, id]);
        if(query.affectedRows == 0 ){
            return res.status(404).json({
                message: 'No existe este producto'
        })
    }
        const [row_updated] = await pool.query(`SELECT * FROM productos WHERE id = ${id}`);
        res.json(row_updated[0]);
    }catch(err){
        res.status(500);
        res.send(err.message);
    }
};

export const methods = {
    get_productos,
    realizar_pedido,
    get_pedidos,
    add_producto,
    delete_producto,
    get_negocios,
    registrar_usuario,
    delete_pedido,
    verify_login,
    get_carrito,
    update_producto,
    get_compras,
    get_negocio_info,
    update_pedido,
    get_carrito_negocio,
    get_compras_negocio
};
