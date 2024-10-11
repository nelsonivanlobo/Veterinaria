
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/MainCambio.css"


const MainCambio = () => {

    const navigate = useNavigate();
    const [storeData, setStoreData] = useState([])
    const [passValida,setPassValida]=useState("")
    const[passVieja,setPassVieja]=useState("")
    const[idUsuario,setIdUsuario]=useState(0)
    const[passNueva,setPassNueva]=useState("")
    useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("login")) {
        if (localStorage.getItem("userData")) {
          const userData = JSON.parse(localStorage.getItem("userData"));
          setStoreData(userData);
          console.log(userData)
          if (userData.length > 0) {
            setIdUsuario(userData[0].id)
            setPassVieja(userData[0].pass)
          }
        } else {
          setStoreData([]);
        }
      } else {
        logOut();
      }
    };
    fetchData();
  }, []); //los corchetes luego de la coma indican que esta funcion se ejecutara una sola vez

  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("login");
    navigate("/");
  };

  const cambioPassword= async ()=>{
    const navigate = useNavigate();
    if(passValida===passVieja){
    try{
        const response= await axios.put("http://localhost:3000/usuario/cambio",{
            passNueva, idUsuario
        })
        if (response.status===200){
            alert("Se cambió la contraseña correctamente")
            logOut()
        }else{
            alert("La constraseña no pudo ser modificada")
        }
    }catch{
        alert("error al realizar la consulta")
    }
    }else{
        alert("La contraseña anterior no coincide")
    }
    
  }
  return (
    <>
    <div className='conteiner-password'>
    <div className='contenedor-pass'>
      <h4>Cambio de contraseña</h4>
      <label htmlFor="">Ingrese su contraseña anterior</label>
      <input type="text" onChange={(e)=>setPassValida(e.target.value)} />
      <br />
      <label htmlFor="">Ingrese su nueva contraseña</label>
      <input type="text" onChange={(e)=>setPassNueva(e.target.value)}/>
      <br />
      <button onClick={cambioPassword} className='boton-pass'>Confirmar cambio de contraseña</button>
      <button className='boton-pass' onClick={()=>navigate("/home")}>Cancelar</button>

    </div>

    </div>
    
     
    </>
  )
}

export default MainCambio
