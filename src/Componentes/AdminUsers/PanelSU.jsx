import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';
import axios from 'axios';

//import '../../GlobalStyles/Resources.css';
//import './styleDash.css';
import './Style/AdminUser.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import NewMenuApplication from '../NuevoMenu/NuevoMenu';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';


import HeaderApp from '../Header/Header';

const PanelAdmin = () => {

    const [users, setUsers] = useState([]);
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
        // Use Swal to display user information
        Swal.fire({
            title: 'Información del usuario',
            html: `
             
                <p><strong>Email:</strong> ${user.Email}</p>
                <p><strong>Nombre:</strong> ${user.Nombre}</p>
                <p><strong>Apellidos:</strong> ${user.ApellidoP} ${user.ApellidoM}</p>
                <p><strong>Rol:</strong> ${user.Rol}</p>
                <p><strong>Centro:</strong> ${user.ID_Centro}</p>

                <style>
            
                p{
                    text-align: left;
                    
                }
                </style>
            `,
            confirmButtonText: 'OK'
        });
    };



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.post(`${backendUrl}/AppConnection/Users/Table`, {
                    ID_Centro: CID
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    setUsers(response.data);
                    ////console.log(response.data);
                } else {
                    console.error('Error al obtener los datos de usuarios');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error.message);
            }
        };

        fetchUsers();
    }, [backendUrl, CID]);

    function GoAddUser() {
        navigate("/FormularioPersonal");
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
            title: '¿Estás seguro de eliminar este usuario?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                RequestDeleteINFO(user.UserID);
            }
        })
    };

    const RequestDeleteINFO = async (ID) => {
        try {
            const response = await axios.delete(`${backendUrl}/AppConnection/Users/InformationPersonal/` + ID, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                RequestDeleteUSR(ID);
            } else {
                console.error('Error al eliminar el usuario');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error.message);
        }
    }

    const RequestDeleteUSR = async (ID) => {
        try {
            const response = await axios.delete(`${backendUrl}/AppConnection/Users/` + ID, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado',
                    text: 'El usuario ha sido eliminado correctamente',
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
    const filteredData = users.filter(item =>
        item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='Body-PanelSU'>
            <div className="container-Menu">
                <NewMenuApplication />
            </div>

            <div className="container-Body">
                <div className="headerInfo">
                    <HeaderApp titulo="Usuarios" />
                </div>
                <div className="contenido">
                    <div className="tableContainer">
                        <div className="containerCardTable">
                            <div className="elementsTopContainer">
                                <h1 className='TitleTable' onClick={GoAddUser}>Agregar nuevo</h1>
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
                                            <th className='thdT2'>Email</th>
                                            <th className='thdT2'>Nombre </th>
                                            <th className='thdT2'>Apellidos</th>
                                            <th className='thdT2'>Rol</th>
                                            <th className='thdT2'>Ver</th>
                                            <th className='thdT2'>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((user) => (
                                            <tr className='trT2' key={user.UserID}>
                                                <td className='tdT2'>{user.Email}</td>
                                                <td className='tdT2'>{user.Nombre}</td>
                                                <td className='tdT2'>{user.ApellidoP + ' ' + user.ApellidoM}</td>
                                                <td className='tdT2'>{user.Rol}</td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => viewUserInfo(user)}><FaEye /></td>
                                                <td id="ICON_Table" className='tdT2' onClick={() => DeleteUSR(user)}><FaTrash /></td>
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

export default PanelAdmin;
