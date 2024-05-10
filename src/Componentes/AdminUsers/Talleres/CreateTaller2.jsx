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

const CreateTaller2 = () => {

  const location = useLocation();
  const { state: JSON } = location;



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
    //console.log(Rol);
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




  const AddTallerNew = async () => {
    const fecha = new Date();
    const formattedFecha = fecha.toISOString().split('T')[0];
    const diasSeleccionados = DiasSemana.join(', ');
    try {
      const JSON_Taller = {
        Nombre: JSON.Nombre,
        CentroID: JSON.CentroID,
        Instructor_ID: Instructor,
        GrupoExterno: GrupoExterno,
        Duracion: JSON.Duracion,
        Dias: diasSeleccionados,
        Hora: JSON.Hora,
        Cupo: JSON.Cupo
      };
      //console.log(JSON_Taller);
      
      const response = await axios.post(backendUrl + '/AppConnection/Talleres', JSON_Taller);
      if (response.status === 200) {
        //construir un pdf y descargar

        Swal.fire({
          icon: 'success',
          title: 'Taller agregado',
          text: 'Se ha creado una nueva actividad',
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
    if (GrupoExterno === '' || Instructor === '' || DiasSemana === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llene todos los campos',
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
        AddTallerNew();
      }
    }
    )
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
              <label className='labelInput'>¿Es un grupo externo?:</label>
              <div>
                <input type="radio" id="externo" name="grupo" value="externo" onChange={() => setGrupoExterno(true)} required />
                <label htmlFor="externo">Sí</label>
              </div>
              <div>
                <input type="radio" id="interno" name="grupo" value="interno"  onChange={() => setGrupoExterno(false)} required />
                <label htmlFor="interno">No</label>
              </div>
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


            <div className='containerInputLabel'>
              <label className='labelInput'>Selecciona los días que se impartirá:</label>
              <div>
                <input type="checkbox" id="monday" name="days" value="Lunes"  onChange={handleCheckboxChange} />
                <label htmlFor="monday">Lunes</label>
              </div>
              <div>
                <input type="checkbox" id="tuesday" name="days" value="Martes"  onChange={handleCheckboxChange} />
                <label htmlFor="tuesday">Martes</label>
              </div>
              <div>
                <input type="checkbox" id="wednesday" name="days" value="Miércoles"  onChange={handleCheckboxChange} />
                <label htmlFor="wednesday">Miércoles</label>
              </div>
              <div>
                <input type="checkbox" id="thursday" name="days" value="Jueves"  onChange={handleCheckboxChange} />
                <label htmlFor="thursday">Jueves</label>
              </div>
              <div>
                <input type="checkbox" id="friday" name="days" value="Viernes"  onChange={handleCheckboxChange} />
                <label htmlFor="friday">Viernes</label>
              </div>
            </div>

            <button className='buttonPrincipalGlobal' onClick={confirmInformation}>Continuar</button>

          </div>
        </div>
      </div>
    </div >
  );

};

export default CreateTaller2;
