export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // จัดกึ่งกลางทั้งแนวตั้งและแนวนอน ให้ฟอร์ม Login อยู่กลางหน้าจอ
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5', // สีพื้นหลังอ่อนๆ
      }}
    >
      {/* children ในที่นี้คือเนื้อหาของหน้า page.tsx
        เช่น หน้า Login หรือ หน้า Register 
      */}
      {children}
    </div>
  );
}