// components/DocumentCard.tsx

import { Document, DocumentType } from '@/types/document';
// *** ใช้ @/types/document ถ้าคุณตั้งค่า Path Alias ใน tsconfig.json

// Helper function to format document type
const formatType = (type: DocumentType) => {
    switch (type) {
        case 'report': return 'รายงาน';
        case 'manual': return 'คู่มือ';
        case 'policy': return 'นโยบาย';
        case 'form': return 'แบบฟอร์ม';
        default: return type;
    }
};

// Helper function to format date
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear(); 
    return `เผยแพร่เมื่อ: ${d}/${m}/${y}`;
};

// Map custom colors to standard Tailwind classes for portability
const PRIMARY_ORANGE_CLASS = 'text-orange-600';
const LIGHT_ORANGE_CLASS = 'bg-orange-100';

interface DocumentCardProps {
    doc: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => (
    <div 
        className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-orange-600 cursor-pointer group"
        onClick={() => console.log(`Viewing Document ID: ${doc.id} - ${doc.title}`)}
    >
        {/* ... (โค้ดส่วนอื่น ๆ ของ DocumentCard เหมือนเดิม) ... */}
        <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wider ${PRIMARY_ORANGE_CLASS} ${LIGHT_ORANGE_CLASS} px-3 py-1 rounded-full`}>
                {formatType(doc.type as DocumentType)}
            </span>
            {/* SVG Icon */}
            <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-6v12M15 15l-3-3m0 0l-3 3"></path>
            </svg>
        </div>
        <h3 className={`text-lg font-bold text-gray-800 mb-2 leading-snug group-hover:${PRIMARY_ORANGE_CLASS} transition duration-300`}>
            {doc.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{doc.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{formatDate(doc.date)}</span>
            <span className="font-medium text-gray-600">{doc.department}</span>
        </div>
    </div>
);

export default DocumentCard;