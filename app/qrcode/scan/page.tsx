"use client"
import QRCodeScanner from "@/app/components/QRCodeScanner";
import React, { useEffect, useState } from "react";

const ScannerForQrCode = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-96 h-96 border-2 border-gray-300 rounded-lg overflow-hidden">
                {isClient && <QRCodeScanner onScan={(data) => console.log(data)} />}
            </div>
        </div>
    );
};

export default ScannerForQrCode;

