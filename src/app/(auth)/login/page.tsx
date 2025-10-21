// app/(auth)/login/page.tsx
// ใช้ 'use client' ถ้าต้องการจัดการ state หรือ event ภายในฟอร์ม

"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('start get');

    // const response = await axios.get('http://localhost:8080/React_Webpage2/api/users', {
    //       // 🔑 สำคัญ: ตั้งค่า withCredentials เป็น true เพื่อให้ axios ส่ง Cookies/Credentials ไปด้วย
    //       // ซึ่งจำเป็นเมื่อ Backend (Spring) ตั้งค่า allowCredentials(true)
    //       withCredentials: true,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // สามารถเพิ่ม Header อื่นๆ เช่น Authorization Token ที่นี่ได้
    //       },
    //     });
    //     console.log('start post');
    // 🔴 1. เรียก API Route (ที่จำลองการตั้งค่า HTTP-Only Cookie)
    const res = await fetch('http://localhost:8080/React_Webpage2/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* ส่ง username/password */ }),
      credentials: 'include',
    });
    console.log(res);
    if (res.ok) {
        console.log("Cookie has been set by API Route (simulating Java Server).");
        // 2. Redirect ไปที่ / (Middleware จะจับและส่งไป /dashboard)
        router.replace('/dashboard'); 
        // window.location.href = '/';
    } else {
        alert("Login Failed.");
    }
    
    setLoading(false);
  };

  return (
    <div 
      style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px' }}>
        เข้าสู่ระบบ
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            อีเมล
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            รหัสผ่าน
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              border: '1px solid #ccc', 
              borderRadius: '4px' 
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          เข้าสู่ระบบ
        </button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        ยังไม่มีบัญชี?{' '}
        <Link href="/register" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ลงทะเบียนที่นี่
        </Link>
      </div>
    </div>
  );
}