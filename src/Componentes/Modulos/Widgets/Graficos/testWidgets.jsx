

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> IMPORTS 
import React, { useState, useEffect, useRef } from 'react';
import GenderChart from './GraficaPastelSexos'; // Asegúrate de importar el componente adecuadamente
import LineChart from './GraficoLineasRegistroUsuarios'; // Ajusta la ruta del archivo según tu estructura de carpetas
import WidgetPersonalInformation from '../CardUserPersonal';
import '../styles/test.css'

import backendUrl from '../../../../serverConfig';
import axios from 'axios';
import GridCell from './GridCell';
// <LineChart />

/*--------------------------------------------------------  FUNCION PRINCIPAL  -------------------------------------------------------------- */
const TestWidgets = (props) => {
  const [dato, setDato] = useState('CEDIF-01');
  const [respuesta, setRes] = useState('');
  const [rol, setRol] = useState('');
  const handleInput = (event) => { setDato(event.target.value); }
  let datosnuevos = [null];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> DECLARACIONES 
  /**grafica de pastel */
  const datos = [
    ['Género', 'Cantidad'],
    ['Masculino', 40],
    ['Femenino', 60],
  ];
  /**grafica de linea */
  const usersData = [
    ['Mes', 'Usuarios'],
    ['Ene', 20],
    ['Feb', 30],
    ['Mar', 15],
    ['Abr', 35],
    ['May', 47],
    ['Jun', 17],
    ['Jul', 50],
    ['Ago', 75],
    ['Sep', 65],
    ['Oct', 59],
    ['Nov', 70],
    ['Dic', 54],
    // ... y así sucesivamente para los otros meses
  ];
  const datos2 = [
    ['Género', 'Cantidad'],
    ['Masculino', 90],
    ['Femenino', 10],
  ];

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> FUNCIONES 



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> USE EFFECT() 
  useEffect(() => {




    //fetchUsers();
  }, []);



  /*      
  pastel

  <GenderChart 
    color1={'#477BFF'}
    color2={'#47D1CB'}
    hole={0.5}
    titulo={"Distribución de sexo"}
    datos={datos}
    Graphic3D={false}
      />

lineas
          <LineChart 
           color={'#477BFF'}
           titulo={"Registro de usuarios"}
           descripcion={"Comportamiento de la alta de usuarios"}
           titleX={"Meses"}
           titleY={"Usuarios"}
           datos={usersData}
           />
    */

  /* <WidgetPersonalInformation
        Nombre={"Jose Javier Gutierrez Ramirez"}
        Direccion={"Madroño 128, Valle de león, 37140."}
        Sexo={"Masculino"}
        Fecha={"12/03/2001"}
        Familiar={"Cesar Delgado Cardona"}
        Edad={"23 años"}
        Telefono={"4772284248"}
        ID_user={"FFFFFF"}
        ImageURL={"https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/361244890_3228751760604739_6437972533790968361_n.jpg?_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEuR0Wydv3DyV80zvV1CZ75V0CqCGxFihlXQKoIbEWKGWUYBdsw_Vak4xFpVqj2QuDAwg_0FVGQF2KJcGz0GIjz&_nc_ohc=eWSTSq3D4kkAX8UA6rr&_nc_ht=scontent.fbjx1-1.fna&oh=00_AfBZxa1ReVTOuTYMlsrhCv8JV6ht8ccAlEvWTNc8MJp57w&oe=64C4B6E8"}
      />
 
     />

     */

  const enviar = () => {
    serverConect();
  }


  const serverConect = async () => {

    //datos a enviar
    const datosEnviar = {
      dato
    };


    //peticion al server
    axios.post(backendUrl + '/test', datosEnviar)
      .then(response => {
        // Manejar la respuesta del servidor si es necesario
        setRes(response.data.Valor);
        setRol(response.data.Rol);



        //setNombre(response.data.Nombre);


      })
      .catch(error => {
        // Manejar errores si ocurre alguno
        console.error(error);
      });
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-----------> RETURN () 
  return (
    <div class="bd">
   
      </div >
     
      );
};

      export default TestWidgets;
