import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../css/card.css";

const MainProductos = () => {
  const [datos, setDatos] = useState([]);
  const [switchEditar, setSwitchEditar] = useState(false);

  const [id, setId] = useState(0);
  const [idProvedor, setIdProvedor] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    mostrarVenta();
  }, []);

  useEffect(() => {
    console.log(datos);
  }, [datos]);

  const mostrarVenta = () => {
    axios
      .get("http://localhost:3000/productos")
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postProductos = async () => {
    try {
      const response = await axios.post("http://localhost:3000/productos", {
        idProvedor,
        nombre,
        descripcion,
        precio,
        stock,
        url,
      });
      if (response.status === 200) {
        //sucessClick(3)
        alert("se Agrego el producto");
        mostrarVenta();
      } else {
        //ErrorClick()
        alert("hubo un error");
      }
    } catch (error) {
      //ErrorClick()
      console.error("Error al realizar la consulta con el servidor ", error);
    }
  };

  const putEditar = async () => {
    try {
      const response = await axios.put("http://localhost:3000/productos", {
        id,
        idProvedor,
        nombre,
        descripcion,
        precio,
        stock,
        url,
      });
      if (response.status === 200) {
        //sucessClick(2)
        alert("se Edito el producto");
        mostrarVenta();
        cancelar();
      } else {
        //ErrorClick()
        alert("hubo un error");
      }
    } catch (error) {
      //ErrorClick()
      console.error("Error al realizar la consulta con el servidor ", error);
    }
  };

  const cancelarTurno = (dato) => {
    axios
      .delete(`http://localhost:3000/productos/` + dato.id)
      .then((response) => {
        if (response.status === 200) {
          //sucessClick(3)
          alert("se Elimino el Producto");
          mostrarVenta();
        } else {
          //ErrorClick()
          alert("Ocurrio un error");
        }
      })
      .catch((error) => {
        console.error("error al Eliminar", error);
        //ErrorClick()
      });
  };

  const editarProducto = (dato) => {
    setIdProvedor(dato.idProvedor);
    setNombre(dato.nombre);
    setDescripcion(dato.descripcion);
    setPrecio(dato.precio);
    setStock(dato.stock);
    setUrl(dato.url);
    setId(dato.id);
    setSwitchEditar(true);
  };

  const cancelar = () => {
    setIdProvedor(0);
    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setStock(0);
    setUrl("");
    setId(0);
    setSwitchEditar(false);
  };

  return (
    <div className="contenedor-productos">
      <div className="contenedor-agregar-productos2">
      <div className="contenedor-agregar-productos">
        {switchEditar == false ? (
          <h4>Agregar Productos</h4>
        ) : (
          <h4>Editar Productos</h4>
        )}

        <br />
        <label htmlFor="">Id Proveedor:</label>
        <input
          value={idProvedor}
          type="text"
          onChange={(e) => setIdProvedor(e.target.value)}
        />
        <br />
        <label htmlFor="">Nombre:</label>
        <input
          value={nombre}
          type="text"
          onChange={(e) => setNombre(e.target.value)}
        />
        <br />
        <label htmlFor="">Descripcion:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <br />
        <label htmlFor="">Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <br />
        <label htmlFor="">Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <br />
        <label htmlFor="">Url:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />

        {switchEditar == false ? (
          <button onClick={postProductos} className="agregar-paciente-btn">
            Agregar Productos
          </button>
        ) : (
          <div>
            <button onClick={putEditar} className="agregar-paciente-btn">
              Editar Productos
            </button>
            <button onClick={() => cancelar()} className="agregar-paciente-btn">
              Cancelar
            </button>
          </div>
        )}
      </div>


      </div>
      
      <div className="contenedordecards">
        <h1>Lista de Productos</h1>
        <div className="card-container">
          {datos.length > 0 ? (
            datos.map((dato) => (
              <Card key={dato.id} style={{ width: "18rem" }} className="cards">
                <Card.Img variant="top" src={dato.url} />
                <Card.Body>
                  <Card.Title className="card-title">{dato.nombre}</Card.Title>
                  <Card.Text className="card-text">{dato.descripcion}</Card.Text>
                  <Card.Text className="card-text">Precio: {dato.precio}</Card.Text>
                  <Card.Text className="card-text">Stock: {dato.stock}</Card.Text>
                  <Button
                  className="btn-producto"
                    onClick={() => editarProducto(dato)}
                    variant="primary"
                  >
                    Editar
                  </Button>
                  <Button onClick={() => cancelarTurno(dato)} className="btn-eliminar-producto">Eliminar</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No se encontraron datos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainProductos;
