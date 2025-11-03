'use client';

import React, { useState, useEffect, useCallback } from 'react';

// --- TYPESCRIPT DEFINITIONS ---
interface Document {
    id: string;
    policyNumber: string;
    fullName: string;
    submissionDate: string; // YYYY-MM-DD
    insuranceType: string; // แบบประกัน
    mailNumber: string; // เลขที่จดหมาย
    creationDate: string; // วันที่สร้าง (YYYY-MM-DD)
    status: 'รอจัดจดหมาย' | 'สร้างจดหมายแล้ว' | 'ยกเลิก';
}

interface SearchFilters {
    policyNumber: string;
    fullName: string;
    submissionDate: string; // Date string (YYYY-MM-DD for input type="date")
    mailStatus: '' | 'รอจัดจดหมาย' | 'สร้างจดหมายแล้ว' | 'ยกเลิก';
}

// --- CONFIGURATION & MOCK DATA ---
const PRIMARY_ORANGE_CLASS = 'text-orange-600';
const PRIMARY_BLUE_CLASS = 'bg-blue-500 hover:bg-blue-600';
const PRIMARY_GRAY_CLASS = 'bg-gray-400 hover:bg-gray-500';

const mockDocuments: Document[] = [
    { id: '1', policyNumber: '00308290', fullName: 'ทดสอบ รักเรียน', submissionDate: '2568-07-03', insuranceType: 'เวลล์ 99/2', mailNumber: 'C6800000001', creationDate: '2568-07-03', status: 'รอจัดจดหมาย' },
    { id: '2', policyNumber: '00308291', fullName: 'นิยม รักเรียน', submissionDate: '2568-05-03', insuranceType: 'เวลล์ 99/2', mailNumber: 'C6800000002', creationDate: '2568-07-03', status: 'สร้างจดหมายแล้ว' },
    { id: '3', policyNumber: '00308292', fullName: 'นิยม รักเรียน', submissionDate: '2568-05-03', insuranceType: 'เวลล์ 99/2', mailNumber: 'C6800000003', creationDate: '2568-06-03', status: 'สร้างจดหมายแล้ว' },
    { id: '4', policyNumber: '00308293', fullName: 'ทดสอบ รักเรียน', submissionDate: '2568-07-07', insuranceType: 'เวลล์ 99/2', mailNumber: '', creationDate: '', status: 'ยกเลิก' },
    { id: '5', policyNumber: '00308294', fullName: 'สมศรี มั่นคง', submissionDate: '2568-06-15', insuranceType: 'สุขใจ 80/10', mailNumber: 'C6800000004', creationDate: '2568-07-01', status: 'รอจัดจดหมาย' },
    { id: '6', policyNumber: '00308295', fullName: 'ธงชัย ร่ำรวย', submissionDate: '2568-04-01', insuranceType: 'เวลล์ 99/2', mailNumber: 'C6800000005', creationDate: '2568-05-01', status: 'สร้างจดหมายแล้ว' },
];

// Helper to convert date format DD/MM/YYYY (as shown in image) from YYYY-MM-DD (used in input)
const formatDateDisplay = (dateString: string): string => {
    if (!dateString) return '-';
    try {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            // Assuming YYYY-MM-DD input format
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateString;
    } catch (e) {
        return dateString;
    }
};

// --- COMPONENTS ---

