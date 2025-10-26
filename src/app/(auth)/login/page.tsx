"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// ✅ 1. กำหนด LoginData Model/Interface เพื่อความชัดเจนของโครงสร้างข้อมูล
interface LoginData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const loginPayload: LoginData = { username, password };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('loginPayload ', loginPayload);

    // 🔴 1. เรียก API Route (ที่จำลองการตั้งค่า HTTP-Only Cookie)
    const res = await fetch('http://localhost:8080/React_Webpage2/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
      credentials: 'include',
    });
    console.log(res);
    if (res.ok) {
        console.log("Cookie has been set by API Route (simulating Java Server).");
        // 2. Redirect ไปที่ / (Middleware จะจับและส่งไป /dashboard)
        router.replace('/dashboard'); 
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
            ผู้ใช้งาน
          </label>
          <input
            id="email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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