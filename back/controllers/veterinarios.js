const {queryDatabase,consultaTodosDatabase}=require('../db/configDb');

const postVeterinarios = async (req,res)=>{
    try {
        const {nombre,apellido,dni,matricula,especialidad,horario,telefono}=req.body;
        console.log("solicitud frontend --->",req.body);
        const query="insert into veterinario(nombre,apellido,dni,matricula,especialidad,horario,telefono) values (?,?,?,?,?,?,?)";
        const values=[nombre,apellido,dni,matricula,especialidad,horario,telefono];
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error en la consulta");
        res.status(500).json({error:"Error en la consulta"})
    }
};

const mostrarVeterinarios = async (req,res)=>{
    try {
        console.log('solicutud frontend --> datos pacientes');
        const query='select * from veterinario'
        const rows = await consultaTodosDatabase(query);
        res.status(200).json(rows)
    } catch (error) {
        console.error("Error al realizar la consulta");
        res.status(500).json({error:"Error al ralizar la consulta"});
    }
};

const deleteVeterinarios= async (req,res)=>{
    try {
        const id=req.params.id;
        console.log('solicitud frontend -->',id);
        const query='delete from veterinario where id=?';
        const values=[id]
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error en la consulta");
        res.status(500).json({error:"Error en la consulta"})
    }
};

const putVeterinarios = async (req,res)=>{
    try {
        const {nombre,apellido,dni,matricula,especialidad,horario,telefono,id}=req.body;
        console.log("solicitud frontend -->",req.body);
        const query="update veterinario set nombre=?,apellido=?, dni=?,matricula=?,especialidad=?,horario=?,telefono=? where id =?";
        const values=[nombre,apellido,dni,matricula,especialidad,horario,telefono,id];
        const rows = await queryDatabase(query,values);
        res.status(200).json(rows)
    } catch (error) {
        console.error("Error en la consulta");
        res.status(500).json({error:"Error al realizar la consulta"})
    }
}

module.exports={postVeterinarios,mostrarVeterinarios,deleteVeterinarios,putVeterinarios}