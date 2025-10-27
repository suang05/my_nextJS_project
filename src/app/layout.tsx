import '@/app/globals.css';
import { MyProvider } from '@/context/loginContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <MyProvider>
            <html lang="en">
                <body>
                    {children} {/* ต้องมีแท็ก HTML และ Body */}
                </body>
            </html>
        </MyProvider>
    );
}