// app/(main)/layout.tsx
"use client";

// import Header from "@/components/Navbar";
import Header from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const currentUser = {
    name: "สมชาย ใจดี",
    role: "แอดมิน",
    initials: "ส.จ."
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={currentUser}/> 
      <div className="flex flex-row min-h-screen grow"> 
        <MySidebar/>
        <main className="flex grow p-4 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

function MySidebar() {
    const pathname = usePathname(); // 2. ดึง Path ปัจจุบัน

    // 3. ฟังก์ชันช่วยกำหนด Class
    const getLinkClasses = (href: string) => {
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
        
        // คลาสพื้นฐานและ Hover
        const baseClasses = "block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150"; 

        if (isActive) {
            // คลาสสำหรับสถานะ Active
            return `${baseClasses} bg-orange-100 text-orange-600`; 
        } else {
            // คลาสสำหรับสถานะ Default และ Hover
            return `${baseClasses} text-gray-600 hover:bg-gray-50 hover:text-orange-600`;
        }
    };

    return (
      <div className="flex flex-col w-64 justify-between border-e border-gray-100 bg-white">
        <div className="px-6 py-6">
          <ul className="mt-2 space-y-1">
            <li className="px-4 pt-4 pb-2 border-b border-gray-200 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                    General
                </span>
            </li>


            <li>
              <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                  <span className="text-sm font-medium"> Teams </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <Link href="/searchLetter" className={getLinkClasses("/searchLetter")}>
                      Banned Users
                    </Link>
                  </li>

                  <li>
                    <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                      Calendar
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                Billing
              </a>
            </li>

            <li>
              <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                Invoices
              </a>
            </li>

            <li>
              <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                  <span className="text-sm font-medium"> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                      Details
                    </a>
                  </li>

                  <li>
                    <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                      Security
                    </a>
                  </li>

                  <li>
                    <a href="#" className="w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600">
                      Logout
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    );
}

