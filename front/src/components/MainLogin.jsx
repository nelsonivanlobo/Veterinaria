//import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/MainLogin.css";

import { TfiEmail, TfiLock } from "react-icons/tfi";
import { VscEye,VscEyeClosed } from "react-icons/vsc";


import { enqueueSnackbar } from "notistack";


const sucessClick = (dato) => {
  if (dato==1){
      enqueueSnackbar("Nick/Email o Pass Invalido !", {
          variant: "error",
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

const MainLogin = () => {
  const [nickEmail, setNickEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [mostrarP, setMostrarP] = useState(false);




  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        localStorage.setItem("userData", JSON.stringify(data));
        data.map((dato) => {
          if (dato.estado == true) {
            localStorage.setItem("login", true);
            navigate("/home");
          }else{
            sucessClick(3)
          }
        });
      } else {
        sucessClick(1)
      }
    }
  }, [data]);

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3000/usuario/login", {
        nickEmail,
        pass
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Error en la respuesta");
        ErrorClick()
      }
    } catch (error) {
      console.error("Error al realizar la peticion: ", error);
      ErrorClick()
    }
  };

  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode === 13) {
  //     login();
  //     console.log("enter");
  //   }
  // });




  return (
    <>
      <div className="body-login">



          <div className="contenedor-login">
            <h2>LOGIN</h2>

            <div className="contenedor-label">
              <TfiEmail className="icono" />
              <input
                onChange={(e) => setNickEmail(e.target.value)}
                type="text"
                required
              />
              <label htmlFor="">Nick/Email:</label>
            </div>

            <div className="contenedor-label" >

              <TfiLock className="icono" />

               {mostrarP? <VscEye className="icono-password" onClick={()=> setMostrarP(!mostrarP)}/> : <VscEyeClosed className="icono-password" onClick={()=> setMostrarP(!mostrarP)}/>  } 
              <input
                onChange={(e) => setPass(e.target.value)}
                type={mostrarP ? "text" : "password"}
                required
              />
              <label htmlFor="">Password:</label>
            </div>

            <button onClick={login} className="boton-cerrarSesion">Ingresar</button>
          </div>


      </div>
    </>
  );
};

export default MainLogin;