const {Router} = require("express");
const router = Router();
const {mostrarProductos,agregarProductos,editarProducto, deleteProducto} = require("../controllers/productos");

router.get("/productos", mostrarProductos);
router.post("/productos",agregarProductos);
router.put("/productos",editarProducto);
router.delete("/productos/:id",deleteProducto);

module.exports = router;