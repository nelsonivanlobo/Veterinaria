const {Router}=require('express')
const router = Router()
const {nuevoCliente}=require('../controllers/clientes')

router.post('/clientes', nuevoCliente)

module.exports=router