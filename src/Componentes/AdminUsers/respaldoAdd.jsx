import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import backendUrl from '../../serverConfig';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { calculateHash } from '../../hashUtils';
import Swal from 'sweetalert2';
import { SHA256 } from 'crypto-js';
import { button, TextField } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { useSpring, animated } from 'react-spring';


import '../../GlobalStyles/Resources.css';
import './styleAdd.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import NewMenuApplication from '../NuevoMenu/NuevoMenu';

const RespaldoForm = () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  //////////////////////////////////////////////////////////////---------------> Variables a utilizar
  const [PersonalID, setPersonalId] = useState('');
  const [Rol, setRol] = useState('');
  const [ID_Centro, setCentroId] = useState('');
  const [Email, setEmail] = useState('');
  const [pass, setpass] = useState(''); //pass sin hash
  const [Password, setPassword] = useState('');
  const [Acceso, setAcceso] = useState('');
  const [NumUsuario, setNumUs] = useState('');
  const [centros, setCentros] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  const [Indice, setIndice] = useState('');
  const [User_ID, setUserID] = useState('');

  const navigate = useNavigate();

  const GetCID = localStorage.getItem('CID');
  setCentroId(GetCID);
  //////////////////////////////////////////////////////////////---------------> Function para construir PDF
  const handleDownloadPDF = async () => {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Definir propiedades del documento
    const pageSize = page.getSize();
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;

    // Definir las posiciones de los campos en el PDF
    const x = 50;
    let y = pageHeight - 70;

    // Agregar los campos al PDF
    const defaultFontSize = 12;
    const fieldMargin = 10;

    const addFormField = (label, value) => {
      page.drawText(`${label}:`, {
        x,
        y,
        size: defaultFontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText(value, {
        x: x + 100,
        y,
        size: defaultFontSize,
        color: rgb(0, 0, 0),
      });

      y -= defaultFontSize + fieldMargin;
    };





    addFormField('ID de Personal', PersonalID);
    addFormField('Rol', Rol);
    addFormField('ID Centro', ID_Centro);
    addFormField('Email', Email);
    addFormField('Password', pass);
    addFormField('Acceso', Acceso);

    // Generar el PDF en formato bytes
    const pdfBytes = await pdfDoc.save();

    // Crear un objeto Blob y generar una URL para el archivo PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga y hacer clic automáticamente
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Comprobante - ' + User_ID + '.pdf';
    link.click();

    Alerta('success', 'Datos generados', 'Se descargó correctamente')
  };






  //////////////////////////////////////////////////////////////---------------> Metodo para hacer el envío del formulario


  //////////////////////////////////////////////////////////////---------------> Metodo para manejar el cambio de estado del combo de Rol
  const handleRolChange = (e) => {
    const selectedRol = e.target.value;
    setRol(selectedRol);

    // Verificar el rol seleccionado y ajustar el campo de acceso
    if (selectedRol === 'Psicología') {
      setAcceso('ÁREA DE PSICOLOGÍA');
    } else if (selectedRol === 'Enfermería') {
      setAcceso('ÁREA DE ENFERMERÍA');
    } else if (selectedRol === 'Instructor') {
      setAcceso('ÁREA DE TALLERES Y ACTIVIDADES');
    } else if (selectedRol === 'Administrador') {
      setAcceso('TODAS LAS ÁREAS');
    } else if (selectedRol === 'Recepción') {
      setAcceso('ÁREA DE REGISTRO DE USUARIOS');
    } else {
      setAcceso('');
    }
  };

  //////////////////////////////////////////////////////////////---------------> Método para validar si los textbox tienen texto y crear el user ID
  const handleValidation = () => {
    // Realizar la validación de las variables aquí
    // Si las variables tienen información, establece validated en true
    // Ejemplo de validación básica:

      //crear el id de usuario
      
      setValidated(true);
      setShowButtons(true);
      setShowDiv(false); // Ocultar el div
      //Crear JSON
     
      //-------------------------------> Llamar a AddUserBAck
     
      
      
      AlertaTimer('success', 'Datos validados', 1500);
     
  };

  const AddUserBackend = async () => {
 

    try {
      const Data = {
        "Email": Email,
        "Password": pass,
        "Rol": Rol,
        "ID_Centro": ID_Centro
      }
      const response = await axios.post(backendUrl + '/AppConnection/Users', Data);
      const Respuesta = response.data;
      console.log(Respuesta.UserID);
      // Do something with the response
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  

  function Alerta(icono, titulo, texto) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Aceptar'
    })
  }
  function AlertaTimer(icono, titulo, tiempo) {
    Swal.fire({
      position: 'center',
      icon: icono,
      title: titulo,
      showConfirmButton: false,
      timer: tiempo
    })
  }

  const Menu = () => {
    navigate("/loader-DashboardSU");
  }

  
  //////////////////////////////////////////////////////////////---------------RETURN()-------------//////////////////////////////////////////////////////////////////////////////////

  return (
    <body>
      <div className="left-panel">
      <NewMenuApplication/>
      </div>


      {showDiv && (

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

              <button className='buttonPrincipalGlobal' onClick={AddUserBackend}>Validar</button>
              <button className='buttonPrincipalGlobal' onClick={Menu}>Cancelar</button>

            </div>
          </div>
          
        </div>








      )}

      <div className="">


        {validated && (

          <div className="right-panel">
            <div className="right-panel-content">
              <div className="formSecundario">
                <h1 className="titleForm">Finalizar registro</h1>
                <p>Se ha generado un comprobante de registro, lo puedes descargar a continuación, no olvides seleccionar en finalizar registro para guardar los cambios.</p>
                <button className='buttonPrincipalGlobal' onClick={handleDownloadPDF}>Descargar PDF</button>
                <button className='buttonPrincipalGlobal' onClick={'#'}>hghghg</button>


                

              </div>
            </div>
          </div>
        )}
      </div>


    </body>
  );
};

export default RespaldoForm;

