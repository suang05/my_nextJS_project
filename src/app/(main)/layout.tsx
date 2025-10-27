// app/(main)/layout.tsx

import Header from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const currentUser = {
    name: "สมชาย ใจดี",
    role: "แอดมิน",
    initials: "ส.จ."
  };

  return (
    <>
      <Header user={currentUser}/> 
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <Sidebar/>
        <main>{children}</main>
      </div>
    </>
  );
}

function MyNavbar() {
    return (
        <header className="px-4 bg-gray-800">
            <nav className="flex justify-between items-center">
              <div className="flex-1 bg-gray-800 py-4 text-white">
                logo
              </div>
              <div className="flex gap-4 py-4 bg-gray-800 text-white">
                  <a href="#" className="">Home</a>
                  <a href="#">About</a>
                  <a href="#">Contact</a>
              </div>
              <div className="flex flex-1 justify-end gap-4 bg-gray-800 py-4 text-white">
                <div>
                  username
                </div>
                <div className="h-6 w-px bg-gray-950/10 dark:bg-white/10"></div>
                <a href="#" className="">logout</a>
              </div>
            </nav>
        </header>
    );
}

// 💡 Navbar Component (ตัวอย่าง)
// function Navbar() {
//     return (
//         <header style={{ padding: '15px 20px', backgroundColor: '#333', color: 'white' }}>
//             <h1 style={{ display: 'block', fontSize: '1.5em', marginBlockStart: '0.67em', marginBlockEnd: '0.67em', }}>
//               My App Dashboard
//             </h1>

//         </header>
//     );
// }

// 💡 Sidebar Component (ตัวอย่าง)
// function Sidebar() {
//     return (
//         <nav style={{ 
//             width: '250px', 
//             backgroundColor: '#f4f4f4', 
//             padding: '20px', 
//             borderRight: '1px solid #ddd' 
//         }}>
//             <h3 style={{ marginTop: 0 }}>เมนูหลัก</h3>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//                 <li><a href="/dashboard">หน้าแรก</a></li>
//                 <li><a href="/dashboard/settings">ตั้งค่า</a></li>
//                 {/* ... เมนูอื่นๆ */}
//             </ul>
//         </nav>
//     );
// }
