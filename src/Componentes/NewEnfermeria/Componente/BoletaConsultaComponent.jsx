import './styleBoletaConsulta.css';
import logo from '../../../assets/logo.png';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';
import { PDFDocument, rgb } from 'pdf-lib';
import qrcode from 'qrcode';

const BoletaConsultaComponente = ({
  //props Nombre, ApellidoP, ApellidoM, Edad, Telefono,  Ciudad , Fecha, Centro, Psicologa, Motivo, ConsultaID
  Nombre,
  ApellidoP,
  ApellidoM,
  Edad,
  Ciudad,
  Fecha,
  Centro,
  Enfermera,
  PresionArterial,
  Temperatura,
  RitmoCardiaco,
  ConsultaID,
  Expediente

}) => {

  const NumExpediente = Expediente.toString();
  const EdadPDF = Edad.toString();
  const TemperaturaPDF = Temperatura.toString();
  const RitmoCardiacoPDF = RitmoCardiaco.toString();
  



  const downloadPDF = () => {
    Swal.fire({
      title: 'Descargando PDF',
      text: 'El PDF se está descargando',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    handleDownloadPDF();
  };





  const handleDownloadPDF = async () => {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Definir propiedades del documento
    const pageSize = page.getSize();
    const pageWidth = pageSize.width;
    const pageHeight = pageSize.height;

    // Definir las posiciones de los campos en el PDF
    let y = pageHeight - 70;

    // Definir estilos de texto

    const fieldMargin = 10;

    // Función para agregar campos de texto al PDF
    const addFormField = async (label, value, x, y, sizeFont) => {
      // Estilo para la etiqueta (label)
      page.drawText(`${label}`, {
        x,
        y,
        size: sizeFont,
        color: rgb(0, 0, 0),
        font: await pdfDoc.embedFont('Courier-Bold'), // Aplica negrita a la etiqueta
      });

      // Estilo para el valor (value)
      page.drawText(value, {
        x: x, // Ajusta la posición x según sea necesario
        y: y - 20,
        size: sizeFont,
        color: rgb(0, 0, 0),
        font: await pdfDoc.embedFont('Courier'), // Usa la fuente Courier New para el valor
      });

      y -= sizeFont + fieldMargin;
    };


    // Aquí generas el código QR como una imagen
    const qrImage = await qrcode.toDataURL(ConsultaID);

    // Dibujar el código QR en el PDF
    const qrImageBytes = await fetch(qrImage).then(res => res.arrayBuffer());
    const qrImageXObject = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImageXObject, {
      x: 50,
      y: pageHeight - 160,
      width: 140,
      height: 140,
    });

    // Agregar los campos al PDF
    addFormField('Fecha:', Fecha, pageWidth - 200, pageHeight - 40, 12); // Ajusta la posición x según sea necesario
    addFormField('Centro:', Centro, pageWidth - 200, pageHeight - 90, 12); // Ajusta la posición x según sea necesario
    addFormField('Ciudad:', Ciudad, pageWidth - 200, pageHeight - 140, 12);

    //
    addFormField('Número de expediente:', NumExpediente, 50, pageHeight - 190, 12);

    //reporte
    addFormField('REPORTE DE CONSULTA', "", pageWidth / 2 - 87, pageHeight - 260, 17);

    // Información del paciente
    addFormField('Nombre(s):', Nombre, 50, pageHeight - 330, 12);
    addFormField('Apellido Paterno:', ApellidoM, 50, pageHeight - 380, 12);
    addFormField('Apellido Materno:', ApellidoM, 50, pageHeight - 430, 12);

    addFormField('Edad:', EdadPDF + ' años', pageWidth - 250, pageHeight - 330, 12);
    

    //enfermera
    addFormField('Profesional que atendió:', Enfermera, 50, pageHeight - 480, 12);
    addFormField('Presión arterial:', PresionArterial, 50, pageHeight - 530, 12);
    addFormField('Temperatura corporal:', TemperaturaPDF, 50, pageHeight - 580, 12);
    addFormField('Ritmo cardíaco:', RitmoCardiacoPDF, 50, pageHeight - 630, 12);


    // Dibujar un footer
    page.drawRectangle({
      x: 50, // posición x del rectángulo
      y: 50, // posición y del rectángulo
      width: pageWidth - 100, // ancho del rectángulo
      height: 70, // alto del rectángulo
      color: rgb(30 / 255, 157 / 255, 224 / 255), // color del borde del rectángulo
      borderWidth: 0, // ancho del borde del rectángulo
    });

    // Insertar el logo en el centro del rectángulo del footer
    const logoWidth = 50; // Ajusta el ancho del logo según sea necesario
    const logoHeight = 25; // Ajusta la altura del logo según sea necesario
    const logoX = 50 + (pageWidth - 100 - logoWidth) / 2; // Calcula la posición x del logo en el centro del rectángulo
    const logoY = 50 + (70 - logoHeight) / 2; // Calcula la posición y del logo en el centro del rectángulo
    const logoImageBytes = await fetch(logo).then(res => res.arrayBuffer());
    const logoImageXObject = await pdfDoc.embedPng(logoImageBytes);
    page.drawImage(logoImageXObject, {
      x: logoX,
      y: logoY,
      width: logoWidth,
      height: logoHeight,
    });


    // Generar el PDF en formato bytes
    const pdfBytes = await pdfDoc.save();

    // Crear un objeto Blob y generar una URL para el archivo PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga y hacer clic automáticamente
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Comprobante-' + ConsultaID + '.pdf'; // Cambia el nombre del archivo según sea necesario
    link.click();
  };

  const goToBack = () => {
    window.history.back();
  }

  return (
    <div className='FormContainerBoletaConsulta'>
      <div className="containerHeaderBoleta">
        <div className="containerQR">
          <QRCode value={ConsultaID} className="QR_Psicologia" />


          <div className="itemText">
            <p className='SubTitle-boleta'>Número de expediente:</p>
            <p className='Value-Boleta'>{Expediente}</p>
          </div>
        </div>
        <div className="containerFecha">
          <div className="itemText">
            <p className='SubTitle-boleta'>Fecha:</p>
            <p className='Value-Boleta'>{Fecha}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Espacio de desarrollo:</p>
            <p className='Value-Boleta'>{Centro}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Ciudad:</p>
            <p className='Value-Boleta'>{Ciudad}</p>
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
            <p className='Value-Boleta'>{Nombre}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Apellido Paterno:</p>
            <p className='Value-Boleta'>{ApellidoP}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Apellido Materno:</p>
            <p className='Value-Boleta'>{ApellidoM}</p>
          </div>

        </div>
        <div className="containerRightInfo">
          <div className="itemText">
            <p className='SubTitle-boleta'>Edad:</p>
            <p className='Value-Boleta'>{Edad} años</p>
          </div>

        </div>
      </div>
      <div className="containerMotivoBoleta">
        <div className="containerPsicologaInfoBoleta">
          <div className="itemText">
            <p className='SubTitle-boleta'>Personal que atendió:</p>
            <p className='Value-Boleta'>{Enfermera}</p>
          </div>

        </div>
        <div className="containerMotivo">
          <div className="itemText">
            <p className='SubTitle-boleta'>Presion Arterial:</p>
            <p className='Value-Boleta'>{PresionArterial}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Temperatura:</p>
            <p className='Value-Boleta'>{Temperatura} °C</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Ritmo Cardíaco:</p>
            <p className='Value-Boleta'>{RitmoCardiaco} LPM</p>
          </div>
        </div>

      </div>
      <div className="containerPieBoleta">
        <button className="btnBoleta" onClick={handleDownloadPDF}>Descargar PDF</button>
        <button className="btnBoleta" onClick={goToBack}>Regresar</button>

      </div>
    </div>
  );

};

export default BoletaConsultaComponente;
