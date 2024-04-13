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
      Swal.fire({
        title: 'User ID',
        text: `The user ID is ${UserID}`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
        // Handle success, navigate, show alert, etc.
      } catch (error) {
        console.error('Error:', error);
        // Handle error, show alert, etc.
      }
    };
  
    const navigateToLoader = () => {
      navigate('/loader-DashboardSU');
    };
  
    return (
      <body>
        <div className="left-panel">
        <NewMenuApplication/>
        </div>
  
  
        <div className="right-panel">
            <div className="right-panel-content">
              <div className='formContainer'>
                <animated.h1 style={fade} className="titleForm">¡Bienvenido!</animated.h1>
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
  
                <button className='buttonPrincipalGlobal' onClick={AddUserBackend}>Siguiente</button>
                <button className='buttonPrincipalGlobal' onClick={'#'}>Cancelar</button>
  
              </div>
            </div>
            
          </div>
  
  
      </body>
    );
   
  };
  
  export default Formulario;
  