import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";

import './styleNewMenu.css';

import Logo from '../../assets/logo.png';


const NewMenuApplication = () => {


    const navigate = useNavigate();

    //obtener el rol del local storage
    const rol = localStorage.getItem('Rol');
    //console.log(rol);

    //usuarios
    function GoUser() {
        navigate('/MenuUsers');
    }
   
    function GoEnfermeria() {
        navigate('/MenuEnfermeria');
    }
    function GoTalleres() {
        navigate('/PanelTalleres/Admin');
    }
    function GoEstadistica() {
        navigate('/MenuEstadistica');
    }

    //sdministrador
    function GoUserAdmin() {
        navigate('/DashboardRoles');
    }

    //psicologia
    function GoPsicologia() {
        navigate('/PanelPsicologia');
    }

    //enfermeria
    function GoEnfermeria() {
        navigate('/PanelEnfermeria');
    }

    function GoLogOut() {
        navigate("/loader-Login");
    }

    return (
        <div className="menu">
            <img src={Logo} className='logoo' />
            <div className='contTitleLeft' >
                <label className='labelPanelLeft'>Menu</label>
                <div className='line'></div>
            </div>
            <div className='contMenu' >
                {rol === 'Administrador' && (
                    <>
                        <div className='optionBtn' onClick={GoUserAdmin}>
                            <label className='txtBTN'>Panel de administrador</label>
                        </div>
                        <div className='optionBtn' onClick="#" >
                            <label className='txtBTN'>Psicología</label>
                        </div>
                        <div className='optionBtn' onClick="#" >
                            <label className='txtBTN'>Enfermería</label>
                        </div>
                        <div className='optionBtn' onClick={GoTalleres}>
                            <label className='txtBTN'>Talleres y actividades</label>
                        </div>
                      
                        <div className='optionBtn' onClick={GoLogOut}>
                            <label className='txtBTN'>Cerrar sesión</label>
                        </div>
                    </>
                )}
                {rol === 'Psicología' && (
                    <>
                        <div className='optionBtn' onClick={GoPsicologia}>
                            <label className='txtBTN'>Consultas</label>
                        </div>
                        <div className='optionBtn' onClick={GoLogOut}>
                            <label className='txtBTN'>Cerrar sesión</label>
                        </div>
                    </>
                )}
                {rol === 'Enfermería' && (
                    <>
                        <div className='optionBtn' onClick={GoEnfermeria}>
                            <label className='txtBTN'>Consultas</label>
                        </div>
                        <div className='optionBtn' onClick={GoLogOut}>
                            <label className='txtBTN'>Cerrar sesión</label>
                        </div>
                    </>
                )}
            </div>


        </div>
    );
};

export default NewMenuApplication;
