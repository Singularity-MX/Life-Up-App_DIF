
import logo from '../../../../assets/logo.png';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';
import { PDFDocument, rgb } from 'pdf-lib';
import qrcode from 'qrcode';

import './styleCardTaller.css';
import patron from '../../../../assets/PATRON1.png'
const CardTallerComponent = ({
  //props NombreTaller, Instructor, Horario, Dias, Asistentes, Duracion, TallerID, Centro
  Nombre,
  Instructor,
  Horario,
  Dias,
  Asistentes,
  Duracion,
  TallerID,
  Centro,


}) => {

  const diasRecibidos = Dias.split(',').map(Dias => (
    <p key={Dias} id="LabelDias" className='Value-Boleta'>{Dias.trim()}</p>
));
  //const NumExpediente = Expediente.toString();

//obtener fecha actual
const date = new Date();
const Fecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
const Ciudad = 'León, Gto.';
  
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
  const qrImage = await qrcode.toDataURL(TallerID);
  
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
      addFormField('Fecha:', Fecha, pageWidth-200, pageHeight -  40, 12); // Ajusta la posición x según sea necesario
      addFormField('Centro:', Centro, pageWidth-200, pageHeight -  90, 12); // Ajusta la posición x según sea necesario
      addFormField('Ciudad:', Ciudad, pageWidth-200, pageHeight -  140, 12);
  
      //
      addFormField('Número de actividad:', TallerID, 50, pageHeight -  190, 12);
      
      //reporte
      addFormField('Reporte de actividad', "", pageWidth/2-87, pageHeight -  260, 17);
  
      // Información del paciente
      addFormField('Nombre del instructor:', Instructor, 50, pageHeight -  330, 12);

  
  
      //psicologa
      addFormField('Nombre de actividad:', Nombre, 50,pageHeight -  380 , 12);
      addFormField('Horario:', Horario, 50, pageHeight -  430, 12);
      addFormField('Días de realización:', Dias, 50, pageHeight -  480, 12);
      addFormField('Asistentes:', Asistentes, 50, pageHeight -  530, 12);
      addFormField('Duración:', Duracion, 50, pageHeight -  580, 12);
  
  
  // Dibujar un footer
  page.drawRectangle({
    x: 50, // posición x del rectángulo
    y: 50, // posición y del rectángulo
    width: pageWidth - 100, // ancho del rectángulo
    height: 70, // alto del rectángulo
    color: rgb(30/255, 157/255, 224/255), // color del borde del rectángulo
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
      link.download = 'Comprobante-'+TallerID+'.pdf'; // Cambia el nombre del archivo según sea necesario
      link.click();
  };
  
  const goToBack = () => {
    window.history.back();
  }

  return (
    <div className='ContainerBoletinTaller'>
      <div className="ContainerBoletinPatron">
        <img src={patron} alt="" />
      </div>
      <div className="ContainerLogoDifBoletin">
        <img src={logo} alt="" />
      </div>
      <div className="ContainerContenidoBoletin">
        <div className="containerBoletaText">
          <h3 className="tituloBoletin">{Nombre}</h3>

          <div id="ContainerLabel" className="itemText">
            <p id="Label" className='Value-Boleta'>{Instructor}</p>
          </div>

          <div id="ContainerLabel" className="itemText">
            <p id="LabelHorario" className='Value-Boleta'>{Horario}</p>
          </div>
          <div id="ContainerLabel" className="itemText">
            {diasRecibidos}
          </div>
          <div id="LabelArial" className="itemText">
            <p className='SubTitle-boleta'>Cupo Total:</p>
            <p className='Value-Boleta'>{Asistentes}</p>
          </div>
          <div id="LabelArial" className="itemText">
            <p className='SubTitle-boleta'>Duración:</p>
            <p className='Value-Boleta'>{Duracion}</p>
          </div>
          <div id="LabelArial" className="itemText">
            <p className='SubTitle-boleta'>Centro:</p>
            <p className='Value-Boleta'>{Centro}</p>
          </div>
        </div>
        <div className="containerBoletaButtons">
          <button className="btnBoleta" onClick={downloadPDF}>Descargar PDF</button>
          <button className="btnBoleta" onClick={goToBack}>Regresar</button>
        </div>
      </div>
    </div>
  );

};

export default CardTallerComponent;
