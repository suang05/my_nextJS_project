import '@/app/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children} {/* ต้องมีแท็ก HTML และ Body */}
            </body>
        </html>
    );
}