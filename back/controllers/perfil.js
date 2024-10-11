const {connection}= require('../db/configDb')
const queryDatabase=(query,values)=>{
    return new Promise((resolve, reject) => {
        connection.query(query,values, (error,rows) =>{
            if(error){
                reject(error)
            } else{
                resolve(rows)
                console.log("Respuesta base de datos --->", rows)
            }
        }) 
    })
}
const perfil = async (req,res)=>{
    try{
        const {id_u}=req.body
        console.log('solicitud frontend -->',req.body)
        const query='select img,notas,colorHeader,background,ligthDark from perfil where id_user=?';
        const values=[id_u]
        const rows= await queryDatabase(query,values)
        res.json(rows)
    }catch (error) {
        console.error("Error al realizar la consulta")
        res.status(500).json({error:'Error al realizar la consulta'})
    }
}
const getPerfil= async (req,res) =>{
    try {
        const {id} = req.params;
        console.log('solicitud frontend -->',req.params)
        const query='select * from perfil where id=?';
        const values=[id];
        const rows= await queryDatabase(query,values);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error en la consulta");
        res.status(500).json("Error en la consulta")
    }
}

const putPerfil= async (req,res) =>{
    try {
        const {img,color,back,oscuro,idPerfil}=req.body;
        console.log("solicitud frontend --->",req.body);
        const query='update perfil set img=?,colorHeader=?,background=?,ligthDark=? where id=?';
        const values=[img,color,back,oscuro,idPerfil];
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error en la consulta")
        res.status(500).json({error:"Error en la consutla"})
    }
}

module.exports={perfil,getPerfil,putPerfil}