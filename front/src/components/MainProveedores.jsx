import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/MainProveedores.css"

const MainProveedores = () => {
  const [datos, setDatos] = useState(null);
  const [id, setId] = useState(0);
  const [nomEmpresa, setNomEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rubro, setRubro] = useState('');
  const [botones, setBotones] = useState(false);
  const navigate = useNavigate();

  const mostrarProv = async () => {
    try {
      const response = await axios.get('http://localhost:3000/proveedores');
      const dataArray = response.data;
      setDatos(dataArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (datos !== null) {
      console.log(datos);
    } else {
      mostrarProv();
    }
  }, [datos]);

  const agregarProv = async () => {
    try {
      const response = await axios.post('http://localhost:3000/proveedores', {
        nomEmpresa,
        telefono,
        direccion,
        rubro,
      });
      if (response.status === 200) {
        limpiar();
        alert('Éxito al agregar datos');
        mostrarProv();
      } else {
        alert('Error al realizar la consulta');
      }
    } catch (error) {
      console.error('Error al consultar con el servidor', error);
    }
  };

  const edicion = (prov) => {
    setNomEmpresa(prov.nomEmpresa);
    setTelefono(prov.telefono);
    setDireccion(prov.direccion);
    setRubro(prov.rubro);
    setId(prov.id);
    setBotones(true);
  };

  const limpiar = () => {
    setNomEmpresa('');
    setTelefono('');
    setDireccion('');
    setRubro('');
    setId(0);
    setBotones(false);
  };

  const editarProv = async () => {
    try {
      const response = await axios.put('http://localhost:3000/proveedores', {
        nomEmpresa,
        telefono,
        direccion,
        rubro,
        id,
      });
      if (response.status === 200) {
        mostrarProv();
        alert('Edición exitosa');
        limpiar();
      } else {
        alert('Error al realizar la consulta');
      }
    } catch (error) {
      console.error('Error al consultar con el servidor', error);
    }
  };

  const eliminarProv = (prov) => {
    axios
      .delete(`http://localhost:3000/proveedores/delete/` + prov.id)
      .then((response) => {
        if (response.status === 200) {
          mostrarProv();
          alert('Éxito en la eliminación');
        } else {
          alert('Error al consultar');
        }
      })
      .catch((error) => {
        console.error('Error al cancelar el turno', error);
      });
  };

  return (
    <>
      <div className='contenedor-proveedor'>
        <form action='' className='form-registro-proveedor'>
          <h4>Proveedores</h4>
          <label htmlFor=''>Ingrese el nombre de la Empresa</label>
          <input type='text' value= {nomEmpresa} onChange={(e) => setNomEmpresa(e.target.value)} />
          <br />
          <label htmlFor=''>Ingrese el telefono</label>
          <input type='text' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <br />
          <label htmlFor=''>Ingrese el domicilio</label>
          <input type='text' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          <br />
          <label htmlFor=''>Ingrese el rubro</label>
          <input type='text' value={rubro} onChange={(e) => setRubro(e.target.value)} />
          <br />

          <div className='contenedor-botones'>
            <button
              type='button'
              onClick={agregarProv}
              disabled={botones}
              className='btnproveedor'
            >
              Agregue el nuevo Proveedor
            </button>
            <div>
              <button
                type='button'
                onClick={editarProv}
                disabled={!botones}
                className='btnproveedor'
              >
                Agregar cambios al Proveedor
              </button>
              <button type='button' onClick={limpiar} className='btnproveedor'>
                Cancelar
              </button>
            </div>
          </div>
        </form>

        <div className='contenedor-tabla-proveedor'>
          {datos !== null ? (
            <table>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Rubro</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((obj) => (
                  <tr key={obj.id}>
                    <td>{obj.nomEmpresa}</td>
                    <td>{obj.telefono}</td>
                    <td>{obj.direccion}</td>
                    <td>{obj.rubro}</td>
                    <td>
                      <button onClick={() => eliminarProv(obj)} className='cancelar'>
                        Eliminar
                      </button>
                      <button onClick={() => edicion(obj)} className='modificar'>
                        Modificar datos
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos para mostrar</p>
          )}
        </div>
      </div>

      <button onClick={() => navigate('/Home')} className='boton-cerrarSesion'>
        Volver a Home
      </button>
    </>
  );
};

export default MainProveedores;
