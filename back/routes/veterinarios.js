const {Router}=require("express");
const router=Router();

const {postVeterinarios,mostrarVeterinarios,deleteVeterinarios,putVeterinarios}=require("../controllers/veterinarios");

router.get("/veterinarios",mostrarVeterinarios);
router.post("/veterinarios",postVeterinarios);
router.delete("/veterinarios/:id",deleteVeterinarios);
router.put('/veterinarios',putVeterinarios);


module.exports=router;




