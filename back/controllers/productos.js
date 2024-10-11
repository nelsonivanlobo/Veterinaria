const {consultaTodosDatabase, queryDatabase} = require("../db/configDb");

const mostrarProductos = async (req, res)=>{
    try{
        console.log("solicitud frontend ----> datos productos");
        const query = "SELECT * FROM productos";
        const rows = await (consultaTodosDatabase(query));
        res.status(200).json(rows)
    }catch (error){
        console.error("Error al realizar la consulta");
        res.status(500).json({error: "error al realizar la consulta"})
    }
};

const agregarProductos = async (req,res)=>{
    try{
       const {idProvedor, nombre, descripcion, precio, stock, url} = req.body;
       console.log("solicitud front end ----->", req.body)
       const query = "INSERT INTO productos(idProvedor,nombre, descripcion, precio, stock, url) VALUES (?,?,?,?,?,?)";
       const values = [idProvedor, nombre, descripcion, precio, stock, url];
       const rows = await queryDatabase(query, values);
       res.status(200).json(rows);
    }catch (error){
        console.error("Error al realizar la consulta")
        res.status(500).json({error:"Error al realizar la consulta"})
    }
}

const editarProducto = async (req,res)=>{
    try{
        const {id,idProvedor, nombre, descripcion, precio, stock, url} = req.body;
        console.log("solicitud front end -------->", req.body)
        const query = "UPDATE productos SET idProvedor=?, nombre = ?, descripcion = ?, precio = ?, stock = ?, url = ? WHERE id = ?";
        const values = [idProvedor,nombre,descripcion,precio,stock,url, id];
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows);

    }catch(error){
        console.error("Error al realizar la consulta");
        res.status(500).json({error:"Error al realizar la consulta"})
    }
}

const deleteProducto= async (req,res)=>{
    try {
        const id=req.params.id;
        console.log('solicitud frontend -->',id);
        const query='delete from productos where id = ?';
        const values=[id]
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error en la consulta");
        res.status(500).json({error:"Error en la consulta"})
    }
};

module.exports = {mostrarProductos,agregarProductos, editarProducto, deleteProducto}