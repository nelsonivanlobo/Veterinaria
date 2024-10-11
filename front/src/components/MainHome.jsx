import axios from "axios";
import React, { useEffect, useState } from "react";
import { TfiRuler } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import img from "../assets/nota2.png";
import "../css/MainHome.css";
import { enqueueSnackbar } from "notistack";



const MainHome = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState([]);
  const [id_u, setId_u] = useState(0);
  const [datoPerfil, setPerfil] = useState();

  const [editar, setEditar] = useState(false);
  const [tabla, setTabla] = useState(0);
  const [monitorTabla, setMonitorTabla] = useState([]);
  const [recargar, setRecargar] = useState(0);
  const [idTarea, setIdtarea] = useState(0);
  const [tarea, setTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [prioridad, setPrioridad] = useState("3");



  const [inputValue, setInputValue] = useState('');

  let timeoutId;

  const inputNota = (e) => {
    // const value = e.target.value;
    setInputValue(e.target.value);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      
      //sucessClick(3)
    
    }, 3000);

  }

  // const editNota= async ()=>{
  //   try {
      
  //   } catch (error) {
  //     console.error("Error en la consulta")
  //   }


  // }

  const sucessClick = (dato) => {
    if (dato == 1) {
      enqueueSnackbar("Perfecto se Registro la nueva tarea ! 😉", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      });
    } else if (dato == 2) {
      enqueueSnackbar("Recibi los cambios en las tareas ! 👌", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      });
    } else if (dato == 3) {
      enqueueSnackbar("Recibi los cambios en tu nota ! 👌", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      });
    }else {
      enqueueSnackbar("Se ELimino la tarea ! 🗑", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      });
    }
  };
  const ErrorClick = () => {
    enqueueSnackbar("Algo salio mal !!! 🤖", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("login")) {
        if (localStorage.getItem("userData")) {
          const userData = JSON.parse(localStorage.getItem("userData"));
          setStoreData(userData);
          console.log(userData);
          if (userData.length > 0) {
            setId_u(userData[0].id);
          }
        } else {
          setStoreData([]);
        }
      } else {
        logOut();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const perfil = async () => {
      try {
        const response = await axios.post("http://localhost:3000/perfil", {
          id_u, 
        });
        if (response.status === 200) {
          setPerfil(response.data);
          

          // enviar a local storage lo datos de perfil
        } else {
          console.error("Error en la respuesta");
        }
      } catch (error) {
        console.error("Error al realizar la peticion: ", error);
      }
    };

    const cargarTabla = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/tareas/cargarTarea",
          { id_u }
        );
        if (response.status === 200) {
          setMonitorTabla(response.data);
        } else {
          console.log("error al desplegar los datos estado no 200");
        }
      } catch (error) {
        console.error("Error al realizar la consulta con el servidor", error);
      }
    };
    if (id_u !== 0) {
      perfil();
      cargarTabla();
    }
  }, [id_u, recargar]);

  useEffect(() => {
    console.log(monitorTabla);
  }, [monitorTabla]);

  useEffect(() => {
    const postTabla = async () => {
      try {
        const response = await axios.post("http://localhost:3000/tareas", {
          id_u,
          tarea,
          descripcion,
          fecha,
          prioridad,
        });
        if (response.status === 200) {
          sucessClick(1);
          setRecargar(recargar + 1);
          setTabla(0);
          console.log(tabla);
        } else {
          ErrorClick();
        }
      } catch (error) {
        ErrorClick();
        console.error("Error al realizar la consulta con el servidor ", error);
      }
    };

    const putTabla = async () => {
      try {
        //editar el put
        const response = await axios.put("http://localhost:3000/tareas", {
          idTarea,
          tarea,
          descripcion,
          fecha,
          prioridad,
        });
        if (response.status === 200) {
          sucessClick(2);
          setRecargar(recargar + 1);
          setTabla(0);
          offEditar();
        } else {
          ErrorClick();
        }
      } catch (error) {
        ErrorClick();
        console.error("Error al realizar la consulta con el servidor", error);
      }
    };

    const deleteTabla = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/tareas/delete",
          { idTarea }
        );

        if (response.status === 200) {
          sucessClick(4);
          console.log(idTarea);
          setRecargar(recargar + 1);
          setTabla(0);
          offEditar();
        } else {
          ErrorClick();
        }
      } catch (error) {
        ErrorClick();
        console.error("Error al realizar la consulta con el servidor", error);
      }
    };

    if (tabla === 1) {
      postTabla();
      console.log("se ejecuto un post");
    }
    if (tabla === 2) {
      putTabla();
      console.log("se ejecuto un put");
    }
    if (tabla === 3) {
      deleteTabla();
      console.log("se ejecuto un delete");
    }
  }, [tabla]);
  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("login");
    navigate("/");
  };

  const tareaController = (e) => {
    e.preventDefault();
    if (editar !== true) {
      setTabla(1);
      console.log("se hizo un post");
    } else {
      setTabla(2);
      console.log("se hizo un put");
    }
  };
  const onEditar = (elemento) => {
    //encender/activar editar

    console.log(elemento);
    setEditar(true);
    setIdtarea(elemento.id);
    setTarea(elemento.tarea);
    setDescripcion(elemento.descripcion);
    setFecha(elemento.fecha_inicio);
    setPrioridad(elemento.prioridad);
  };
  const offEditar = () => {
    setEditar(false);
    setTarea("");
    setDescripcion("");
    setFecha("");
    setPrioridad("3");
  };

  const elimiarTarea = (elemento) => {
    //delete
    setIdtarea(elemento.id);
    console.log(idTarea);
    setTabla(3);
    console.log("tarea eliminada");
  };

  return (
    <>
    
      <div className="contenedor-mainhome1">
        {storeData.map((user) => (
          <div key={user.id}>
         
            <div className="contenedor-bienvenida">
              <div>
                <h1>Bienvenido</h1>
                <br /><br /><br />
                <h2>
                  {user.apellido +" "+user.nombre}
                </h2>
              </div>

              {datoPerfil ? (
                <div className="contenedor-textarea">
                  <div className="nota">
                    <img src={img} alt="" />
                  </div>

                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    defaultValue={datoPerfil[0].notas}
                    onChange={(e)=>inputNota(e)}
                    className="textarea-bienvenida"
                  ></textarea>
                </div>
              ) : (
                <div>
                  <div className="contenedor-textarea">
                  <div className="nota">
                    <img src={img} alt="" />
                  </div>

                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    defaultValue={inputValue}
                    onChange={(e)=>inputNota(e)}
                    className="textarea-bienvenida"
                  ></textarea>
                </div>
                </div>
              )}
            </div>

            {
              <div>
                {" "}
                {datoPerfil ? (
                  <div>
                    <div className="contenedor-tareas">
                      <div className="contenedor-agregarTarea">
                        <h4>
                          {editar == true ? "Editar tarea" : "Nueva Tarea"}
                        </h4>
                        <form onSubmit={tareaController}>
                          <label htmlFor="">Tarea: </label>
                          <input
                            type="text"
                            value={tarea}
                            onChange={(e) => setTarea(e.target.value)}
                          />

                          <label htmlFor="">Descripcion: </label>
                          <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                          />

                          <label htmlFor="">Fecha: </label>
                          <input
                            type="datetime-local"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                          />

                          <label htmlFor="" className="prioridad">
                            Prioridad -
                            <input
                              className="radio"
                              type="radio"
                              name="opcion"
                              value="3"
                              checked={prioridad == "3"}
                              id="opcion3"
                              onChange={(e) => setPrioridad(e.target.value)}
                            />
                            <input
                              className="radio"
                              type="radio"
                              name="opcion"
                              value="2"
                              id="opcion2"
                              checked={prioridad == "2"}
                              onChange={(e) => setPrioridad(e.target.value)}
                            />
                            <input
                              className="radio"
                              type="radio"
                              name="opcion"
                              value="1"
                              checked={prioridad == "1"}
                              id="opcion1"
                              onChange={(e) => setPrioridad(e.target.value)}
                            />
                            +{" "}
                          </label>

                          {editar == false ? (
                            <button type="submit">Agregar Tarea</button>
                          ) : (
                            <div>
                              <button type="submit">Aplicar Cambios</button>
                              <button onClick={offEditar}>Cancelar</button>
                            </div>
                          )}
                        </form>
                      </div>

                      <div className="contenedor-tabla">
                        <table>
                          <thead>
                            <tr>
                              <th>Tarea</th>
                              <th>Descripcion</th>
                              <th>Fecha</th>
                              <th>Fecha Finalizado</th>
                              <th>Prioridad</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {monitorTabla.map((elemento) => (
                              <tr key={elemento.id}>
                                <td>{elemento.tarea}</td>
                                <td>{elemento.descripcion}</td>
                                <td>{elemento.fecha_inicio}</td>
                                <td>{elemento.fecha_finalizacion}</td>
                                <td>
                                  {(() => {
                                    if (elemento.prioridad == 1) {
                                      return <span>Prioridad Maxima</span>;
                                    } else if (elemento.prioridad == 2) {
                                      return <span>Prioridad Media</span>;
                                    } else {
                                      return <span>Prioridad Baja</span>;
                                    }
                                  })()}
                                </td>
                                <td>
                                  <button
                                    className="btn-editar"
                                    onClick={() => onEditar(elemento)}
                                  >
                                    Editar
                                  </button>
                                  <button
                                    className="btn-eliminar"
                                    onClick={() => elimiarTarea(elemento)}
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span>No hay imagen de perfil disponible</span>
                )}
              </div>
            }
          </div>
        ))}

        
      </div>
    </>
  );
};

export default MainHome;
