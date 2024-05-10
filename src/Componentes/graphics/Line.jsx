import React, { useEffect, useRef } from 'react';
import './line.css';
import data from './biomasaData.json';
import LineChartComponent from './LineComponent.jsx';

const ViewGraphic = () => {
 

  return (
    <>
      
      <LineChartComponent data={data} />
    
      
    </>
  );
};

export default ViewGraphic;
