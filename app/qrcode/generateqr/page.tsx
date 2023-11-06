"use client"
import QRCodeGenerator from '@/app/components/QRCodeGenerator'
import React from 'react'

const GenerateQrCode = () => {
  const QrCode = QRCodeGenerator ? <QRCodeGenerator data="https://www.google.com" /> : null;
  return (
      <div>
          <h1>Generate QR Code</h1>
          {QrCode}
    </div>
  )
}

export default GenerateQrCode