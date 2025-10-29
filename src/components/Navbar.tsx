'use client'; // กำหนดให้เป็น Client Component เพราะมีการใช้ useState และการจัดการสถานะเมนู

import { useState } from 'react';
import Link from 'next/link';
import { LogOut, Menu, X } from 'lucide-react'; // ใช้ไอคอนจาก 'lucide-react' (ต้องติดตั้ง)
import { useMyContext } from '@/context/loginContext';
import Image from 'next/image';

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
        <header className='min-w-full px-8 flex flex-row h-16 items-center justify-between bg-white shadow-md z-30'>
            <div className="flex justify-center shrink-0" >
                <a className="" href="/login">
                    <span className="sr-only">Home</span> 
                    <Image
                        src="/images/rabbitlife-logo.png"
                        alt="Home Logo"
                        width={150} 
                        height={40}
                        className="object-contain"
                    />
                </a>  
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <span className="text-xs text-gray-500 block leading-tight">ยินดีต้อนรับ,</span>
                    <span className="text-sm font-semibold text-gray-800 block leading-tight">{name} ({role})</span>
                </div>
                <button onClick={() => console.log('Logout clicked')}
                        className="flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-bold bg-[#fb5e3f] text-white">
                    <LogOut size={20} color="white" />
                    <span>ออกจากระบบ</span>
                </button>
            </div>
        </header>
    )
};

export default Header;
