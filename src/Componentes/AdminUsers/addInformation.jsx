import React, { useState, useEffect } from 'react';

import backendUrl from '../../serverConfig';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { PDFDocument, rgb } from 'pdf-lib';

import { useSpring, animated } from 'react-spring';


import '../../GlobalStyles/Resources.css';
import './styleAdd.css';


import NewMenuApplication from '../NuevoMenu/NuevoMenu';

const Formulario_Personal = () => {
 
    //obtener el NewUserID del local storage
    const UID = localStorage.getItem('NewUserID');
    //Recibir el state del navigate
    
// Obtener la cadena JSON almacenada en localStorage
const storedUserDataString = localStorage.getItem('InfoUserNew');

// Convertir la cadena JSON de vuelta a un objeto JavaScript (userData)
const JsonUser = JSON.parse(storedUserDataString);
console.log(JsonUser);



  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

    const [Rol, setRol] = useState('');
    const [ID_Centro, setCentroId] = useState('');
    
    const [pass, setpass] = useState('');
    const [Acceso, setAcceso] = useState('');
  
    const [ApellidoP, setApellidoP] = useState('');
    const [ApellidoM, setApellidoM] = useState('');
    const [Nombre, setNombre] = useState('');
    const navigate = useNavigate();
  

    function GoUser() {
      navigate('/DashboardRoles');
  }

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
  
    const handleDownloadPDF = async (Data) => {
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
  
  
  
  
  
      addFormField('ID de usuario', Data.UserID);
      addFormField('Nombre', Data.Nombre);
      addFormField('Apellido Paterno', Data.ApellidoP);
      addFormField('Apellido Materno', Data.ApellidoM);
      addFormField('Rol asignado', JsonUser.Rol);
      addFormField('Email', JsonUser.Email);
      addFormField('Password', JsonUser.Password);
      addFormField('ID Centro', JsonUser.ID_Centro);
  
      
  
      // Generar el PDF en formato bytes
      const pdfBytes = await pdfDoc.save();
  
      // Crear un objeto Blob y generar una URL para el archivo PDF
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
  
      // Crear un enlace de descarga y hacer clic automáticamente
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Comprobante - ' + Data.UserID + '.pdf';
      link.click();
  
      //Alerta('success', 'Datos generados', 'Se descargó correctamente')
    };

    
    const AddUserBackend = async () => {
      try {
        const InfoPersonalJSON = {
          UserID: UID,
          Nombre: Nombre,
          ApellidoP: ApellidoP,
          ApellidoM: ApellidoM,
        };
        const response = await axios.post(backendUrl + '/AppConnection/Users/InformationPersonal', InfoPersonalJSON);
      if (response.status === 200) {
        //construir un pdf y descargar
        handleDownloadPDF(InfoPersonalJSON);
        Swal.fire({
          icon: 'success',
          title: 'Usuario agregado',
          text: 'Usuario agregado correctamente, se ha generado un comprobante en PDF',
          //validar un boton de aceptar
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            GoUser();
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
                <animated.h1 style={fade} className="titleForm">Completar información</animated.h1>
                
  
  
                <div className='containerInputLabel'>
                  <label className='labelInput'>Ingresa su nombre:</label>
                  <input class="inputGlobal" placeholder="Your name" type="text" value={Nombre} onChange={e => setNombre(e.target.value)} required />
                </div>
  
                <div className='containerInputLabel'>
                  <label className='labelInput'>Ingresa su ap:</label>
                  <input class="inputGlobal" placeholder="AP" type="text" value={ApellidoP} onChange={e => setApellidoP(e.target.value)} required />
                </div>

                <div className='containerInputLabel'>
                  <label className='labelInput'>Ingresa su AM:</label>
                  <input class="inputGlobal" placeholder="AM" type="text" value={ApellidoM} onChange={e => setApellidoM(e.target.value)} required />
                </div>
  
            
  
                <button className='buttonPrincipalGlobal' onClick={AddUserBackend}>Continuar</button>
                
  
              </div>
            </div>
            
          </div>
  
  
      </body>
    );
   
  };
  
  export default Formulario_Personal;
  