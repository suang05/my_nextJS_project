// app/(main)/dashboard/layout.tsx

//import Sidebar from '@/components/Sidebar'; // สมมติว่าสร้าง component นี้แล้ว

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // ใช้ Flexbox หรือ Grid เพื่อจัด Sidebar และ Content ให้อยู่เคียงข้างกัน
    <> 
      {children} 
    </>
  );
}

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