import './styleBoletaConsulta.css';
import logo from '../../../assets/logo.png';
import Swal from 'sweetalert2';

const BoletaConsultaComponente = () => {

  const downloadPDF = () => {
    Swal.fire({
      title: 'Descargando PDF',
      text: 'El PDF se está descargando',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  return (
    <div className='FormContainerBoletaConsulta'>
      <div className="containerHeaderBoleta">
        <div className="containerQR">
          <img className="QR_Psicologia" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAElBMVEX///8AAABjY2OpqamAgIBCQkKMDClhAAAD40lEQVRoge2Z4XrrIAiGjcD93/JJQAgCptm6dtt5xo8+JjGv+klAbWt/trCtsM5PgMuoFeUSWkNXc7/sFeF/gCeh+kyG6nVpReBZ6Z8Pb3fg+grN8E2bMMHF0JUFTk7t74W3jQ47btHOAS6ecHoOrmpLt0F/Q7d/LpzodfDmpjLArYlvhtMwXMCRJbqAoxIKuLcKbp0P9rnP/0VwCHDqu57U+wHvo2y/AoeZMMGTdW0i+zk4wS0qZnsIx+fhvTDk+6IDWBPujmD38l4RK0K7Z35CxXC+fMaehcMwK9v9xmPv6hj89ICTDBxSC/51Me0badmyv0/9kEZROmF07c/CMX0+lOEdccAB8LChgMCHOLjf2KvtdQ+J2LoWTNX9EWK/Uka7ujlXtztlEDA1KETFj8OxRJdwGRIOG4IwiuQScVSR5rgysT7IBTFEeTJ+lxPsPn8/CrMQzK80eTX8HAabqaGiiSC7Dn2G74/YPVCwwBhR5oS3pcHcYZjhXfvc49DXmeg2HGdBargMwwbjCkcYUU9igY4PRxxCLr0gqiJsIVlwgfTOamdRKhP6PDnIl8Ipw3UwJILgkGWCs0TI8aQDe4U6jAUWESTK0orPP8DDzLbk6s2FxPfBbTw2PF+Yy8NbtOBr0SlwXFqcfebLsEQPwwmjCN1+HxwqG6zpjr/qM1xk8aKeE+qGEFahfisHjpYXGJQDSYIHh7mGe1IBn78BssvgCnI1Phw0OAJaLYNLhdx5v8ldLTB8SPQe7jV4CEcHvIb3FVxz6hBBYqkkaEApdDhzd3NRpWu0lgJpTovesg6J5UI0rLj6/PlHTRK83YB3V6jhLMUhoOQbXq6MvKPLOUvQIWQNF+IELQzI696tsDCnvvN5e24WyR+Hw324jUcrkAUH9aIxuTBWfbIRkKQMbtFLKm3sdrsbW2wIYenScgJ9A7y5/KreYmsV05zEK3QLICIJsA9HK+HLmS0TKM6FbM/A7+wCVFbn9y6+jr2/7qC5Ib4/to0WZEZ90hYPlR7uoOe9/+acfEuxpa1y6MLCqYUHbtWnWsNXBwvaBKkyUhj33bYaWYRx9tJ7nNBkfl2xLY5bbX4tJLYcGL8UHgVP6o/sSedJi5NonOvmvb9l52t42+JJkR8FzJnopXB76QpeHVrKQW5THcaiRTURuL4nZ+Hj0DLCdYL8cWtYXfhfg2e7CW8VPJz5fxLOQ5UjXJIhWwRgZZB/zWHMwydlFvC8btlmJwm7uWLP8n3w6bTBGSbxg+0Kvg5+dv4N8PlZ+BPKmwf6zYXfjVbNPAW/mtDXwZPleF6awf3Zxa+Al5OYZf4zb/8A/I8e8NwAc6AAAAAASUVORK5CYII="/>
        </div>
        <div className="containerFecha">
          <div className="itemText">
            <p className='SubTitle-boleta'>Fecha:</p>
            <p className='Value-Boleta'>20/02/2000</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Centro:</p>
            <p className='Value-Boleta'>La casa de los abuelos</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Ciudad:</p>
            <p className='Value-Boleta'>León Gto.</p>
          </div>
        </div>
      </div>
      <div className="ContainerEncabezadoInfo">
        <p><strong>REPORTE DE CONSULTA</strong></p>
      </div>
      <div className="containerInfoBoleta">
        <div className="containerLeftInfo">
        <div className="itemText">
            <p className='SubTitle-boleta'>Nombre(s):</p>
            <p className='Value-Boleta'>Jose Javier</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Apellido Paterno:</p>
            <p className='Value-Boleta'>Gutiérrez</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Apellido Materno:</p>
            <p className='Value-Boleta'>Ramírez</p>
          </div>
          
        </div>
        <div className="containerRightInfo">
        <div className="itemText">
            <p className='SubTitle-boleta'>Edad:</p>
            <p className='Value-Boleta'>24 años</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Número de contacto:</p>
            <p className='Value-Boleta'>477-228-42-48</p>
          </div>
        </div>
      </div>
      <div className="containerMotivoBoleta">
        <div className="containerPsicologaInfoBoleta">
          <div className="itemText">
            <p className='SubTitle-boleta'>Psicóloga:</p>
            <p className='Value-Boleta'>psicologa@gmail.com</p>
          </div>
          
        </div>
        <div className="containerMotivo">
        <div className="itemText">
            <p className='SubTitle-boleta'>Motivo de consulta:</p>
            <p className='Value-Boleta'>Pikachu es un personaje perteneciente a la franquicia Pokémon, ​ que hizo su primera aparición en los videojuegos Pokémon Rojo y Azul, siendo el Pokémon número 25 de la lista de Pokémon registrada en el Pokédex nacional</p>
          </div>
        </div>
      </div>
      <div className="containerPieBoleta">
        <button className="btnBoleta" onClick={downloadPDF}>Descargar PDF</button>
        <div className="Footer">
          <img src={logo} alt="Logo-DIF" border="0" />
        </div>
      </div>
    </div>
  );

};

export default BoletaConsultaComponente;
