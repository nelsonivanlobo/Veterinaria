const {queryDatabase,consultaTodosDatabase}=require('../db/configDb');


const mostrarPacientes=async (req,res)=>{
    try {
        console.log('solicitud frontend --> datos pacientes')
        const query='select A.id,A.nomPac,A.especie,A.raza,A.edad,A.estado,concat(B.apellido," ",B.nombre) as cliente,B.dni as "dniCliente"  from paciente A join cliente B on A.dni_duenio=B.dni';
        const rows = await consultaTodosDatabase(query);
        res.status(200).json(rows)
    } catch (error) {
        console.error("Error al realizar la consulta");
        res.status(500).json({error:"Error al realizar la consulta"});
    }



}

const busqueda = async (req,res)=>{
    try {
        const {dato}=req.params;
        const query='select A.id,A.nomPac,A.especie,A.raza,A.edad,A.estado,concat(B.apellido," ",B.nombre) as cliente,B.dni as dniCliente from paciente A join cliente B on A.dni_duenio=B.dni where (A.nomPac like ?) order by id asc';
        const values=[`${dato}%`]
        const rows = await queryDatabase(query,values)
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al realizar la consulta")
        res.status(500).json({error:"Error al realizar la consulta"})
    }

}


const nuevoPaciente = async (req, res) => {
    try {
      const { nombre,dni,especie,raza,edad,estado } = req.body;
      console.log("solicitud frontend -->", req.body);
      const query =
        "insert into paciente(nomPac,dni_duenio,especie,raza,edad,estado) values (?,?,?,?,?,?)";
      const values = [nombre,dni,especie, raza, edad, estado];
      const rows = await queryDatabase(query,values);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error al realizar la consulta");
      res.status(500).json({
        error: "Error al realizar la consulta",
      });
    }
  };

  const editarPaciente = async (req,res)=>{
    try {
        const {nombre,especie,raza,edad,estado,dni,idPaciente}=req.body;
        const query="update paciente set nomPac=?,dni_duenio=?,especie=?,raza=?,edad=?,estado=? where id=? ";
        const values =[nombre,dni,especie,raza,edad,estado,idPaciente];
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows)
    } catch (error) {
        console.error("Error al realizar la consulta");
        res.status(500).json({
            error:"Error al realizar la consulta"
        })
    }
  }
  
  module.exports = { mostrarPacientes,nuevoPaciente,busqueda,editarPaciente};