// app/(main)/layout.tsx

// import Navbar from '@/components/Navbar'; // สมมติว่าสร้าง component นี้แล้ว

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* องค์ประกอบที่อยู่ด้านบนสุดของทุกหน้าในกลุ่ม (main) */}
      <Navbar /> 
      
      {/* children จะเป็นเนื้อหาของ DashboardLayout ถัดไป */}
      <main style={{ padding: '0 20px' }}>
        {children}
      </main>
    </div>
  );
}

// 💡 Navbar Component (ตัวอย่าง)
function Navbar() {
    return (
        <header style={{ padding: '15px 20px', backgroundColor: '#333', color: 'white' }}>
            <h1>My App Dashboard</h1>
        </header>
    );
}
