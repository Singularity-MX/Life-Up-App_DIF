import React, { useState, useEffect } from 'react';


import './header.css';
//recibir parametros(email, rol y titulo )

const HeaderApp = ({titulo }) => {
 const Email_Active = localStorage.getItem('Email');
 const Rol = localStorage.getItem('Rol');
    return (
        <div className='containerHeader'>
            <div className="cont_titulo">
                <h1>{titulo}</h1>
                <div className="email">
                    <p>{Email_Active}</p>
                </div>
            </div>
            <div className="cont_Rol">
                <p>{Rol}</p></div>
        </div>
    );
};

export default HeaderApp;
