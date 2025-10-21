// components/Sidebar.tsx
'use client';

import Link from 'next/link';

export default function Sidebar() {
  // ความกว้างของ Sidebar
    const widthClass = "w-64"; 

    return (
        <div
        className={`hidden flex-shrink-0 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:flex ${widthClass}`}
        >
        <nav className="flex flex-col space-y-2">
            <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            Menu
            </h3>
            
            {/* รายการเมนู */}
            <Link 
            href="/dashboard"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
            {/*  */}
            Dashboard
            </Link>
            <Link 
            href="/users"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
            {/*  */}
            Users
            </Link>
            <Link 
            href="/products"
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
            {/*  */}
            Products
            </Link>
            
            {/* สามารถเพิ่มส่วนอื่น ๆ เช่น Footer ของ Sidebar ได้ */}
        </nav>
        </div>
    );
}