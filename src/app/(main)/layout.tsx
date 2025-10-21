// app/(main)/layout.tsx

import { Navbar } from "@/components/Navbar";

// import Navbar from '@/components/Navbar'; // สมมติว่าสร้าง component นี้แล้ว

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}

// 💡 Navbar Component (ตัวอย่าง)
// function Navbar() {
//     return (
//         <header style={{ padding: '15px 20px', backgroundColor: '#333', color: 'white' }}>
//             <h1>My App Dashboard</h1>
//         </header>
//     );
// }

// 💡 Sidebar Component (ตัวอย่าง)
function Sidebar() {
    return (
        <nav style={{ 
            width: '250px', 
            backgroundColor: '#f4f4f4', 
            padding: '20px', 
            borderRight: '1px solid #ddd' 
        }}>
            <h3 style={{ marginTop: 0 }}>เมนูหลัก</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/dashboard">หน้าแรก</a></li>
                <li><a href="/dashboard/settings">ตั้งค่า</a></li>
                {/* ... เมนูอื่นๆ */}
            </ul>
        </nav>
    );
}
