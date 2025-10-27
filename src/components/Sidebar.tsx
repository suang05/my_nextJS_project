// components/Sidebar.tsx
'use client';

import { useMyContext } from '@/context/loginContext';
import Link from 'next/link';

const PRIMARY_ORANGE_CLASS = 'text-orange-600';
const LIGHT_ORANGE_CLASS = 'bg-orange-100';

const isSidebarOpen = true;

const Sidebar = () => {
    // New Links data structure with section headers
    const navItems = [
        { type: 'section', name: 'การค้นหาและเอกสาร' },
        { type: 'link', name: 'ค้นหาเอกสาร', iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", active: true },
        { type: 'link', name: 'อัปโหลดใหม่', iconPath: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12", active: false },
        { type: 'link', name: 'ประวัติการค้นหา', iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", active: false },
        
        { type: 'section', name: 'การบริหารจัดการ', mt: 'mt-6' }, // Add margin-top for separation
        { type: 'link', name: 'จัดการผู้ใช้', iconPath: "M17 20h-4v-4h-2v4H7a2 2 0 01-2-2V7a2 2 0 012-2h4v4h2V5h4a2 2 0 012 2v11a2 2 0 01-2 2z", active: false },
        { type: 'link', name: 'ตั้งค่าระบบ', iconPath: "M10.325 4.317c.426-1.782 2.744-1.782 3.17 0C14.85 5.767 15.688 7.375 18 7.375s3.15-1.608 4.675-3.058c.426-1.782 2.744-1.782 3.17 0A16 16 0 0124 12c0 1.625-.838 3.233-2.325 4.675c-.426 1.782-2.744 1.782-3.17 0A16 16 0 0112 24c-1.625 0-3.233-.838-4.675-2.325c-1.782-.426-1.782-2.744 0-3.17A16 16 0 010 12c0-1.625.838-3.233 2.325-4.675c.426-1.782 2.744-1.782 3.17 0A16 16 0 0112 0z", active: false },
    ];

    const { name } = useMyContext();
    
    return (
        <aside 
            className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl lg:shadow-md border-r border-gray-100 z-20 p-6 transition-transform duration-300 ease-in-out 
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                        lg:translate-x-0`}
        >
            <nav className="space-y-1">
                {navItems.map((item, index) => {
                    if (item.type === 'section') {
                        return (
                            <p 
                                key={index} 
                                className={`text-xs font-semibold uppercase tracking-wider text-gray-400 pt-4 pb-2 px-3 ${item.mt || 'mt-0'}`}
                            >
                                {item.name}
                            </p>
                        );
                    }
                    
                    // Render Link
                    return (
                        <a 
                            key={item.name}
                            href="#" 
                            onClick={() => {}}
                            className={`flex items-center space-x-3 p-3 rounded-xl transition duration-150 ${
                                item.active 
                                    ? `${LIGHT_ORANGE_CLASS} ${PRIMARY_ORANGE_CLASS} font-bold shadow-inner shadow-orange-100`
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.iconPath}></path>
                            </svg>
                            <span>{item.name}</span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;