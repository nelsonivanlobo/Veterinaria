import huella from "./../assets/huellita.png";
import titulo from "./../assets/perro.webp";
/* import perfil from "./../assets/perfil.jpg"; */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Header.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useState , useRef, useEffect } from "react";
import axios from "axios";





const Header = () => {
  const [storeData, setStoreData] = useState();
  const [id_u, setId_u] = useState(0);
  //const [datoPerfil, setPerfil] = useState();
  const navigate = useNavigate();
  const Menus = [{to:"/perfil/",name:"Editar Perfil"},{to:"/cambiopass",name:"Cambiar Contraseña"}];
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();
  const [datos,setDatos]=useState([]);
  const [id_perfil,setPerfilId]=useState(0)

  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("login");
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("login")) {
        if (localStorage.getItem("userData")) {
          const userData = JSON.parse(localStorage.getItem("userData"));
          setStoreData(userData);
          console.log(userData)
          console.log(storeData)
          if (userData.length > 0) {
            setId_u(userData[0].id);
            console.log(id_u)
            
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

  useEffect(()=>{
    getPerfil()
  },[id_u])

  const getPerfil = async () =>{
        try {
          const url="http://localhost:3000/perfil/";
          const id=id_u;
          const response = await axios.get(url+id);
          if (response.status === 200){
            setDatos(response.data)
            console.log(datos)
          }else{
            console.error("Error al leer los datos")
          }
        } catch (error) {
          console.error("Error en la consulta",error)

        }
  }
  
const seter= (idP)=>{
  setOpen(!open)
  setPerfilId(idP)
}

  return (
    <>
      <div className="contenedor-navars">
        <Navbar expand="lg">
          <Container>
            <div className="contenedor-brand">
              <Navbar.Brand
                onClick={() => (navigate("/home"))}
              >
                <img src={huella} alt="logo" className="header-image1" />
                <img src={titulo} alt="titulo" className="header-image2" />
              </Navbar.Brand>
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <div className="nav-contenedor">

                  <Nav.Link >
                    <Link to='/usuarios' className="nav-link"> <p>Usuarios</p></Link>
                   
                  </Nav.Link>
                  <Nav.Link >
                    <Link to='/pacientes' className="nav-link"> <p>Pacientes</p></Link>
                   
                  </Nav.Link>
                  <Nav.Link  >
                    <Link to='/turnos' className="nav-link"><p>Turnos</p>
                    </Link>
                    
                  </Nav.Link>
                  <Nav.Link  >
                    <Link to='/productos' className="nav-link"><p>Productos</p>
                    </Link>
                    
                  </Nav.Link>
                  <Nav.Link  >
                    <Link to='/Veterinarios' className="nav-link"><p>Veterinarios</p>
                    </Link>
                    
                  </Nav.Link>

                  <Nav.Link  >
                    <Link to='/proveedores' className="nav-link"><p>Proveedores</p>
                    </Link>
                    
                  </Nav.Link>
                    
                </div>

                <div className="contenedor-dropdown">
                  <div className="contenedor-img-dropdown">
                    {datos.map((dato)=>(<img key={dato.id}
                      src={dato.img}
                      alt="perfil"
                      className="header-image3"
                      onClick={() => seter(dato.id)}
                      ref={imgRef}
                      
                    />))}
                  </div>

                  {open && (
                    <div className="dropdown" ref={menuRef}>
                      {storeData.map((dato) =>(
                        <p> {dato.nombre} {dato.apellido} </p>
                      ))}
                      
                      {Menus.map((menu) => (
                        <button className="btn-dropdown" onClick={() => setOpen(false)} >
                          <Link to={menu.to=="/perfil/"?menu.to+id_perfil:menu.to} > <p className="btn-dropdown"> {menu.name} </p> </Link>
                        </button>
                      ))}
                      <button onClick={logOut} className="btn-cerrar-sesion">Cerrar sesion</button>
                    </div>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
