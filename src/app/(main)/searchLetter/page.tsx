import DataTable from '@/components/DataTable';
import { mockData } from '@/lib/mockData';
import { Sarabun } from 'next/font/google';

const sarabun = Sarabun({ 
  weight: ['400', '700'], 
  subsets: ['latin', 'thai'], 
});

// หากใช้ App Router นี่คือ Server Component ที่ดึงข้อมูล
// แล้วส่งผ่านไปยัง Client Component (DataTable)
export default function DataPage() {
    // ในโลกจริง: ดึงข้อมูลจากฐานข้อมูลหรือ API
    const initialData = mockData; 

    return (
<DataTable data={initialData} />
    );
}

// *** หมายเหตุ:
// 1. อย่าลืมติดตั้ง Dependencies: `npm install typescript @types/react @types/node`
// 2. ปรับ `tsconfig.json` ให้รองรับ JSX/TSX
// 3. กำหนดค่า Tailwind CSS ใน `tailwind.config.js` และนำเข้า CSS หลักใน `app/layout.tsx` หรือ `pages/_app.tsx`