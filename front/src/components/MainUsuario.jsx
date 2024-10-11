import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MainUsuario.css";

import { enqueueSnackbar } from "notistack";


const sucessClick = (dato) => {
  if(dato==1){
      enqueueSnackbar("Se Registro el nuevo Usuario ! 🧑🏽‍💻", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
      })
  } else if (dato==2){
      enqueueSnackbar("Aplique los cambios al Usuario  ! 👨🏽‍🔧", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
      })
  } else {
      enqueueSnackbar("Se ELimino el Usuario ! ☠️ ", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
      })
  }
  };
  const ErrorClick = () => {
      enqueueSnackbar("Algo salio mal !!! 🤖", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
      })
  }


const Usuario = () => {
  const [datos, setDatos] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [pass, setPass] = useState("");
  const [estado, setEstado] = useState(true);
  const [rol, setRol] = useState("");
  const [permisos, setPermisos] = useState(1);
  const [idUsuario, setIdUsuario] = useState(0);
  const [botones, setBotones] = useState(false);
  const navigate = useNavigate();

  const mostrar = async () => {
    try {
      const response = await axios.get("http://localhost:3000/usuario");
      const dataArray = response.data;
      setDatos(dataArray);
    } catch (error) {
      console.error(error);
    }
  };
  const edicion = (usuario) => {
    setIdUsuario(usuario.id);
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setEmail(usuario.email);
    setNick(usuario.nick);
    setPass(usuario.pass);
    setEstado(usuario.estado);
    setRol(usuario.nombreRol);
    setPermisos(usuario.permisos);
    setBotones(true);
  };
  const limpiar= () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setNick("");
    setPass("");
    setEstado(true);
    setRol("");
    setPermisos(0);
    setBotones(false);
  };

  const agregarUsuario = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post("http://localhost:3000/usuario", {
        nombre,
        apellido,
        email,
        nick,
        pass,
        estado,
        rol,
        permisos,
      });
      if (response.status === 200) {
        sucessClick(1)
        mostrar();
        limpiar()
      }
    } catch {
      ErrorClick();
    }
  };
  const modificarUsuario = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.put("http://localhost:3000/usuario", {
        idUsuario,
        nombre,
        apellido,
        email,
        nick,
        pass,
        estado,
        rol,
        permisos,
      });
      if (response.status === 200) {
        sucessClick(2)
        mostrar();
        limpiar()
      } else {
        ErrorClick()
      }
    } catch {
      ErrorClick()
    }
  };

  const borrarUsuario = (usuario) => {
    axios
      .delete(`http://localhost:3000/usuario/delete/` + usuario.id)
      .then((response) => {
        if (response.status === 200) {
          sucessClick(3)
          mostrar();
        } else {
          ErrorClick()
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
        ErrorClick()
      });
  };
  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("login");
    navigate("/");
  };
  const verificar = async () => {
    if (localStorage.getItem("login")) {
      if (localStorage.getItem("userData")) {
        const user = JSON.parse(localStorage.getItem("userData"));
        console.log(user);
        if (user && user.length > 0) {
          if (user[0].nombreRol === "Administrador") {
            console.log("Admin");
          } else {
            alert("no posee permisos para ingresar");
            navigate("/home");
          }
        } else {
          logOut();
        }
      } else {
        logOut();
      }
    } else {
      logOut();
    }
  };

  useEffect(() => {
    verificar();

    if (datos !== null) {
      console.log(datos);
    } else {
      mostrar();
    }
  }, [datos]);

  return (
    <>
    <div className="contenedor-registroUusario-tabla">
    <form action="" className="contenedor-registro-usuario">
      <h4> Registro de nuevo usuario</h4>
        <label htmlFor="">Nombre del usuario:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese el nombre del nuevo usuario"
        />

        <label htmlFor="">Apellido del usuario:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingrese el apellido del nuevo usuario"
        />
        <br />
        <label htmlFor="">Email del usuario:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese el email del nuevo usuario"
        />

        <label htmlFor="">Nickname del usuario:</label>
        <input
          type="text"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          placeholder="Ingrese el nickname del nuevo usuario"
        />
        <br />
        <label htmlFor="">Contraseña del usuario: </label>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Ingrese la contraseña del nuevo usuario"
        />
        <label htmlFor="">Estado del usuario: <input
          type="checkbox"
          checked={estado}
          onChange={(e) => setEstado(e.target.checked)}
          className="checkbox"
        /></label>
        
        <br />
        <label htmlFor="">Rol del usuario:</label>
        <input
          type="text"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          placeholder="Ingrese el rol del nuevo usuario"
        />

        <label htmlFor="">Permisos del usuario</label>


        <input
          type="number"
          value={permisos}
          onChange={(e) => setPermisos(e.target.value)}
          placeholder="Ingrese los permisos del nuevo usuario"
        />

        <br />
        <div className="contenedor-botones-usuario">
        <button type="button" onClick={(e)=>agregarUsuario(e)} disabled={botones} className="boton-usuario">
          Ingrese un nuevo usuario
        </button>

        <div>
        <button type="button" onClick={(e)=>modificarUsuario(e)} disabled={!botones} className="boton-usuario">
          Editar
        </button>
        <button type="button" onClick={limpiar}  className="boton-usuario">
          Cancelar
        </button>
        </div>
        

        </div>
        
        <br />
        <br />
        <br />
      </form>

      <div className="contenedor-tabla-registroUsuario">
      {datos !== null ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Nickname</th>
              <th>Contraseña</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Permisos</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((obj) => (
              <tr key={obj.id}>
                <td>{obj.nombre}</td>
                <td>{obj.apellido}</td>
                <td>{obj.email}</td>
                <td>{obj.nick}</td>
                <td>{obj.pass}</td>
                <td>{obj.estado}</td>
                <td>{obj.nombreRol}</td>
                <td>{obj.permisos}</td>
                <td>
                  <button onClick={() => edicion(obj)} className="modificar">Modificar</button>
                  <button onClick={() => borrarUsuario(obj)} className="btn-eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos para mostrar</p>
      )}

      </div>
     
      <br />
      <br />
      <br />
      <br />
     

    </div>

    
    </>
  );
};

export default Usuario;
