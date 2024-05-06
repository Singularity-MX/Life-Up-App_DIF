import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';
import axios from 'axios';

//import '../../GlobalStyles/Resources.css';
//import './styleDash.css';
//import './Style/AdminUser.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import NewMenuApplication from '../NuevoMenu/NuevoMenu';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArchive } from 'react-icons/fa';


import HeaderApp from '../Header/Header';

import './styleViewBoleta.css';
import BoletaConsultaComponente from './Componente/BoletaConsultaComponent';
import { useLocation } from "react-router-dom";



const ViewBoletaEnfermeria = () => {


    const navigate = useNavigate();

    // Obtener la ubicación actual
    const location = useLocation();
    
    // Obtener el objeto de usuario enviado a través de las props de estado
    const user = location.state;

    console.log(user);


    const UID = localStorage.getItem('UID');
    const CID = localStorage.getItem('CID');
    const Rol = localStorage.getItem('Rol');
    const EmailPersonal = localStorage.getItem('Email');

    



    return (
        <div className='Body-PanelSU'>
            <div className="container-Menu">
                <NewMenuApplication />
            </div>

            <div className="container-Body">
                <div className="headerInfo">
                    <HeaderApp titulo="Consultas" />
                </div>
                <div className="contenido">
                    <div className="containerBoletaPsicologia">
                        <BoletaConsultaComponente
                            Nombre= {user.Nombre}
                            ApellidoP={user.ApellidoP}
                            ApellidoM={user.ApellidoM}
                            Edad={user.Edad}
                            Ciudad="León, Guanajuato"
                            Fecha={user.Fecha}
                            Centro={user.ID_Centro}
                            Enfermera={user.Personal}
                            PresionArterial={user.PresionArterial}
                            Temperatura={user.Temperatura}
                            RitmoCardiaco={user.RitmoCardiaco}
                            ConsultaID={user.Expediente_ID}
                            Expediente = {user.NumeroExpediente}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewBoletaEnfermeria;
