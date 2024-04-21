import React, { useState, useEffect } from 'react';

import backendUrl from '../../serverConfig';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


import { useSpring, animated } from 'react-spring';


import '../../GlobalStyles/Resources.css';
import './styleAdd.css';


import NewMenuApplication from '../NuevoMenu/NuevoMenu';

const Formulario = () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [Rol, setRol] = useState('');
  const [ID_Centro, setCentroId] = useState('');
  const [Email, setEmail] = useState('');
  const [pass, setpass] = useState('');
  const [Acceso, setAcceso] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const GetCID = localStorage.getItem('CID');
    setCentroId(GetCID);
  }, []); // Run once on component mount

  const handleRolChange = (e) => {
    const selectedRol = e.target.value;
    setRol(selectedRol);

    // Set Acceso based on selectedRol
    switch (selectedRol) {
      case 'Psicología':
        setAcceso('ÁREA DE PSICOLOGÍA');
        break;
      case 'Enfermería':
        setAcceso('ÁREA DE ENFERMERÍA');
        break;
      case 'Instructor':
        setAcceso('ÁREA DE TALLERES Y ACTIVIDADES');
        break;
      case 'Administrador':
        setAcceso('TODAS LAS ÁREAS');
        break;
      case 'Recepción':
        setAcceso('ÁREA DE REGISTRO DE USUARIOS');
        break;
      default:
        setAcceso('');
    }
  };

  const AddUserBackend = async () => {
    
    
    try {
      const userData = {
        Email: Email,
        Password: pass,
        Rol: Rol,
        ID_Centro: ID_Centro,
      };
      const response = await axios.post(backendUrl + '/AppConnection/Users', userData);
      const { UserID } = response.data;
      //set con local storage
      localStorage.setItem('NewUserID', UserID);

      // Convertir userData a cadena JSON
      const userDataString = JSON.stringify(userData);

      // Guardar userDataString en localStorage con la clave 'NewUserID'
      localStorage.setItem('InfoUserNew', userDataString);


      
      personalInformation(userData);
      // Handle success, navigate, show alert, etc.
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show alert, etc.
    }
  };

  const confirmInformation = () => {
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
        AddUserBackend();
      }
    }
    )
  };

  const navigateToLoader = () => {
    navigate('/loader-DashboardSU');
  };

  const personalInformation = (UserJson) => {
    navigate('/NewPersonalInformation');
  };

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className='Body-PanelSU'>
        <div className="container-Menu">
            <NewMenuApplication/>
        </div>

        <div className="container-Body">
            
            <div className="contenido">
            <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Agregar nuevo usuario</animated.h1>
            <div className='containerInputLabel'>
              <label className='labelInput'>Elige un rol:</label>
              <select class="inputGlobal" value={Rol} onChange={handleRolChange} required>
                <option value="" disabled selected>Seleccionar Rol</option>
                <option value="Psicología">Psicóloga/o</option>
                <option value="Enfermería">Enfermera/o</option>
                <option value="Instructor">Instructora/or</option>
                <option value="Administrador">Administradora/or</option>

              </select>
            </div>


            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa un correo electrónico:</label>
              <input class="inputGlobal" placeholder="example@mail.com" type="email" value={Email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa una contraseña:</label>
              <input class="inputGlobal" placeholder="*********" type="text" value={pass} onChange={e => setpass(e.target.value)} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Verifica los permisos de acceso:</label>
              <textarea class="inputGlobal" value={Acceso} readOnly />
            </div>

            <button className='buttonPrincipalGlobal' onClick={confirmInformation}>Siguiente</button>
            <button className='buttonPrincipalGlobal' onClick={goBack}>Cancelar</button>

          </div>
            </div>
        </div>
    </div>
);

};

export default Formulario;
