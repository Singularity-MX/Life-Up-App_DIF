import React, { useState, useEffect } from 'react';

import backendUrl from '../../serverConfig';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


import { useSpring, animated } from 'react-spring';


import '../../GlobalStyles/Resources.css';
//import './styleAdd.css';


import NewMenuApplication from '../NuevoMenu/NuevoMenu';

const CreateConsultaPsicologia = () => {
  const UID = localStorage.getItem('UID');
  const GetCID = localStorage.getItem('CID');
  const Rol = localStorage.getItem('Rol');
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  const [Nombre, setNombre] = useState('');
  const [ApellidoP, setApellidoP] = useState('');
  const [ApellidoM, setApellidoM] = useState('');
  const [Edad, setEdad] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (UID === null) {
      navigate("/Login");
  }
  //console.log(Rol);
  if (Rol !== 'Psicología') {
   //navegar a pagina de falta de permisos
      navigate("/PageNotFound");
  }
    
  }, []); // Run once on component mount


  const BuildJSON = () => {
    const pacienteData = {
      Nombre: Nombre,
      ApellidoP: ApellidoP,
      ApellidoM: ApellidoM,
      Edad: Edad,
      ID_Centro: GetCID
    };
    navigate('/Nueva-cosulta-psicologia-informacion', { state: pacienteData });
    
  };

  const confirmInformation = () => {

    //validar si los campos estan vacios
    if (Nombre === '' || ApellidoP === '' || ApellidoM === '' || Edad === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llene todos los campos con la información solicitada',
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
        BuildJSON();
      }
    }
    )
  };

  const goBack = () => {
    navigate(-1);
  }

  // Función para validar que la edad sea un valor numérico
const isValidAge = (input) => {
  return !isNaN(input) && parseInt(input) > 0; // Verifica si es un número y si es mayor que cero
};

// Evento onChange para el input de la edad
const handleEdadChange = (e) => {
  const inputValue = e.target.value;
  // Verifica si la entrada es un valor numérico
  if (isValidAge(inputValue)) {
    // Si es válido, actualiza el estado de la edad
    setEdad(inputValue);
  } else {
    // Si no es válido, muestra un mensaje de error o realiza alguna acción adicional
    // Por ejemplo, podrías mostrar un mensaje al usuario indicando que la entrada debe ser un número
    //console.log('La edad debe ser un valor numérico mayor que cero');
  }
};

  return (
    <div className='Body-PanelSU'>
        <div className="container-Menu">
            <NewMenuApplication/>
        </div>

        <div className="container-Body">
            
            <div className="contenido">
            <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Nueva consulta</animated.h1>
            <p className='textForm'>Ingrese la información del paciente</p>


            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el nombre:</label>
              <input class="inputGlobal" placeholder="Nombre(s) del paciente" type="email" value={Nombre} onChange={e => setNombre(e.target.value)} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el Apellido Paterno:</label>
              <input class="inputGlobal" placeholder="Apellido Paterno" type="text" value={ApellidoP} onChange={e => setApellidoP(e.target.value)} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el Apellido Materno:</label>
              <input class="inputGlobal" placeholder="Apellido Materno" type="text" value={ApellidoM} onChange={e => setApellidoM(e.target.value)} required />
            </div>

            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa la Edad:</label>
              <input class="inputGlobal" placeholder="Edad" type="number" value={Edad} onChange={handleEdadChange} required />
            </div>

            

            <button className='buttonPrincipalGlobal' onClick={confirmInformation}>Continuar</button>
            <button className='buttonPrincipalGlobal' onClick={goBack}>Cancelar</button>

          </div>
            </div>
        </div>
    </div>
);

};

export default CreateConsultaPsicologia;
