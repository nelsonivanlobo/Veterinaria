const {queryDatabase}=require('../db/configDb')
const nuevoCliente = async (req, res) => {
    try {
      const { nombre, apellido, direccion, dni, tel, cuit } = req.body;
      console.log("solicitud frontend -->", req.body);
      const query =
        "insert into cliente (nombre,apellido,direccion,dni,telefono,cuit) values (?,?,?,?,?,?)";
      const values = [nombre, apellido, direccion, dni, tel, cuit];
      const rows = await queryDatabase(query,values);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error al realizar la consulta");
      res.status(500).json({
        error: "Error al realizar la consulta",
      });
    }
  };
  
  module.exports = { nuevoCliente };