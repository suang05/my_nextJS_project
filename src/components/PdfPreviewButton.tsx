'use client'; 

import { useMemo } from 'react';

interface PdfPreviewButtonProps {
    base64Pdf: string;
    fileName: string; // ชื่อไฟล์สำหรับหน้าต่างใหม่ (optional)
}

// ฟังก์ชันแปลง Base64 (นำมาจากไฟล์เดิม)
const base64ToPdfUrl = (base64: string): string => {
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

// ฟังก์ชันแปลง Base64 (ปรับปรุงให้คืนค่าเป็น Data URL โดยตรง)
const base64ToDataUrl = (base64: string): string => {
    // ตรวจสอบว่ามี prefix อยู่แล้วหรือไม่
    if (base64.startsWith('data:application/pdf;base64,')) {
        return base64; // ถ้ามีอยู่แล้วก็คืนค่าเดิม
    }
    // เพิ่ม Data URL Prefix เข้าไป
    return `data:application/pdf;base64,${base64}`;
};

const PdfPreviewButton = ({ base64Pdf, fileName = 'preview' }: PdfPreviewButtonProps) => {
    // สร้าง URL เมื่อ base64Pdf เปลี่ยนเท่านั้น
    const pdfUrl = useMemo(() => {
        if (!base64Pdf) return '';
        const url = base64ToPdfUrl(base64Pdf);
        return url;
    }, [base64Pdf]);

    // const handlePreview = () => {
    //     if (pdfUrl) {
    //         // 1. เพิ่ม #toolbar=0 เพื่อพยายามซ่อนแถบเครื่องมือ (ใช้ได้กับ Chrome/Edge/IE)
    //         // 2. ใช้ window.open() เพื่อเปิดในหน้าต่างใหม่ (_blank)
    //         // 3. กำหนดขนาดหน้าต่าง (optional: 'width=800,height=600')
    //         // เปิดหน้าต่างใหม่
    //         const newWindow = window.open(`${pdfUrl}#toolbar=0`, '_blank', `noopener,noreferrer`);
            
    //         // **ทางเลือกเสริม:** ตั้งชื่อหน้าต่าง
    //         if (newWindow) {
    //             newWindow.document.title = fileName;
    //         }
    //     }
    // };

    // สร้าง Data URL
    const pdfDataUrl = useMemo(() => {
        if (!base64Pdf) return '';
        return base64ToDataUrl(base64Pdf);
    }, [base64Pdf]);

    const handlePreview = () => {
        if (pdfDataUrl) {
            // Data URL สามารถเปิดได้โดยตรง
            // ข้อควรระวัง: Data URL ที่ยาวมากๆ อาจมีข้อจำกัดด้านความยาวในเบราว์เซอร์บางตัว
            
            // 1. เพิ่ม #toolbar=0 เพื่อพยายามซ่อนแถบเครื่องมือ
            // 2. ใช้ window.open() เพื่อเปิดในหน้าต่างใหม่
            const fullUrl = `${pdfDataUrl}#toolbar=0`;
            const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');
            
            if (newWindow) {
                newWindow.document.title = fileName;
            }
        }
    };

    return (
        <button
            onClick={handlePreview}
            disabled={!pdfUrl}
            className={`
                px-4 py-2 rounded font-semibold transition
                ${pdfUrl 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
            `}
        >
        ดู Preview PDF ในหน้าต่างใหม่
        </button>
    );
};

export default PdfPreviewButton;