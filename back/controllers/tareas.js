const { connection } = require('../db/configDb');

const queryDatabase = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
        console.log("Respuesta base de datos --->", rows);
      }
    });
  });
};

const cargarTareas= async (req,res) =>{
    try{
        const {id_u}=req.body;
        console.log("solicitud frontend -->",req.body);
        const query='select * from tareas where idUser=? order by prioridad ASC ';
        const values=[id_u];
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows)
    }catch(error){
        console.error("Error al realizar la consulta")
        res.status(500).json({error:'Error al realizar la consulta'})
    }
}
const deleteTareas = async (req, res) => {
  try {
    const { idTarea } = req.body;
    console.log("solicitud Frontend -->", req.body);
    const query = "delete from tareas where id=?";
    const values = [idTarea];
    const rows = await queryDatabase(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al realizar la consulta");
    res.status(500).json({
      error: "Error al realizar la consulta"
    });
  }
};

const editarTareas = async (req, res) => {
  try {
    const { idTarea, tarea, descripcion, fecha, prioridad } = req.body;
    console.log("solicitud frontend -->", req.body);
    const query = "update tareas set tarea=?,descripcion=?,fecha_inicio=?,prioridad=? where id=?";
    const values = [tarea, descripcion, fecha, prioridad, idTarea];
    const rows = await queryDatabase(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al realizar la consulta");
    res.status(500).json({ error: 'Error al realizar la consulta' });
  }
};

const nuevaTarea = async (req, res) => {
  try {
    const { id_u, tarea, descripcion, fecha, prioridad } = req.body;
    console.log("solicitud frontend -->", req.body);
    const query = 'insert into tareas (idUser, tarea,descripcion,fecha_inicio,prioridad) values (?,?,?,?,?)';
    const values = [id_u, tarea, descripcion, fecha, prioridad];
    const rows = await queryDatabase(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al realizar la consulta ");
    res.status(500).json({ error: 'Error al realizar la consulta' });
  }
};

module.exports = {cargarTareas, deleteTareas, editarTareas, nuevaTarea };