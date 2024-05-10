import React, { useState, useEffect } from 'react';

import backendUrl from '../../serverConfig';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { PDFDocument, rgb } from 'pdf-lib';

import { useSpring, animated } from 'react-spring';


//import '../../GlobalStyles/Resources.css';
import '../AdminUsers/styleAdd.css';


import NewMenuApplication from '../NuevoMenu/NuevoMenu';

import { useLocation } from 'react-router-dom';

const CreateConsultaEnfermeria2 = () => {
  const location = useLocation();
  const { state: pacienteData } = location;



  //obtener el NewUserID del local storage
  const UID = localStorage.getItem('UID');
  const GetCID = localStorage.getItem('CID');
  const Rol = localStorage.getItem('Rol');
  //Recibir el state del navigate



  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });


  const navigate = useNavigate();


  const [Telefono, setTelefono] = useState('');
  const [delegaciones, setDelegaciones] = useState([]);
  const [SelectedDelegacion, setSelectedDelegacion] = useState('');
  const [Motivo, setMotivo] = useState('');

  const [Presion, setPresion] = useState('');
  const [Temperatura, setTemperatura] = useState('');
  const [RitmoCardiaco, setRitmoCardiaco] = useState('');

  function GoEnfermeria() {
    navigate('/PanelEnfermeria');
  }

  useEffect(() => {
    if (UID === null) {
      navigate("/Login");
  }
  //console.log(Rol);
  if (Rol !== 'Enfermería') {
   //navegar a pagina de falta de permisos
      navigate("/PageNotFound");
  }
    fetchDelegaciones();

  }, []); // Run once on component mount

  const fetchDelegaciones = async () => {
    try {
      const response = await axios.get(backendUrl + '/AppConnection/Delegaciones');
      setDelegaciones(response.data); // Guardar las delegaciones en el estado
    } catch (error) {
      console.error('Error fetching delegaciones:', error);
    }
  };




  const AddNewConsult = async () => {
    const fecha = new Date();
    const formattedFecha = fecha.toISOString().split('T')[0];

    try {
      const JSON_Consult = {
        UserID: UID,
        Fecha: formattedFecha,
        ID_Delegacion: SelectedDelegacion,
        ID_Centro: pacienteData.ID_Centro,
        Nombre: pacienteData.Nombre,
        ApellidoP: pacienteData.ApellidoP,
        ApellidoM: pacienteData.ApellidoM,
        Edad: pacienteData.Edad,
        PresionArterial: Presion,
        Temperatura: Temperatura,
        RitmoCardiaco: RitmoCardiaco,
      };


     
      const response = await axios.post(backendUrl + '/AppConnection/Enfermeria/Consulta', JSON_Consult);
      if (response.status === 200) {
        //construir un pdf y descargar
       
        Swal.fire({
          icon: 'success',
          title: 'Consulta agregada',
          text: 'Se ha creado una nueva consulta exitosamente',
          //validar un boton de aceptar
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            GoEnfermeria();
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
  
          //validar que Presin tenga la forma 190/30 es decir 3numeros/2numeros
          if (!Presion.match(/^\d{3}\/\d{2}$/)) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'La presión arterial debe tener el formato correcto',
            });
            return;
          }
         
          //validar que temperatura sea un decimal
          if (isNaN(Temperatura)) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'La temperatura debe ser un número',
            });
            return;
          }
          //validar que el ritmo cardiaco sea un numero
          if (isNaN(RitmoCardiaco)) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El ritmo cardiaco debe ser un número',
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
        AddNewConsult();
      }
    }
    )
  };


  
  return (
    <div className='Body-PanelSU'>
        <div className="container-Menu">
            <NewMenuApplication/>
        </div>

        <div className="container-Body">
            
            <div className="contenido">
            <div className='formContainer'>
            <animated.h1 style={fade} className="titleForm">Información de paciente</animated.h1>





<div className="containerInputLabel">
  <label className="labelInput">Elige la delegación:</label>
  <select
    className="inputGlobal"
    value={SelectedDelegacion}
    onChange={(e) => setSelectedDelegacion(e.target.value)}
    required
  >
    <option value="" disabled>
      Seleccionar Delegación
    </option>
    {delegaciones.map((delegacion) => (
      <option key={delegacion.ID_Delegacion} value={delegacion.ID_Delegacion}>
        {delegacion.Nombre}
      </option>
    ))}
  </select>
</div>

<div className='containerInputLabel'>
  <label className='labelInput'>Presión arterial(mm Hg):</label>
  <input class="inputGlobal" placeholder="Ejemplo: 190/30" type="text" value={Presion} onChange={e => setPresion(e.target.value)} required />
</div>

<div className='containerInputLabel'>
  <label className='labelInput'>Temperatura(C°):</label>
  <input class="inputGlobal" placeholder="Ejemplo: 38.5" type="text" value={Temperatura} onChange={e => setTemperatura(e.target.value)} required />
</div>

<div className='containerInputLabel'>
  <label className='labelInput'>Ritmo Cardíaco(LPM):</label>
  <input class="inputGlobal" placeholder="Ejemplo: 62" type="number" value={RitmoCardiaco} onChange={e => setRitmoCardiaco(e.target.value)} required />
</div>


<button className='buttonPrincipalGlobal' onClick={confirmInformation}>Continuar</button>

          </div>
            </div>
        </div>
    </div>
);

};

export default CreateConsultaEnfermeria2;
