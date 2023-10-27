import {Router} from 'express';
import {methods as negocioController} from '../controllers/negocio.funciones.js';

const router  = Router();

router.get('/productos/:negocio',negocioController.get_productos);
router.get('/pedidos/:negocio', negocioController.get_pedidos);
router.get('/socios', negocioController.get_negocios);
router.get('/socios/:negocio', negocioController.get_negocio_info);
router.get('/carrito/:usuario', negocioController.get_carrito);
router.get('/compras/:usuario', negocioController.get_compras);
router.get('/carrito-negocio/:negocio', negocioController.get_carrito_negocio);
router.get('/compras-negocio/:negocio', negocioController.get_compras_negocio);
router.post('/realizar-pedido',negocioController.realizar_pedido);
router.post('/agregar-producto',negocioController.add_producto);
router.post('/registrar-usuario',negocioController.registrar_usuario);
router.post('/verify_user', negocioController.verify_login);
router.delete('/eliminar-producto/:negocio/:producto',negocioController.delete_producto);
router.delete('/eliminar-pedido/:id',negocioController.delete_pedido);
router.patch('/actualizar-producto/:id',negocioController.update_producto);
router.put('/actualizar-pedido', negocioController.update_pedido);
export default router;