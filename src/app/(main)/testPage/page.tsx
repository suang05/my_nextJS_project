// app/search/page.tsx (หรือ pages/search.tsx ใน Pages Router)

'use client'; // ใช้ถ้าอยู่ใน App Router

import React, { useState, useEffect, useCallback } from 'react';
import DocumentCard from '@/components/DocumentCard';
import { Document, DocumentType, SearchFilters } from '@/types/document';

// --- CONFIGURATION ---
const PRIMARY_ORANGE_CLASS = 'text-orange-600';
const LIGHT_ORANGE_CLASS = 'bg-orange-100';
const RESULTS_GRID_CLASS = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

// Map custom colors to standard Tailwind classes for portability
const formatType = (type: DocumentType) => { /* ... implementation ... */ 
    switch (type) {
        case 'report':
            return 'รายงาน';
        case 'manual':
            return 'คู่มือ';
        case 'policy':
            return 'นโยบาย';
        default:
            return type; // คืนค่าเริ่มต้นหากไม่ตรงเงื่อนไข
    }
};
const mockDocuments: Document[] = [ /* ... your mock data ... */ ];

// *** Simulation of API Call to Java Backend ***
const fetchDocuments = async (filters: SearchFilters): Promise<Document[]> => {
    // 1. Construct Query Parameters
    const params = new URLSearchParams();
    if (filters.searchTerm) params.append('q', filters.searchTerm);
    if (filters.filterType) params.append('type', filters.filterType);
    if (filters.filterDate) params.append('startDate', filters.filterDate); // ส่งไปยัง Java Backend
    if (filters.filterDept) params.append('department', filters.filterDept);

    // 2. Real API Call (You will replace this with actual fetch)
    // const response = await fetch(`http://localhost:8080/api/documents/search?${params.toString()}`);
    // if (!response.ok) throw new Error('Search failed');
    // return response.json();

    // 3. Mock Data Filtering (Keep this logic for testing before API is ready)
    console.log("Fetching with filters:", filters);
    const term = filters.searchTerm.toLowerCase().trim();
    const filteredResults = mockDocuments.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(term) || 
                              doc.description.toLowerCase().includes(term);
        const matchesType = !filters.filterType || doc.type === filters.filterType;
        const matchesDept = !filters.filterDept || doc.department.toLowerCase().includes(filters.filterDept.toLowerCase());
        const matchesDate = !filters.filterDate || doc.date >= filters.filterDate;
        return matchesSearch && matchesType && matchesDept && matchesDate;
    });
    return new Promise(resolve => setTimeout(() => resolve(filteredResults), 300)); // Simulate network delay
};

