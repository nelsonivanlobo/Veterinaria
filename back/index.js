const express = require("express");
const app = express();
const {connection}= require('./db/configDb')
const cors = require("cors");
const bodyParser= require('body-parser')
const morgan = require('morgan');
const perfil = require("./routes/perfil");
const tareas=require("./routes/tareas")
const usuario=require("./routes/usuario");
const clientes=require("./routes/clientes");
const pacientes=require('./routes/pacientes');
const turnos=require('./routes/turnos')
const veterinarios=require('./routes/veterinarios');
const proveedores=require('./routes/proveedores')
const productos = require("./routes/productos");




app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.listen(3000, () => {
  console.log("Servidor Iniciado en el puerto 3000");
});

connection.connect((error) => {
  if ( error) throw error;
  console.log("Conexion establecida con la Base de Datos")
  });

app.get('/', (req,res) => {
  console.log("Escuchando puerto 3000");
  res.json("todo ok");
});

app.use('/', turnos)

app.use('/', perfil)

app.use('/', tareas)

app.use('/', usuario)

app.use('/', clientes)

app.use('/',pacientes)

app.use("/",veterinarios)

app.use('/', proveedores)
app.use("/",productos)
