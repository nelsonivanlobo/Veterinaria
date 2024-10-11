const {Router}=require('express')
const router = Router()
const {nuevoPaciente,mostrarPacientes,busqueda,editarPaciente}=require('../controllers/pacientes')

router.get("/pacientes",mostrarPacientes)
router.get("/pacientes/:dato", busqueda)
router.post('/pacientes', nuevoPaciente)
router.put("/pacientes",editarPaciente)

module.exports=router