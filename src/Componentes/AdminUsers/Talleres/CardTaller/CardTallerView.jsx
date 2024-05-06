
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

  //const NumExpediente = Expediente.toString();


  /*
  
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
      addFormField('Fecha:', Fecha, pageWidth-200, pageHeight -  40, 12); // Ajusta la posición x según sea necesario
      addFormField('Centro:', Centro, pageWidth-200, pageHeight -  90, 12); // Ajusta la posición x según sea necesario
      addFormField('Ciudad:', Ciudad, pageWidth-200, pageHeight -  140, 12);
  
      //
      addFormField('Número de expediente:', NumExpediente, 50, pageHeight -  190, 12);
      
      //reporte
      addFormField('REPORTE DE CONSULTA', "", pageWidth/2-87, pageHeight -  260, 17);
  
      // Información del paciente
      addFormField('Nombre(s):', Nombre, 50, pageHeight -  330, 12);
      addFormField('Apellido Paterno:', ApellidoM, 50, pageHeight -  380, 12);
      addFormField('Apellido Materno:', ApellidoM, 50, pageHeight -  430, 12);
  
      addFormField('Edad:', EdadPDF + ' años' , pageWidth-250, pageHeight -  330, 12);
      addFormField('Número de contacto:', TelefonoPDF, pageWidth-250, pageHeight -  380, 12);
   
      //psicologa
      addFormField('Profesional que atendió:', Psicologa, 50,pageHeight -  480 , 12);
      addFormField('Motivo de consulta:', Psicologa, 50, pageHeight -  530, 12);
  
  
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
      link.download = 'Comprobante-'+ConsultaID+'.pdf'; // Cambia el nombre del archivo según sea necesario
      link.click();
  };
  */
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
            <p id="LabelDias" className='Value-Boleta'>{Dias}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Cupo Total:</p>
            <p className='Value-Boleta'>{Asistentes}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Duración:</p>
            <p className='Value-Boleta'>{Duracion}</p>
          </div>
          <div className="itemText">
            <p className='SubTitle-boleta'>Centro:</p>
            <p className='Value-Boleta'>{Centro}</p>
          </div>
        </div>
        <div className="containerBoletaButtons">
        <button className="btnBoleta" onClick={'#'}>Descargar PDF</button>
        <button className="btnBoleta" onClick={'#'}>Regresar</button>
        </div>
      </div>
    </div>
  );

};

export default CardTallerComponent;
