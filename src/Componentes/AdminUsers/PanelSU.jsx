import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import backendUrl from '../../serverConfig';
import axios from 'axios';

import '../../GlobalStyles/Resources.css';
import './styleDash.css';

import logo from '../../GlobalStyles/images/logo.svg';
import imagen from '../../GlobalStyles/images/image1.png';

import NewMenuApplication from '../NuevoMenu/NuevoMenu';
import { FaEye, FaEdit, FaTrash, FaPlus} from 'react-icons/fa';


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
            title: 'User Information',
            html: `
                <p>User ID: ${user.UserID}</p>
                <p>Email: ${user.Email}</p>
                <p>Nombre: ${user.Nombre}</p>
                <p>Apellidos: ${user.ApellidoP} ${user.ApellidoM}</p>
                <p>Rol: ${user.Rol}</p>
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
                    //console.log(response.data);
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

    return (
        <body>
            <div className="left-panel">
                <NewMenuApplication/>
            </div>

            <div className="right-panel">
                <div className="right-panel-content">
                    <div className='formSecundarioBTN'>
                        <button className='buttonPrincipalGlobal' onClick={GoAddUser}>Agregar personal</button>
                        <button className='buttonPrincipalGlobal' onClick={ModifyUser}>Modificar personal</button>
                        <button className='buttonPrincipalGlobal' onClick={DeleteUser}>Eliminar personal</button>
                        <button className='buttonPrincipalGlobal' onClick={GoLogOut}>Cerrar Sesión</button>
                    </div>

                    <div className='table_container'>
                        <h1 className='titleForm'>Personal registrado</h1>
                        <button className='buttonNewStyle' onClick={GoAddUser}>
                            Agregar nuevo usuario <FaPlus />
                        </button>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Rol</th>
                                    <th>Ver</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
    {users.map((user) => (
        <tr key={user.UserID} >
            <td>{user.Email}</td>
            <td>{user.Nombre}</td>
            <td>{user.ApellidoP + ' ' + user.ApellidoM}</td>
            <td>{user.Rol}</td>
            <td onClick={() => viewUserInfo(user)}><FaEye /></td>
            <td><FaEdit /></td>
            <td><FaTrash /></td>
              
        </tr>
    ))}
</tbody>

                        </table>
                    </div>
                </div>
            </div>
        </body>
    );
};

export default PanelAdmin;