// This component replaces the DocumentCard and renders a table row (tr)
const TableRow: React.FC<{ doc: Document }> = ({ doc }) => {
    const isCancelled = doc.status === 'ยกเลิก';
    const isReadyForMail = doc.status === 'รอจัดจดหมาย';
    const isMailCreated = doc.status === 'สร้างจดหมายแล้ว';

    const getStatusClasses = () => {
        if (isCancelled) return 'bg-gray-200 text-gray-600';
        if (isMailCreated) return 'bg-green-100 text-green-800';
        return 'bg-yellow-100 text-yellow-800'; // รอจัดจดหมาย
    };

    return (
        <tr className={`border-b border-gray-200 transition-colors ${isCancelled ? 'bg-red-50 text-gray-500 italic' : 'hover:bg-orange-50'}`}>
            <td className="p-3 text-center w-12">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" disabled={isCancelled} />
            </td>
            <td className="p-3 text-sm font-medium text-gray-700">{doc.policyNumber}</td>
            <td className="p-3 text-sm text-gray-700">{doc.fullName}</td>
            <td className="p-3 text-sm text-gray-700">{formatDateDisplay(doc.submissionDate)}</td>
            <td className="p-3 text-sm text-gray-700">{doc.insuranceType}</td>
            <td className="p-3 text-sm text-gray-700">{doc.mailNumber || '-'}</td>
            <td className="p-3 text-sm text-gray-700">{doc.creationDate ? formatDateDisplay(doc.creationDate) : '-'}</td>
            <td className="p-3 text-sm">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses()}`}>
                    {doc.status}
                </span>
            </td>
            <td className="p-2 text-sm space-x-2 flex items-center justify-center">
                <button
                    className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition shadow-sm active:scale-[0.98]"
                    title="เรียกดูรายละเอียด"
                    disabled={isCancelled}
                >
                    เรียกดู
                </button>
                <button
                    className="px-3 py-1 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition shadow-sm active:scale-[0.98]"
                    title="สร้างจดหมาย Word"
                    disabled={isCancelled || isMailCreated}
                >
                    Word
                </button>
                <button
                    className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition shadow-sm active:scale-[0.98]"
                    title="สร้างจดหมาย PDF"
                    disabled={isCancelled || isMailCreated}
                >
                    PDF
                </button>
                <button
                    className="px-3 py-1 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 transition shadow-sm active:scale-[0.98]"
                    title="ยกเลิกรายการ"
                    disabled={isCancelled || isMailCreated}
                >
                    ยกเลิก
                </button>
            </td>
        </tr>
    );
};

// *** Simulation of API Call ***
const fetchDocuments = async (filters: SearchFilters): Promise<Document[]> => {
    // Mock Data Filtering
    console.log("Fetching with filters:", filters);

    const { policyNumber, fullName, submissionDate, mailStatus } = filters;

    const filteredResults = mockDocuments.filter(doc => {
        const matchesPolicy = !policyNumber || doc.policyNumber.includes(policyNumber.trim());
        const matchesFullName = !fullName || doc.fullName.toLowerCase().includes(fullName.toLowerCase().trim());

        // For submission date, check if the doc's date is greater than or equal to the filter date
        const matchesDate = !submissionDate || doc.submissionDate >= submissionDate;

        const matchesStatus = !mailStatus || doc.status === mailStatus;

        return matchesPolicy && matchesFullName && matchesDate && matchesStatus;
    });

    return new Promise(resolve => setTimeout(() => resolve(filteredResults), 300)); // Simulate network delay
};

export default function SearchTableApp() {
    const [results, setResults] = useState<Document[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const [filters, setFilters] = useState<SearchFilters>({
        policyNumber: '',
        fullName: '',
        submissionDate: '',
        mailStatus: '',
    });

    const performSearch = useCallback(async () => {
        // Check if all filter fields are empty
        const areFiltersEmpty = Object.values(filters).every(value => value.toString().trim() === '');
        if (areFiltersEmpty) {
            console.log("Filters are empty. Aborting search and clearing results.");
            setResults([]);
            setLoading(false); 
            setInitialLoad(false);
            return;
        }

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
    }, [filters]);

    // Initial load, run search once on mount
    // useEffect(() => {
    //     performSearch();
    // }, [performSearch]);

    const handleFilterChange = (field: keyof SearchFilters, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleClearAll = () => {
        setResults([]);
        setFilters({ policyNumber: '', fullName: '', submissionDate: '', mailStatus: '' });
        console.log('handleClearAll', filters);
        // performSearch();
        // The search will automatically rerun due to dependency in useEffect/useCallback, but we force it here for immediate feedback
        // setTimeout(performSearch, 50);
    };

    return (
        <div className="bg-gray-50 max-w-full w-full min-h-screen font-sans p-4 sm:p-8 lg:p-12">
            <div id="app" className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">ระบบค้นหาเอกสารกรมธรรม์</h1>

                {/* --- Search/Filter Box (Top Frame) --- */}
                <div className="bg-white p-6 rounded-lg shadow-xl mb-8 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">ตัวกรองการค้นหา</h2>
                    <div className="border border-gray-300 p-4 rounded-lg space-y-4 max-w-lg mx-auto">
                        <div className="flex items-center space-x-4">
                            <label className="w-40 text-sm font-medium text-gray-700">เลขที่กรมธรรม์</label>
                            <input
                                type="text"
                                className="flex-grow py-2 px-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
                                value={filters.policyNumber}
                                onChange={(e) => handleFilterChange('policyNumber', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="w-40 text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
                            <input
                                type="text"
                                className="flex-grow py-2 px-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
                                value={filters.fullName}
                                onChange={(e) => handleFilterChange('fullName', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <label className="w-40 text-sm font-medium text-gray-700">วันที่ยื่นข้อเสนอ</label>
                            <input
                                type="date"
                                className="flex-grow py-2 px-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
                                value={filters.submissionDate}
                                onChange={(e) => handleFilterChange('submissionDate', e.target.value)}
                            />
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <label className="w-40 text-sm font-medium text-gray-700">สถานะจดหมาย</label>
                            <select
                                className="flex-grow py-2 px-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-sm"
                                value={filters.mailStatus}
                                onChange={(e) => handleFilterChange('mailStatus', e.target.value)}
                            >
                                <option value="">รอจัดจดหมาย</option>
                                <option value="รอจัดจดหมาย">รอจัดจดหมาย</option>
                                <option value="สร้างจดหมายแล้ว">สร้างจดหมายแล้ว</option>
                                <option value="ยกเลิก">ยกเลิก</option>
                            </select>
                        </div>
                        
                        <div className="pt-2 flex justify-center space-x-4">
                             <button
                                onClick={handleClearAll}
                                className="px-6 py-2 text-sm rounded-md bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-150 active:scale-[0.98]"
                            >
                                ล้างข้อมูล
                            </button>
                            <button
                                onClick={performSearch}
                                disabled={loading}
                                className={`px-6 py-2 text-sm rounded-md bg-orange-600 text-white font-semibold shadow-md hover:bg-orange-700 transition duration-150 active:scale-[0.98] disabled:opacity-50`}
                            >
                                {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Action Buttons (Between Filter and Table) --- */}
                <div className="flex space-x-4 mb-4">
                    <button
                        className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md text-white transition duration-150 active:scale-[0.98] ${PRIMARY_BLUE_CLASS}`}
                        onClick={() => console.log('เรียกดูทั้งหมด')}
                        disabled={loading || results.length === 0}
                    >
                        เรียกดูทั้งหมด
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md text-white transition duration-150 active:scale-[0.98] ${PRIMARY_GRAY_CLASS}`}
                        onClick={() => console.log('สร้างจดหมายทั้งหมด')}
                        disabled={loading || results.length === 0}
                    >
                        สร้างจดหมายทั้งหมด
                    </button>
                </div>

                {/* --- Search Results Table --- */}
                <section>
                    {loading ? (
                        <div className="text-center p-12 bg-white rounded-xl shadow-lg mt-6 text-lg text-gray-500">
                            <div className="animate-spin inline-block w-8 h-8 border-4 border-t-4 border-orange-500 border-opacity-20 rounded-full mb-3"></div>
                            <p>กำลังโหลด...</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-xl overflow-x-auto border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0 z-10">
                                    <tr>
                                        <th className="p-3 text-center w-12 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {/* Checkbox All */}
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            เลขที่กรมธรรม์
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ชื่อ-นามสกุล
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            วันที่ยื่นข้อเสนอ
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            แบบประกัน
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            เลขที่จดหมาย
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            วันสร้าง
                                        </th>
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            สถานะรายการ
                                        </th>
                                        <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px]">
                                            การดำเนินการ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.length > 0 ? (
                                        results.map(doc => (<TableRow key={doc.id} doc={doc} />))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="text-center p-12 text-gray-500 text-lg">
                                                <svg className="w-16 h-16 mx-auto text-orange-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m-6-8h6m0 0L12 9M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-3.3a2 2 0 01-1.414-.586l-1.414-1.414A2 2 0 009.3 5H7a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                                ไม่พบเอกสารที่ตรงกับเงื่อนไขการค้นหา
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
