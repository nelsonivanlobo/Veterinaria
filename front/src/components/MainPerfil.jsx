import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "../css/MainPerfil.css"


const sucessClick = () => {
        enqueueSnackbar("Se Editaron los datos del Perfil ! 😀 ", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "left",
            },
        })
        
    } 
    const ErrorClick = () => {
        enqueueSnackbar("Algo salio mal !!! 🤖", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
        })
    }

const MainPerfil = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [datos,setDatos]=useState([]);
    const [img,setImg]=useState("");
    const [back,setBack]=useState(0);
    const [color,setColor]=useState(0);
    const [oscuro,setOscuro]=useState(0);
    const [idPerfil,setIDPerfil]=useState(0);


    //console.log(id)
    const putPerfil = async ()=>{
        try {
            const response = await axios.put("http://localhost:3000/perfil",{
                img,color,back,oscuro,idPerfil
            });
            if(response.status===200){
                sucessClick()
                
            }else {
                ErrorClick()
            }
        } catch (error) {
            ErrorClick()
            console.error("Error en la consulta")
        }
    }
    const getPerfil = async () =>{
        try {
          const url="http://localhost:3000/perfil/";
          const response = await axios.get(url+id);
          if (response.status === 200){
            setDatos(response.data)
            
          }else{
            //ErrorClick()
            console.error("Error al leer los datos")
          }
        } catch (error) {
            ErrorClick()
          console.error("Error en la consulta",error)

        }
  }
  useEffect(()=>{
    getPerfil()
  },[])
  useEffect(()=>{
    console.log(datos);
    if(datos.length>0){
        setImg(datos[0].img);
        setBack(datos[0].background);
        setColor(datos[0].colorHeader);
        setOscuro(datos[0].ligthDark);
        setIDPerfil(datos[0].id);
    }
  },[datos])

  const editar=()=>{
    putPerfil();
    navigate("/home");
  }

  return (
    <>
        <div className='contenedor-perfil'>
            <form onSubmit={editar} className='contenedor-editar-perfil'>
              <h4>Editar Perfil</h4>

                <label>Imagen:</label>
                <input type="text" value={img} onChange={(e)=>(setImg(e.target.value))} />

                <label>Color Menu Superior:</label>
                <input type="number" value={color} onChange={(e)=>(setColor(e.target.value))}/>
                <br />
                <label>Modo Oscuro:</label>
                <input type="number" value={oscuro} onChange={(e)=>(setOscuro(e.target.value))}/>

                <label>Background:</label>
                <input type="number" value={back} onChange={(e)=>(setBack(e.target.value))}/>
                <br />
                <button type='submit' className='boton-perfil'>Guardar Cambios</button>
                <button type='button' onClick={()=>navigate("/home")} className='boton-perfil'>Cancelar</button>
            </form>
        </div>
    </>
  )
}

export default MainPerfil