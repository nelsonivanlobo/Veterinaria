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
const login =async (req,res) =>{
    try{
        const{nickEmail,pass}=req.body
        console.log('solicitud frontend-->',req.body)
        const query= 'SELECT * FROM usuario where ((nick =?) or (email=?)) and  pass= ? '
        const values=[nickEmail,nickEmail, pass]
        const rows= await queryDatabase(query,values)
        res.json(rows)
    }catch (error) {
        console.error("Error al realizar la consulta")
        res.status(500).json({error:'Error al realizar la consulta'})
    }
}


const mostrar = (req,res) =>{
    connection.query("SELECT * FROM usuario", (error,results)=>{
        if(error) throw(error)
        res.json(results);
    })

} 

const nuevoUsuario= async (req, res) =>{
    try{
        const {nombre,apellido,email,nick,pass,estado,rol,permisos}=req.body
        console.log("solicitud frontend -->", req.body);
        const query = 'INSERT INTO usuario (nombre,apellido,email,nick,pass,estado,nombreRol,permisos) values(?,?,?,?,?,?,?,?)'
        const values=[nombre, apellido, email, nick, pass, estado, rol, permisos]
        const rows = await queryDatabase(query, values)
        res.status(200).json(rows)
    }catch(error){
        console.error('Error al realizar la consulta')
        res.status(500).json({ error: 'Error al realizar la consulta' })
    }
}

//     const eliminarUsuario = async (req, res) =>{
//     try{
//     const {id}=req.body
//     console.log("solicitud Frontend -->", req.body);
//     const query =connection.query(`DELETE FROM usuario WHERE id=?`)
//     const values=[id]
//     const rows = await queryDatabase(query,values)
//     res.status(200).json(rows)
//     } catch(error){
//         console.error('Error al realizar la consulta')
//         res.status(500).json({error:'error al realizar la consulta'})
//     }
    
// }
const eliminarUsuario = (req, res) =>{
    const idUsuario = req.params.id;
    connection.query('DELETE FROM usuario WHERE id=?',idUsuario,
    (error,results)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(results)
        }
    })
}
    // const eliminarUsuario = (req, res) => {
    //     const idUsuario = req.body;
    //     console.log("solicidtud del frontend", idUsuario)
    //     connection.query("DELETE FROM usuario WHERE id = "+ idUsuario, (error, results) => {
    //     if (error) throw error;
    //     res.json("Registro Eliminado");
    //     console.log("Registro Eliminado");
    //     });
    // }

const editarUsuario = async (req, res)=> {
    try{
        const {idUsuario,nombre,apellido,email,nick,pass,estado,rol,permisos}=req.body
        console.log("solicitud frontend -->", req.body)
        const query= 'UPDATE usuario SET nombre =?, apellido=?,email=?,nick=?,pass=?,estado=?,nombreRol=?,permisos=? WHERE id=?'
        const values=[nombre, apellido, email, nick, pass, estado, rol, permisos, idUsuario]
        const rows= await queryDatabase(query,values)
        res.status(200).json(rows)
    }catch(error){
        console.error('Error al realizar la consulta')
        res.status(500).json({error:'error al realizar la consulta'})
    }
}
const cambioContraseña = async (req,res)=>{
    try{
        const {passNueva,idUsuario}=req.body
        console.log("solicitud frontend -->", req.body)
        const query= 'UPDATE usuario SET pass=? WHERE id=?'
        const values=[passNueva,idUsuario]
        const rows = await queryDatabase(query,values)
        res.status(200).json(rows)
    }catch(error){
        console.error('Error al realizar la consulta')
        res.status(500).json({error:'error al realizar la consulta'})
    }
}
const mostrarUno = (req,res)=>{
    const idUsuario=req.params.id
    connection.query('SELECT * FROM usuario WHERE id=?',idUsuario,
    (error,results)=>{
        if(error){
            console.log(error)
        }
        else{
            res.send(results)
        }
    }
    )

}
module.exports={mostrar, login, nuevoUsuario,editarUsuario,eliminarUsuario, mostrarUno,cambioContraseña}