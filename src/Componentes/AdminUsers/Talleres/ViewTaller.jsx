import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../../serverConfig';
import axios from 'axios';

//import '../../GlobalStyles/Resources.css';
//import './styleDash.css';
//import './Style/AdminUser.css';


import NewMenuApplication from '../../NuevoMenu/NuevoMenu';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArchive, FaFile} from 'react-icons/fa';


import HeaderApp from '../../Header/Header';



const ViewTaller = () => {

    const [talleres, setTalleres] = useState([]);
    const navigate = useNavigate();
    const [copiedPersonalID, setCopiedPersonalID] = useState('');


    const UID = localStorage.getItem('UID');
    const CID = localStorage.getItem('CID');
    const Rol = localStorage.getItem('Rol');


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
    
    //crear funcion para ver a informacion del usuario con swal
    const viewUserInfo = (user) => {
        
        const dateObject = new Date(user.Fecha);
    
        // Formatear la fecha
        const formattedDate = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
        
        // Use Swal to display user information
        Swal.fire({
            title: 'Vista rápida ',
            html: `
             
                
                <p><strong>Nombre:</strong> ${user.Nombre + ' ' + user.ApellidoP + ' ' + user.ApellidoM} </p>
                <p><strong>Edad:</strong> ${user.Edad}</p>
                <p><strong>Presión arterial:</strong> ${user.PresionArterial}</p>
                <p><strong>Temperatura:</strong> ${user.Temperatura} C°</p>
                <p><strong>Ritmo Cardíaco:</strong> ${user.RitmoCardiaco} LPM</p>
                

                <style>
            
                p{
                    text-align: left;
                    
                }
                </style>
            `,
            confirmButtonText: 'OK'
        });
    };

    const goBoleta = (user) => {

        const dateObject = new Date(user.Fecha);
    
        // Formatear la fecha
        const Fecha = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
        user.Fecha = Fecha;

        navigate("/Enfermeria/Boleta", { state: user });
    };


    useEffect(() => {

        //validar si estas logeado y en caso de que si, validar que eres psicologo

        if (UID === null) {
            navigate("/Login");
        }
        console.log(Rol);
        if (Rol !== 'Administrador') {
         //navegar a pagina de falta de permisos
            navigate("/PageNotFound");
        }

        const fetchConsultas = async () => {
            try {
                const response = await axios.get(`${backendUrl}/AppConnection/Talleres/`+CID, {
                    
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    console.log(response.data);
                    setTalleres(response.data);
                    //console.log(response.data);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        fetchConsultas();
    }, [backendUrl, CID]);

    function Nuevo_taller() {
        navigate("/PanelTalleres/Create");
    }
    function GoLogOut() {
        navigate("/LoginSU");
    }
    const DeleteUser = () => {
        navigate("/DeleteUserPersonal");
    }
    const ModifyUser = () => {
        navigate("/EditUserPersonal");
    }

    const DeleteUSR = (user) => {
        //Confirmar con un swal si se desea eliminar el usuario
        Swal.fire({
            title: '¿Estás seguro de eliminar esta consulta?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                RequestDeleteUSR(user.NumeroExpediente);
            }
        })
    };


    const RequestDeleteUSR = async (ID) => {
        try {
            const response = await axios.delete(`${backendUrl}/AppConnection/Enfermeria/Consulta/` + ID, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Consulta eliminada',
                    text: 'La consulta ha sido eliminado correctamente',
                    showConfirmButton: true,
                    timer: 1500
                });//cuando se cierre el mensaje se recargara la pagina
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                console.error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }


    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar los datos por el nombre
    const filteredData = talleres.filter(item =>
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='Body-PanelSU'>
            <div className="container-Menu">
                <NewMenuApplication />
            </div>

            <div className="container-Body">
                <div className="headerInfo">
                    <HeaderApp titulo="Boletín" />
                </div>
                <div className="contenido">
                    <div className="tableContainer">
                       
                        
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewTaller;
