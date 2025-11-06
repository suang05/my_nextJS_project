// src/components/PdfViewer.tsx
'use client'; 

import { useState, useMemo } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

interface PdfViewerProps {
    base64Pdf: string;    
}

// ฟังก์ชันแปลง Base64 (นำมาจากขั้นตอนที่ 2)
const base64ToPdfUrl = (base64: string): string => {
  // ... (โค้ดฟังก์ชัน base64ToPdfUrl) ...
    let base64WithoutPrefix = base64;
    if (base64.startsWith('data:application/pdf;base64,')) {
        base64WithoutPrefix = base64.substring('data:application/pdf;base64,'.length);
    }
    const binaryString = atob(base64WithoutPrefix);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
};


const PdfViewer = ({ base64Pdf }: PdfViewerProps) => {
    const defaultLayout = defaultLayoutPlugin();
    
    // สร้าง URL เมื่อ base64Pdf เปลี่ยนเท่านั้น
    const pdfUrl = useMemo(() => {
        if (!base64Pdf) return '';
        return base64ToPdfUrl(base64Pdf);
    }, [base64Pdf]);

    if (!pdfUrl) {
        return <div className="text-center p-8 text-gray-500">No PDF data provided.</div>;
    }

    return (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
        <div className="h-[80vh] w-full max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
            <Viewer 
            fileUrl={pdfUrl} 
            plugins={[defaultLayout]} 
            // ปรับ style ด้วย Tailwind ได้ที่นี่
            theme={{
                theme: 'light',
                // สามารถเพิ่ม custom colors ได้ที่นี่
            }}
            />
        </div>
        </Worker>
    );
};

export default PdfViewer;