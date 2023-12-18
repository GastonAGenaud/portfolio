import {ShowLottie} from '@/components';

import React from 'react';
const ChristmasPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  const getParagraphFontSize = () => {
    const screenWidth = window.innerWidth;
    return screenWidth > 850 ? '1rem' : '0.8rem'; // Tamaño de fuente más pequeño para pantallas menores a 768px
  };

  const paragraphStyle = {
    textAlign: 'center',
    fontSize: getParagraphFontSize(), // Usa la función para ajustar el tamaño de fuente
  };

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '800px',
    padding: '20px',
    background: 'linear-gradient(90deg, #fff2f2, white)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0)',
    zIndex: 1000,
    fontFamily: 'sans-serif',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '10px solid #ff0000', // Borde rojo fino
    '@media (max-width: 768px)': {
      width: '90%',
      height: '90%',
      fontSize: '1rem',
    }
    // ...resto del estilo
  };


  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,

  };

  const buttonStyle = {
    display: 'block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#c0392b',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={overlayStyle} onClick={onClose} />
      <div style={popupStyle}>
        <ShowLottie path="/lotties/Christmas.json" className="mx-auto" />
        <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>
          Merry Christmas!
        </h2>
        <p style={paragraphStyle}>
          Thank you for visiting my portfolio, have a happy holiday season.
        </p>
        <button style={buttonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ChristmasPopup;