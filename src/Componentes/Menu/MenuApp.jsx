import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";
import backendUrl from '../../serverConfig';

import '../../GlobalStyles/Resources.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importar los estilos del carrusel

import './carrousell.css';

import img1 from '../../GlobalStyles/images/carrousell/1.png';
import img2 from '../../GlobalStyles/images/carrousell/2.png';
import img3 from '../../GlobalStyles/images/carrousell/3.png';
import img4 from '../../GlobalStyles/images/carrousell/4.png';
import img5 from '../../GlobalStyles/images/carrousell/5.png';
import img6 from '../../GlobalStyles/images/carrousell/6.png';
import img7 from '../../GlobalStyles/images/carrousell/7.png';


import NewMenuApplication from '../NuevoMenu/NuevoMenu';
import HeaderApp from '../Header/Header';


const MenuApplication = () => {
    const routeLocation = useLocation();
    const ID = routeLocation.state && routeLocation.state.ID_PERSONAL;
    const Rol = routeLocation.state && routeLocation.state.Rol;

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [copiedPersonalID, setCopiedPersonalID] = useState('');

    const handleRowClick = (personalID) => {
        // Copiar al portapapeles
        navigator.clipboard.writeText(personalID);
        setCopiedPersonalID(personalID);
        Swal.fire({
            icon: 'success',
            title: 'Copiado',
            text: 'ID copiado al portapapeles',
            showConfirmButton: false,
            timer: 800

        })
    };



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(backendUrl + '/api/tableRol');
                const responseData = await response.json();
                if (response.ok) {
                    setUsers(responseData);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        fetchUsers();
    }, []);

    //usuarios
    function GoUser() {
        navigate('/MenuUsers', { state: { ID_PERSONAL: ID, Rol: Rol } });
    }
    function GoPsicologia() {
        navigate('/MenuPsicologia', { state: { ID_PERSONAL: ID, Rol: Rol } });
    }
    function GoEnfermeria() {
        navigate('/MenuEnfermeria', { state: { ID_PERSONAL: ID, Rol: Rol } });
    }
    function GoTalleres() {
        navigate('/MenuTalleres', { state: { ID_PERSONAL: ID, Rol: Rol } });
    }
    function GoEstadistica() {
        navigate('/MenuEstadistica', { state: { ID_PERSONAL: ID, Rol: Rol } });
    }

    function GoUserAdmin() {
        navigate('/DashboardRoles', { state: { ID_PERSONAL: ID, Rol: Rol } });
    }


    function GoLogOut() {
        navigate("/loader-Login");
    }
    const DeleteUser = () => {
        navigate("");
    }
    const ModifyUser = () => {
        navigate("");
    }

    return (
        <div className='Body-PanelSU'>
            <div className="container-Menu">
                <NewMenuApplication/>
            </div>

            <div className="container-Body">
                <div className="headerInfo">
                    <HeaderApp titulo="Home" />
                </div>
                <div className="contenido">
                 
                </div>
            </div>
        </div>
    );
};

export default MenuApplication;
