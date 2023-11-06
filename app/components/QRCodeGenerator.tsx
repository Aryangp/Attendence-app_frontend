"use client"
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  data: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, data, (error) => {
        if (error) {
          console.error(error);
        }
      });
    }
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCodeGenerator;

