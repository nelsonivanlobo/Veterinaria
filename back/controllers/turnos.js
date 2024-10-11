const {connection}= require('../db/configDb')
const {queryDatabase}=require('../db/configDb');

const mostrarTurnos = (req,res) =>{

    connection.query('SELECT * FROM turnos', (error, results)=>{
        if(error) throw(error)
        res.json(results)
    })

}

const editarTurnos = async (req, res)=>{
    try{
        const {idPac, dniCliente,observaciones,fecha,idVet,tipo,id}=req.body
        const query="UPDATE turnos SET idPac=?, dniCliente=?,observaciones=?,fecha=?,idVet=?,tipo=? WHERE id=?"
        const values=[idPac, dniCliente,observaciones,fecha,idVet,tipo,id]
        const rows = await queryDatabase(query,values)
        res.status(200).json(rows)

    }catch (error) {
        console.error("error al realizar la consulta")
        res.status(500).json({
            error:'error al conectar con la bd'
        })
    }

}
const agregarTurno = async(req,res)=>{
    try{
        const{idPac,dniCliente,observaciones,fecha,idVet,tipo}=req.body
        const query="INSERT into turnos (idPac, dniCliente, observaciones, fecha, idVet, tipo) VALUES(?,?,?,?,?,?)"
        const values= [idPac,dniCliente,observaciones,fecha,idVet,tipo]
        const rows=await queryDatabase(query,values)
        res.status(200).json(rows)
    } catch(error){
        console.error("error al realizar la consulta")
        res.status(500).json({
            error:"error al conectar con la bd"
        })
    }
}
const eliminarTurno=(req,res)=>{
    const id=req.params.id
    connection.query('DELETE FROM turnos WHERE id=?', id,
    (error,results)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(results)
        }
    })
}



module.exports={mostrarTurnos, editarTurnos, agregarTurno, eliminarTurno}