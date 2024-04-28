import React from 'react';

import './UnauthorizedPage.css'; // Archivo de estilos CSS

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>Acceso no autorizado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
        <p>Por favor, inicia sesión con una cuenta autorizada.</p>
       <button className="btn btn-primary" onClick={() => window.location.href = '/Login'}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
