const {connection}= require('../db/configDb')
const {queryDatabase}=require('../db/configDb');

const mostrarProveedores = (req,res) =>{
    connection.query('SELECT * FROM proveedores', (error, results)=>{
        if(error) throw(error)
        res.json(results)
    })
}

const editarProv = async (req, res)=>{
    try{
        const {nomEmpresa,telefono,direccion,rubro,id}=req.body
        const query="UPDATE proveedores SET nomEmpresa=?, telefono=?, direccion=?, rubro=? WHERE id=?"
        const values=[nomEmpresa,telefono,direccion,rubro,id]
        const rows = await queryDatabase(query,values)
        res.status(200).json(rows)

    }catch (error) {
        console.error("error al realizar la consulta")
        res.status(500).json({
            error:'error al conectar con la bd'
        })
    }

}
const agregarProv = async(req,res)=>{
    try{
        const{nomEmpresa,telefono,direccion,rubro}=req.body
        const query="INSERT into proveedores (nomEmpresa, telefono, direccion, rubro) VALUES(?,?,?,?)"
        const values= [nomEmpresa,telefono,direccion,rubro]
        const rows=await queryDatabase(query,values)
        res.status(200).json(rows)
    } catch(error){
        console.error("error al realizar la consulta")
        res.status(500).json({
            error:"error al conectar con la bd"
        })
    }
}

const eliminarProveedor=(req,res)=>{
    const id=req.params.id
    connection.query('DELETE FROM proveedores WHERE id=?', id,
    (error,results)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(results)
        }
    })
}

module.exports={mostrarProveedores,editarProv,eliminarProveedor,agregarProv}