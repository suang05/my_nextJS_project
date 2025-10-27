// context/AuthContext.js
'use client'; // Provider ที่ใช้ state/effects ต้องเป็น Client Component

import { createContext, useState, useContext, ReactNode } from 'react';

// 1. กำหนด Type/Interface
interface UserData {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserData | null; // user อาจเป็น UserData หรือ null
  login: (username: string, password: string) => Promise<boolean>; // ระบุพารามิเตอร์และผลลัพธ์
  logout: () => void;
}

// 3. กำหนด Type สำหรับ Provider Props
interface AuthProviderProps {
  children: ReactNode; // 'ReactNode' ครอบคลุมทุกอย่างที่ React สามารถ Render ได้
}

const userContext = createContext<UserData>({
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
});

// 1. สร้าง Context (เหมือนเดิม แต่กำหนด type ของ login ให้ชัดเจนขึ้น)
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false, // ใส่ฟังก์ชันจำลองที่ตรงตาม Type
  logout: () => {},
});

// 2. สร้าง Provider
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);

  // --- นี่คือฟังก์ชัน login ตัวจริง ---
  const login = async (username: string, password: string) => {
    // **ส่วนจำลองการเรียก API**
    // ในแอปจริง: คุณจะยิง 'fetch' หรือ 'axios' ไปยัง API ของคุณที่นี่
    const response = await fetch('/api/login', { 
      method: 'POST', 
      body: JSON.stringify({ username, password }) 
    });
    const data = await response.json();

    console.log("พยายามล็อกอินด้วย:", username, password);

    // จำลองว่า API call สำเร็จหลังจาก 1 วินาที
    // และ API ส่งข้อมูลผู้ใช้กลับมา
    await new Promise(resolve => setTimeout(resolve, 1000));

    // สมมติว่าล็อกอินสำเร็จ ถ้า user="admin" และ pass="1234"
    if (username === "admin" && password === "1234") {
      const userData = {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
      };
      
      setUser(userData); // <-- จุดสำคัญ: อัปเดต Global State
      
      // คุณอาจจะเก็บ token ไว้ใน localStorage ด้วย
      // localStorage.setItem('token', '...your_token_from_api...');
      
      return true; // ส่งค่ากลับไปบอกว่าล็อกอินสำเร็จ
    } else {
      setUser(null); // เคลียร์ user ถ้าล็อกอินไม่ผ่าน
      return false; // ส่งค่ากลับไปบอกว่าล้มเหลว
    }
  };

  const logout = () => {
    console.log("กำลังออกจากระบบ...");
    setUser(null);
    // localStorage.removeItem('token');
  };

  // 3. ส่งค่า state และฟังก์ชันต่างๆ ผ่าน Provider
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom Hook (เหมือนเดิม)
export function useAuth() {
  return useContext(AuthContext);
}