export default function SearchPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdvancedFiltersVisible, setIsAdvancedFiltersVisible] = useState(false);
    const [results, setResults] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    
    // Combined filter state
    const [filters, setFilters] = useState<SearchFilters>({
        searchTerm: '',
        filterType: '',
        filterDate: '',
        filterDept: '',
    });

    const user = { name: "สมชาย ใจดี", role: "แอดมิน", initials: "ส.จ." };

    const performSearch = useCallback(async () => {
        setInitialLoad(false);
        setLoading(true);
        try {
            const data = await fetchDocuments(filters);
            setResults(data);
        } catch (error) {
            console.error("Error fetching documents:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [filters]); // Dependency on filters

    // Effect to run search when filter states change (except initial load on mount)
    useEffect(() => {
        if (!initialLoad) {
            performSearch();
        }
    }, [filters.filterType, filters.filterDate, filters.filterDept, performSearch, initialLoad]);

    // Initial load, only runs once on mount
    useEffect(() => {
        setInitialLoad(true);
        setResults([]);
    }, []);

    const handleQuickFilter = (type: DocumentType | '') => {
        setFilters(prev => ({ ...prev, filterType: type, searchTerm: '' }));
    };

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };
    
    const getQuickFilterClass = (filter: DocumentType | '') => {
        return filters.filterType === filter
            ? `${LIGHT_ORANGE_CLASS} ${PRIMARY_ORANGE_CLASS} border border-orange-600`
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="flex">
                <main id="main-content" className="flex-grow pt-20 lg:pt-8 lg:ml-64 w-full"> 
                    <div id="app" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        {/* Header and Title Section */}
                        {/* ... (โค้ดส่วนนี้เหมือนเดิม) ... */}

                        {/* Main Search Area */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-10 border border-gray-100">
                            {/* Search Bar Input Group */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-grow">
                                    <input 
                                        type="text" 
                                        placeholder="ป้อนคำสำคัญ, ชื่อเอกสาร, หรือเลขที่เอกสาร..."
                                        className={`w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-xl focus:ring-orange-600 focus:border-orange-600 transition duration-150 shadow-sm text-base`}
                                        value={filters.searchTerm}
                                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                                        onKeyDown={handleSearchInputKeyDown}
                                    />
                                    {/* Search Icon */}
                                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ strokeWidth: 2.5 }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <button 
                                    onClick={performSearch}
                                    disabled={loading}
                                    className={`bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-orange-700 transition duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 disabled:opacity-50`}
                                >
                                    {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
                                </button>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex flex-wrap gap-3 text-sm">
                                <span className="text-gray-600 font-medium self-center mr-2">ตัวกรองด่วน:</span>
                                {['report', 'manual', 'policy'].map(filter => (
                                    <button 
                                        key={filter}
                                        onClick={() => handleQuickFilter(filter as DocumentType)}
                                        className={`px-4 py-1.5 rounded-full font-medium transition duration-150 ${getQuickFilterClass(filter as DocumentType)}`}
                                    >
                                        {formatType(filter as DocumentType)}
                                    </button>
                                ))}
                                
                                <button 
                                    onClick={() => setIsAdvancedFiltersVisible(prev => !prev)}
                                    className={`${PRIMARY_ORANGE_CLASS} hover:text-orange-700 font-medium self-center transition duration-150 ml-auto flex items-center`}
                                >
                                    ตัวกรองเพิ่มเติม
                                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${isAdvancedFiltersVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                            </div>

                            {/* Advanced Filter Dropdown */}
                            <div id="advanced-filters" className={`mt-6 pt-6 border-t border-gray-100 transition-all duration-300 ease-in-out ${isAdvancedFiltersVisible ? 'block' : 'hidden'}`}>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {/* Filter Type */}
                                    <div>
                                        <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-1">ประเภทเอกสาร</label>
                                        <select id="filter-type" className={`w-full border border-gray-300 rounded-lg p-2.5 focus:ring-orange-600 focus:border-orange-600`} value={filters.filterType} onChange={(e) => setFilters(prev => ({ ...prev, filterType: e.target.value as DocumentType | '' }))}>
                                            <option value="">ทั้งหมด</option>
                                            <option value="report">รายงาน</option>
                                            <option value="manual">คู่มือ</option>
                                            <option value="policy">นโยบาย</option>
                                            <option value="form">แบบฟอร์ม</option>
                                        </select>
                                    </div>
                                    {/* Filter Date */}
                                    <div>
                                        <label htmlFor="filter-date" className="block text-sm font-medium text-gray-700 mb-1">ช่วงเวลา (ตั้งแต่)</label>
                                        <input type="date" id="filter-date" className={`w-full border border-gray-300 rounded-lg p-2.5 focus:ring-orange-600 focus:border-orange-600`} value={filters.filterDate} onChange={(e) => setFilters(prev => ({ ...prev, filterDate: e.target.value }))} />
                                    </div>
                                    {/* Filter Department */}
                                    <div>
                                        <label htmlFor="filter-department" className="block text-sm font-medium text-gray-700 mb-1">แผนก</label>
                                        <select id="filter-department" className={`w-full border border-gray-300 rounded-lg p-2.5 focus:ring-orange-600 focus:border-orange-600`} value={filters.filterDept} onChange={(e) => setFilters(prev => ({ ...prev, filterDept: e.target.value }))}>
                                            <option value="">ทุกแผนก</option>
                                            <option value="บัญชีและการเงิน">บัญชีและการเงิน</option>
                                            <option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</option>
                                            <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                                            <option value="การตลาด">การตลาด</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Results Section */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                                ผลการค้นหา <span className={`${PRIMARY_ORANGE_CLASS} font-bold`}>({results.length} รายการ)</span>
                            </h2>
                            {loading && (
                                <div className="text-center p-12 bg-white rounded-xl shadow-lg mt-6 text-lg text-gray-500">กำลังโหลด...</div>
                            )}

                            {/* Placeholder for Search Results */}
                            {!loading && results.length > 0 && (
                                <div id="results-container" className={RESULTS_GRID_CLASS}>
                                    {results.map(doc => (<DocumentCard key={doc.id} doc={doc} />))}
                                </div>
                            )}

                            {/* Message Box for No Results / Initial State */}
                            {!loading && results.length === 0 && (
                                <div id="message-box" className="text-center p-12 bg-white rounded-xl shadow-lg mt-6">
                                    <svg className="w-16 h-16 mx-auto text-orange-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m-6-8h6m0 0L12 9M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-3.3a2 2 0 01-1.414-.586l-1.414-1.414A2 2 0 009.3 5H7a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <p className="text-xl font-semibold text-gray-700">
                                        {initialLoad ? "กรุณาเริ่มต้นการค้นหา" : "ไม่พบเอกสารที่ตรงกับเงื่อนไขการค้นหา"}
                                    </p>
                                    <p className="text-gray-500 mt-2 text-base">
                                        {initialLoad ? "ป้อนคำสำคัญเพื่อเริ่มต้นการค้นหา" : "ลองป้อนคำสำคัญอื่น หรือปรับตัวกรองการค้นหา"}
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

// *** หมายเหตุ: Component Header และ Sidebar ต้องถูกสร้างใน /components เช่นกัน ***