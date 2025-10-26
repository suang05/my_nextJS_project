'use client'; // กำหนดให้เป็น Client Component เพราะมีการใช้ useState และการจัดการสถานะเมนู

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // ใช้ไอคอนจาก 'lucide-react' (ต้องติดตั้ง)

// *** คำแนะนำ: ติดตั้ง lucide-react ด้วยคำสั่ง: npm install lucide-react ***

const PRIMARY_ORANGE_CLASS = 'text-orange-600';
const LIGHT_ORANGE_CLASS = 'bg-orange-100';

const user = {
    name: "สมชาย ใจดี",
    role: "แอดมิน",
    initials: "ส.จ."
};


// Header Component
const Header = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-30 h-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Logo/Title (Left Side) */}
            <div className="flex items-center">
                <span className={`text-2xl font-bold ${PRIMARY_ORANGE_CLASS} tracking-wide`}>
                    Doc<span className="text-gray-800">Finder</span>
                </span>
            </div>
            
            {/* Mobile Toggle Button for Sidebar */}
            
            {/* User Menu (Desktop Right Side) */}
            <div className="hidden lg:flex items-center space-x-4">
                
                {/* Welcome & User Name */}
                <div className="text-right">
                    <span className="text-xs text-gray-500 block leading-tight">ยินดีต้อนรับ,</span>
                    <span className="text-sm font-semibold text-gray-800 block leading-tight">{user.name} ({user.role})</span>
                </div>
                
                {/* Profile Initials */}
                <div className={`w-10 h-10 ${LIGHT_ORANGE_CLASS} rounded-full flex items-center justify-center ${PRIMARY_ORANGE_CLASS} font-bold text-base border-2 border-orange-300 shadow-sm`}>{user.initials}</div>
                
                {/* Separator */}
                <div className="h-6 w-px bg-gray-200"></div>

                {/* Logout Button/Link */}
                <button onClick={() => console.log('Logout clicked')}
                        className="flex items-center space-x-1 text-red-500 hover:text-red-700 p-2 rounded-lg transition duration-150 text-sm font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"></path></svg>
                    <span>ออกจากระบบ</span>
                </button>
            </div>
        </div>
    </nav>
);

export default Header;

// const navItems = [
//   { name: 'หน้าแรก', href: '/' },
//   { name: 'สินค้า', href: '/products' },
//   { name: 'เกี่ยวกับเรา', href: '/about' },
//   { name: 'ติดต่อ', href: '/contact' },
// ];

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     // Navbar หลัก: Fixed อยู่ด้านบนสุด
//     <nav className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-md bg-opacity-80">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* ส่วนโลโก้/แบรนด์ */}
//           <div className="flex-shrink-0">
//             <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300">
//               NextUI
//             </Link>
//           </div>

//           {/* ส่วนเมนูสำหรับ Desktop */}
//           <div className="hidden md:flex space-x-4">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* ปุ่มสำหรับ Mobile Menu (Hamburger Icon) */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={toggleMenu}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//               aria-expanded={isOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* แสดงไอคอน X เมื่อเมนูเปิด และไอคอน Menu เมื่อเมนูปิด */}
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu (แสดงเมื่อ isOpen เป็น true) */}
//       <div
//         className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute w-full bg-white shadow-lg border-t border-gray-200`}
//       >
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               onClick={toggleMenu} // ปิดเมนูเมื่อคลิก
//               className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }