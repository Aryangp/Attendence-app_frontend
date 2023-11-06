"use client";
import QRCodeScanner from "@/app/components/QRCodeScanner";
import React from "react";

const ScannerForQrCode = () => {
    return (
        <div className="flex justify-center">
            <div className="w-96 h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
                <QRCodeScanner onScan={(data) => console.log(data)} />
            </div>
        </div>
    );
};

export default ScannerForQrCode;
