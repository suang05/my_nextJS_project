'use client'; // กำหนดให้เป็น Client Component เพราะมีการใช้ useState และการจัดการสถานะเมนู

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // ใช้ไอคอนจาก 'lucide-react' (ต้องติดตั้ง)
import { useMyContext } from '@/context/loginContext';

// *** คำแนะนำ: ติดตั้ง lucide-react ด้วยคำสั่ง: npm install lucide-react ***

const PRIMARY_ORANGE_CLASS = 'text-orange-600';
const LIGHT_ORANGE_CLASS = 'bg-orange-100';

// 1. กำหนด Interface สำหรับ Props ที่ Header ต้องการ
interface User {
    name: string;
    role: string;
    initials: string;
}

interface HeaderProps {
    user: User; // ข้อมูลผู้ใช้ที่ถูกส่งเข้ามาจาก Component แม่
}


// Header Component
const Header = ({ user }: HeaderProps) => {
    const { name, role } = useMyContext();
    return (
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
                        <span className="text-sm font-semibold text-gray-800 block leading-tight">{name} ({role})</span>
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
    )
};

export default Header;
