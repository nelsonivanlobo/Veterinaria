const {Router}=require('express')
const router= Router()
const {mostrarTurnos, editarTurnos, agregarTurno, eliminarTurno} = require('../controllers/turnos')

router.get('/turnos', mostrarTurnos)
router.put('/turnos', editarTurnos)
router.post('/turnos', agregarTurno )
router.delete('/turnos/delete/:id', eliminarTurno)


module.exports = router