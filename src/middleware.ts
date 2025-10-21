import { NextResponse, NextRequest } from 'next/server';

export const AUTH_TOKEN_COOKIE_NAME = 'AUTH_TOKEN'; 

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // 💡 การอ่าน Cookie จาก Request Header
    const authToken = request.cookies.get(AUTH_TOKEN_COOKIE_NAME); 
    const isAuthenticated = !!authToken; // true หากมีค่าใน Cookie

    // [Logic การ Redirect เดิม] ...
    if (pathname === '/') {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    
    // [Logic ป้องกันการเข้าหน้า Auth ซ้ำ] ...
    const authPaths = ['/login', '/register'];
    if (authPaths.includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!authPaths.includes(pathname) && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/dashboard'],
};