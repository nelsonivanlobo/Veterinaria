//import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../css/MainVeterinarios.css";
import { enqueueSnackbar } from "notistack";

const sucessClick = (dato) => {
  if (dato == 1) {
    enqueueSnackbar("Perfecto se Registro el nuevo Veterinario ! 😉", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
    });
  } else if (dato == 2) {
    enqueueSnackbar("Se Edito el Veterinario ! 😉", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
    });
  } else {
    enqueueSnackbar("Se ELimino el Veterinario ! 😮", {
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

const MainVeterinarios = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState(0);
  const [matricula, setMatricula] = useState(0);
  const [especialidad, setEspecialidad] = useState("");
  const [horario, setHorario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [datos, setDatos] = useState([]);
  const [switchEditar, setSwitchEditar] = useState(false);
  const [id, setIdVet] = useState(0);

  const handlePost = (e) => {
    e.preventDefault();
    if (switchEditar == false) {
      console.log(
        nombre,
        apellido,
        dni,
        matricula,
        especialidad,
        horario,
        telefono
      );
      postVeterinarios();
    }
  };

  useEffect(() => {
    mostrarVeterinarios();
  }, []);
  useEffect(() => {
    console.log(datos);
  }, [datos]);
  const mostrarVeterinarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/veterinarios");
      if (response.status === 200) {
        setDatos(response.data);
      } else {
        console.error("Error al leer los datos");
      }
    } catch (error) {
      console.error("Error al realizar la consulta con el servidor ", error);
      ErrorClick();
    }
  };
  const putEditar = async () => {
    try {
      const response = await axios.put("http://localhost:3000/veterinarios", {
        nombre,
        apellido,
        dni,
        matricula,
        especialidad,
        horario,
        telefono,
        id,
      });
      if (response.status === 200) {
        mostrarVeterinarios();
        sucessClick(2);
        cancelar();
      } else {
        ErrorClick();
      }
    } catch (error) {
      console.error("Error al realizar la consulta ", error);
      ErrorClick();
    }
  };
  const editarPaciente = (dato) => {
    setNombre(dato.nombre);
    setApellido(dato.apellido);
    setDni(dato.dni);
    setMatricula(dato.matricula);
    setEspecialidad(dato.especialidad);
    setHorario(dato.horario);
    setTelefono(dato.telefono);
    setIdVet(dato.id);
    setSwitchEditar(true);
  };
  const cancelar = () => {
    setNombre("");
    setApellido("");
    setDni("");
    setMatricula("");
    setEspecialidad("");
    setHorario("");
    setTelefono("");
    setSwitchEditar(false);
  };

  const postVeterinarios = async () => {
    try {
      const response = await axios.post("http://localhost:3000/veterinarios", {
        nombre,
        apellido,
        dni,
        matricula,
        especialidad,
        horario,
        telefono,
      });
      if (response.status === 200) {
        mostrarVeterinarios();
        sucessClick(1);
        cancelar();
      } else {
        ErrorClick();
      }
    } catch (error) {
      console.error("Error al realizar la consulta con el servidor", error);
      ErrorClick();
    }
  };

  const deleteVeterinario = async (dato) => {
    const url = "http://localhost:3000/veterinarios/";
    const id_v = dato.id;
    const response = await axios.delete(url + id_v);
    if (response.status === 200) {
      sucessClick(3);
      mostrarVeterinarios();
    } else {
      ErrorClick();
    }
  };

  return (
    <>
      <div className="contenedor-veterinario">
        <form onSubmit={handlePost} className="registro-veterinario">
          {switchEditar == false ? (
            <h4>Agregar Veterinario</h4>
          ) : (
            <h4>Editar Veterinario</h4>
          )}
          <br />
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
            <br />
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <br />
          <label>Dni:</label>
          <input
            type="number"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
            <br />
          <label>Matricula:</label>
          <input
            type="number"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <br />
          <label>Especialidad:</label>
          <input
            type="text"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          />
<br />
          <label>Horario:</label>
          <input
            type="text"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
          <br />
          <label>Telefono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <br />
          <br />
          {switchEditar == false ? (
            <button type="submit" className="btn-veterinario">
              Agregar veterinario
            </button>
          ) : (
            <div>
              <button onClick={putEditar} className="btn-veterinario">
                Editar Veterinario
              </button>
              <button onClick={() => cancelar()} className="btn-veterinario">
                Cancelar
              </button>
            </div>
          )}
        </form>

      <div className="contenedor-tabla-veterinario">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dni</th>
              <th>Matricula</th>
              <th>Especialidad</th>
              <th>Telefono</th>
              <th>Horario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.nombre}</td>
                <td>{dato.apellido}</td>
                <td>{dato.dni}</td>
                <td>{dato.matricula}</td>
                <td>{dato.especialidad}</td>
                <td>{dato.telefono}</td>
                <td>{dato.horario}</td>
                <td>
                  <button
                    onClick={() => editarPaciente(dato)}
                    className="modificar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteVeterinario(dato)}
                    className="cancelar"
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
    </>
  );
};

export default MainVeterinarios;
