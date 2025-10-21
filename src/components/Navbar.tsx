'use client'; // กำหนดให้เป็น Client Component เพราะมีการใช้ useState และการจัดการสถานะเมนู

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // ใช้ไอคอนจาก 'lucide-react' (ต้องติดตั้ง)

// *** คำแนะนำ: ติดตั้ง lucide-react ด้วยคำสั่ง: npm install lucide-react ***

const navItems = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'สินค้า', href: '/products' },
  { name: 'เกี่ยวกับเรา', href: '/about' },
  { name: 'ติดต่อ', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Navbar หลัก: Fixed อยู่ด้านบนสุด
    <nav className="sticky top-0 z-50 bg-white shadow-md backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ส่วนโลโก้/แบรนด์ */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300">
              NextUI
            </Link>
          </div>

          {/* ส่วนเมนูสำหรับ Desktop */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ปุ่มสำหรับ Mobile Menu (Hamburger Icon) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* แสดงไอคอน X เมื่อเมนูเปิด และไอคอน Menu เมื่อเมนูปิด */}
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (แสดงเมื่อ isOpen เป็น true) */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} absolute w-full bg-white shadow-lg border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleMenu} // ปิดเมนูเมื่อคลิก
              className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}