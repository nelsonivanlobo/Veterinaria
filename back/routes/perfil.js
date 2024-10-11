const {Router}=require('express')
const router= Router()

const {perfil,getPerfil,putPerfil}=require('../controllers/perfil')

router.get("/perfil/:id", getPerfil)
router.post('/perfil', perfil)
router.put('/perfil',putPerfil)

module.exports=router