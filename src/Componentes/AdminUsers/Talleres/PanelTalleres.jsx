import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../../serverConfig';
import axios from 'axios';

//import '../../GlobalStyles/Resources.css';
//import './styleDash.css';
//import './Style/AdminUser.css';


import NewMenuApplication from '../../NuevoMenu/NuevoMenu';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArchive, FaFile } from 'react-icons/fa';


import HeaderApp from '../../Header/Header';



const PanelTalleres = () => {

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

    const goBoleta = (taller) => {

        const dateObject = new Date(taller.Fecha);
    
        // Formatear la fecha
        const Fecha = `${dateObject.getDate()}-${dateObject.getMonth() + 1}-${dateObject.getFullYear()}`;
        taller.Fecha = Fecha;

        navigate("/PanelTalleres/View/Taller", { state: taller });
    };


    useEffect(() => {

        //validar si estas logeado y en caso de que si, validar que eres psicologo

        if (UID === null) {
            navigate("/Login");
        }
        //console.log(Rol);
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
                    //console.log(response.data);
                    setTalleres(response.data);
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

    function Nuevo_taller() {
        navigate("/PanelTalleres/Create");
    }
    function GoLogOut() {
        navigate("/LoginSU");
    }
    const DeleteUser = () => {
        navigate("/DeleteUserPersonal");
    }
    const GoReasignar = (taller) => {
        navigate("/PanelTalleres/Reasignar", { state: taller });
    }

    const DeleteTaller = (taller) => {
        //Confirmar con un swal si se desea eliminar el usuario
        Swal.fire({
            title: '¿Estás seguro de eliminar este taller?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                RequestDeleteUSR(taller.TallerID);
            }
        })
    };


    const RequestDeleteUSR = async (ID) => {
        try {
            const response = await axios.delete(`${backendUrl}/AppConnection/Talleres/` + ID, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Taller eliminado',
                    text: 'El taller ha sido eliminado correctamente',
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
                    <HeaderApp titulo="Talleres" />
                </div>
                <div className="contenido">
                    <div className="tableContainer">
                        <div className="containerCardTable">
                            <div className="elementsTopContainer">
                                <h1 className='TitleTable' onClick={Nuevo_taller}>Agregar nuevo</h1>
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
                                            <th className='thdT2'>Taller</th>
                                            <th className='thdT2'>Nombre </th>
                                            <th className='thdT2'>Días</th>
                                            
                                            <th className='thdT2'>Horario</th>
                                            <th className='thdT2'>Cupo</th>
            
                                            <th className='thdT2'>Ver mas</th>
                                            <th className='thdT2'>Re-asignar</th>
                                            <th className='thdT2'>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((consult) => (
                                            <tr className='trT2' key={consult.NumeroTaller}>
                                                <td className='tdT2'>{consult.NumeroTaller}</td>
                                                <td className='tdT2'>{consult.Nombre}</td>
                                                <td className='tdT2'>{consult.Dias}</td>
                                                
                                                <td className='tdT2'>{consult.Hora}</td>
                                                <td className='tdT2'>{consult.Cupo} personas</td>
                                                
                                                
                                                <td id="ICON_Table" className='tdT2' onClick={() => goBoleta(consult)}><FaEye /></td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => GoReasignar(consult)}><FaEdit /></td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => DeleteTaller(consult)}><FaTrash /></td>
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

export default PanelTalleres;
