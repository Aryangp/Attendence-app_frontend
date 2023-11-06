"use client"
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRCodeScanner: React.FC<{ onScan: (data: string | null) => void }> = ({ onScan }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleScan = (data: any) => {
    if (data) {
      onScan(data);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
    setErrorMessage('Error scanning QR code. Please check your camera permissions and try again.');
  };

  return (
    <div>
      <QrReader
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%', height: '100%'  }}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default QRCodeScanner;
