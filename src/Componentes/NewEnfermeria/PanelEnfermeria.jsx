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
import { FaEye, FaEdit, FaTrash, FaPlus, FaArchive, FaFile} from 'react-icons/fa';


import HeaderApp from '../Header/Header';



const PanelEnfermeria = () => {

    const [consultas, setConsultas] = useState([]);
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
        //console.log(Rol);
        if (Rol !== 'Enfermería') {
         //navegar a pagina de falta de permisos
            navigate("/PageNotFound");
        }

        const fetchConsultas = async () => {
            try {
                const response = await axios.get(`${backendUrl}/AppConnection/Enfermeria/Consulta/`+UID, {
                    
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    //console.log(response.data);
                    setConsultas(response.data);
                    ////console.log(response.data);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        fetchConsultas();
    }, [backendUrl, CID]);

    function NuevaConsulta() {
        navigate("/Enfermeria/Consulta/Create/1");
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
    const filteredData = consultas.filter(item =>
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <div className="tableContainer">
                        <div className="containerCardTable">
                            <div className="elementsTopContainer">
                                <h1 className='TitleTable' onClick={NuevaConsulta}>Agregar nueva</h1>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre"
                                    className="inputSearch"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="containerTable">
                                <table className='tableT2'>
                                    <thead className='theadT2'>
                                        <tr className='trT2'>
                                            <th className='thdT2'>Consulta</th>
                                            <th className='thdT2'>Nombre </th>
                                            <th className='thdT2'>Apellidos</th>
                                            <th className='thdT2'>Fecha</th>
                                            <th className='thdT2'>Ver</th>
                                            <th className='thdT2'>Abrir</th>
                                            <th className='thdT2'>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((consult) => (
                                            <tr className='trT2' key={consult.NumeroExpediente}>
                                                <td className='tdT2'>{consult.NumeroExpediente}</td>
                                                <td className='tdT2'>{consult.Nombre}</td>
                                                <td className='tdT2'>{consult.ApellidoP + ' ' + consult.ApellidoM}</td>
                                                <td className='tdT2'>{new Date(consult.Fecha).toLocaleDateString('es-ES')}</td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => viewUserInfo(consult)}><FaEye /></td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => goBoleta(consult)}><FaFile /></td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => DeleteUSR(consult)}><FaTrash /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PanelEnfermeria;
