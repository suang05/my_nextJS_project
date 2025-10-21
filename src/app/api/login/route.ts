import { NextResponse, NextRequest } from 'next/server';

// 💡 ควรตั้งชื่อ Cookie ให้ตรงกับที่กำหนดใน middleware.ts
const AUTH_TOKEN_COOKIE_NAME = 'AUTH_TOKEN'; 

export async function POST(request: NextRequest) {
    
    // 1. [ขั้นตอนจำลอง] ดึงข้อมูลจาก Body (Optional: สำหรับการทดสอบ)
    // try {
    //    const body = await request.json();
    //    console.log("Attempting login for:", body.username);
    // } catch (e) {
    //    // Handle invalid JSON body
    // }

    const MOCK_JWT_TOKEN = 'mock-jwt-token-12345-from-nextjs-server';
    
    // 2. สร้าง Response Object
    const response = NextResponse.json({ message: 'Login successful, setting cookie' }, { status: 200 });

    // 3. ตั้งค่า AUTH_TOKEN Cookie ลงใน Response
    // Cookie จะถูกส่งไปยังเบราว์เซอร์ผ่าน Header "Set-Cookie"
    response.cookies.set(AUTH_TOKEN_COOKIE_NAME, MOCK_JWT_TOKEN, {
        httpOnly: true, // 🔒 ความปลอดภัย: JS เข้าถึงไม่ได้
        secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ใน Production
        maxAge: 60 * 60 * 24 * 7, // 1 สัปดาห์ (สัมพันธ์กับอายุ JWT)
        path: '/',
        // sameSite: 'strict', // แนะนำ: ป้องกัน CSRF
    });
    
    return response;
}