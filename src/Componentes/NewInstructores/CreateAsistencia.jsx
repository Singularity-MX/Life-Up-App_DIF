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

const CreateAsistencia = () => {
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
  const [ListaTalleres, setTalleresLista] = useState([]);
  const [SelectedDelegacion, setSelectedDelegacion] = useState('');
  const [Motivo, setMotivo] = useState('');

  //delcarar aistentes y taller
  const [Asistentes, setAsistentes] = useState([]);
  const [Taller, setTaller] = useState([]);
  //asistentesPermitidos
  const [AsistentesPermitidos, setAsistentesPermitidos] = useState([]);

  function GoInstructor() {
    navigate('/PanelInstructor/Asistencia');
  }

  useEffect(() => {
    if (UID === null) {
      navigate("/Login");
    }
    console.log(Rol);
    if (Rol !== 'Instructor') {
      //navegar a pagina de falta de permisos
      navigate("/PageNotFound");
    }
    fetchTalleres();

  }, []); // Run once on component mount

  const fetchTalleres = async () => {
    try {
      const response = await axios.get(backendUrl + '/AppConnection/Talleres/Usuario/' + UID);
      console.log(response.data);
      setTalleresLista(response.data); // Guardar las delegaciones en el estado
    } catch (error) {
      console.error('Error fetching delegaciones:', error);
    }
  };




  const AddNewAsistencia = async () => {
    const fecha = new Date();
    const formattedFecha = fecha.toISOString().split('T')[0];

    try {
      const JSON_Consult = {
        UserID: UID,
        Fecha: formattedFecha,
        TallerID: Taller,
        Fecha: formattedFecha,
        Asistentes: Asistentes
      };

      const response = await axios.post(backendUrl + '/AppConnection/Talleres/Asistencia', JSON_Consult);
      if (response.status === 200) {
        //construir un pdf y descargar

        Swal.fire({
          icon: 'success',
          title: 'Asistencia agregada',
          text: 'Se ha agregado la asistencia correctamente',
          //validar un boton de aceptar
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            GoInstructor();
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
    //validar si los campos estan vacioss
    if (Taller === '' || Asistentes === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llene todos los campos',
      });
      return;
    }

    //validar si Asistentes es menor o igual a el cupo del taller
    ListaTalleres.map((Elemento) => {
      if (Elemento.TallerID === Taller) {
        console.log('Cupo: ' + Elemento.Cupo);
        console.log('Asistentes: ' + Asistentes);
        if (Asistentes > Elemento.Cupo) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El cupo del taller es de ' + Elemento.Cupo +' personas',
          });
          return;
        }
        else {
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
              AddNewAsistencia();
            }
          }
          );
        }
      }
    });





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
            <animated.h1 style={fade} className="titleForm">Registrar asistencia</animated.h1>


            <div className="containerInputLabel">
              <label className="labelInput">Elige el taller:</label>
              <select
                className="inputGlobal"
                value={Taller}
                onChange={(e) => setTaller(e.target.value)}
                required
              >
                <option value="" disabled>
                  Seleccionar el taller
                </option>
                {ListaTalleres.map((Elemento) => (
                  <option key={Elemento.TallerID} value={Elemento.TallerID}>
                    {Elemento.Nombre} ({Elemento.Hora})
                  </option>
                ))}
              </select>
            </div>


            <div className='containerInputLabel'>
              <label className='labelInput'>Ingresa el número de asistentes:</label>
              <input class="inputGlobal" placeholder="Numero de asistentes" type="number" value={Asistentes} onChange={e => setAsistentes(e.target.value)} required />
            </div>





            <button className='buttonPrincipalGlobal' onClick={confirmInformation}>Continuar</button>
            <button className='buttonPrincipalGlobal' onClick={Regresar}>Regresar</button>

          </div>
        </div>
      </div>
    </div>
  );

};

export default CreateAsistencia;
