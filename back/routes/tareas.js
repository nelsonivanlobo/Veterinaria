const {Router}=require('express')
const router = Router()
const {nuevaTarea, editarTareas, deleteTareas, cargarTareas}=require('../controllers/tareas')

router.post('/tareas', nuevaTarea)
router.post('/tareas/cargarTarea', cargarTareas)
router.put('/tareas', editarTareas)
router.post('/tareas/delete', deleteTareas)
module.exports=router