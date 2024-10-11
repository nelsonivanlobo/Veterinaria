const {Router}=require('express')
const router= Router()
const {mostrarProveedores,editarProv,eliminarProveedor,agregarProv}= require('../controllers/proveedores')

router.get('/proveedores', mostrarProveedores)
router.post('/proveedores',agregarProv)
router.put('/proveedores', editarProv)
router.delete('/proveedores/delete/:id', eliminarProveedor)

module.exports=router