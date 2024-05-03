import React, { useState, useEffect } from 'react';

import backendUrl from '../../../serverConfig';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { PDFDocument, rgb } from 'pdf-lib';

import { useSpring, animated } from 'react-spring';


//import '../../GlobalStyles/Resources.css';
//import '../AdminUsers/styleAdd.css';


import NewMenuApplication from '../../NuevoMenu/NuevoMenu';

import { useLocation } from 'react-router-dom';

const ReasignarTaller = () => {

  const location = useLocation();
  const { state: taller } = location;



  //obtener el NewUserID del local storage
  const UID = localStorage.getItem('UID');
  const GetCID = localStorage.getItem('CID');
  const Rol = localStorage.getItem('Rol');
  //Recibir el state del navigate



  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });


  const navigate = useNavigate();


  const [Telefono, setTelefono] = useState('');
  const [users, setInstructoresServer] = useState([]);
  const [SelectedDelegacion, setSelectedDelegacion] = useState('');
  const [Motivo, setMotivo] = useState('');


  //datos de Grupo externo, Instructor, Dias dela semana
  const [GrupoExterno, setGrupoExterno] = useState('');
  const [Instructor, setInstructor] = useState('');
  const [DiasSemana, setDiasSemana] = useState('');

// Función para manejar el cambio en los checkboxes
const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;

  // Si el checkbox está marcado, agregar el valor a DiasSemana
  // Si no está marcado, remover el valor de DiasSemana
  if (checked) {
    setDiasSemana([...DiasSemana, value]);
  } else {
    setDiasSemana(DiasSemana.filter((day) => day !== value));
  }
};

  function GoTalleres() {
    navigate('/PanelTalleres/Admin');
  }

  useEffect(() => {
    if (UID === null) {
      navigate("/Login");
    }
    console.log(Rol);
    if (Rol !== 'Administrador') {
      //navegar a pagina de falta de permisos
      navigate("/PageNotFound");
    }
    fetchInstructores();

  }, []); // Run once on component mount

  const fetchInstructores = async () => {
    try {
      const response = await axios.get(backendUrl + '/AppConnection/Instructores/'+GetCID);
      setInstructoresServer(response.data); // Guardar las delegaciones en el estado
    } catch (error) {
      console.error('Error fetching delegaciones:', error);
    }
  };




  const ReasignarTaller = async () => {
    const fecha = new Date();
   
    try {
      const JSON_Taller = {
        UserID: Instructor
      };
      console.log(JSON_Taller);
      
      const response = await axios.put(backendUrl + '/AppConnection/Talleres/Instructores/' +taller.TallerID, JSON_Taller);
      if (response.status === 200) {
        //construir un pdf y descargar

        Swal.fire({
          icon: 'success',
          title: 'Taller modificado',
          text: 'Se ha reasignado correctamente',
          //validar un boton de aceptar
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            GoTalleres();
          }
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add user information',
        });
      }

      // Handle success, navigate, show alert, etc.
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show alert, etc.
    }
  };


  const confirmInformation = () => {
    //validar si los campos estan vacioss grupoexterno, instructor y dias d la semana
    if (Instructor === '' ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor seleccione un instructor',
      });
      return;
    }
    


    //mostrar un swal  si desdea continuar
    Swal.fire({
      title: '¿Desea continuar?',
      text: "Verifique la información antes de continuar, no podrá modificarla después.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        ReasignarTaller();
      }
    }
    )
  };

  //funcion para regresar
  const Regresar = () => {
    navigate(-1);
  };


  return (
    <div className='Body-PanelSU'>
      <div className="container-Menu">
        <NewMenuApplication />
      </div>

      <div className="container-Body">

        <div className="contenido">
          <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Asignación de actividad</animated.h1>

            <div className='containerInputLabel'>
              <label className='labelInput'>Taller:</label>
              <input class="inputGlobal" placeholder="Nombre del taller" type="text" value={taller.Nombre} disabled />
            </div>
     
            <div className="containerInputLabel">
              <label className="labelInput">Selecciona el instructor:</label>
              <select
                className="inputGlobal"
                value={Instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
              >
                <option value="" disabled>
                  Seleccionar Instructor
                </option>
                {users.map((user) => (
                  <option key={user.UserID} value={user.UserID}>
                    {user.Email}
                  </option>
                ))}
              </select>
            </div>


       

            <button className='buttonPrincipalGlobal' onClick={confirmInformation}>Continuar</button>
            <button className='buttonPrincipalGlobal' onClick={Regresar}>Cancelar</button>

          </div>
        </div>
      </div>
    </div >
  );

};

export default ReasignarTaller;
