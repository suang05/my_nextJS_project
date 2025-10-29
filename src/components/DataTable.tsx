'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { DataItem, mockData } from '../lib/mockData';

// กำหนด Types สำหรับสถานะการเรียงลำดับ
type SortColumn = keyof DataItem;
type SortDirection = 'asc' | 'desc';

interface DataTableProps {
  data: DataItem[]; // รับข้อมูลจริง
}

// Helper function: ใช้สำหรับเปรียบเทียบค่า
const compare = (a: DataItem, b: DataItem, column: SortColumn, direction: SortDirection): number => {
    const aVal = a[column];
    const bVal = b[column];
    
    let comparison = 0;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal, 'th', { sensitivity: 'base' });
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
    }
    
    return direction === 'desc' ? comparison * -1 : comparison;
};


const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const itemsPerPage = 10;
    
    // สถานะ
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<SortColumn>('id');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    // 1. กรองและเรียงลำดับข้อมูล
    const processedData = useMemo(() => {
        let filtered = data.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // เรียงลำดับ
        filtered.sort((a, b) => compare(a, b, sortColumn, sortDirection));

        return filtered;
    }, [data, searchQuery, sortColumn, sortDirection]);

    const totalItems = processedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // ปรับหน้าปัจจุบันให้อยู่ในขอบเขต
    useMemo(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0) {
             setCurrentPage(1);
        }
    }, [currentPage, totalPages]);


    // 2. แบ่งหน้าข้อมูล
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        return processedData.slice(startIndex, endIndex);
    }, [processedData, currentPage, totalItems]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);


    // 3. Handlers
    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // รีเซ็ตไปหน้าแรกเมื่อค้นหา
    }, []);

    const handleSort = useCallback((column: SortColumn) => {
        setSortColumn(prevCol => {
            if (prevCol === column) {
                // หากคลิกคอลัมน์เดิม ให้เปลี่ยนทิศทาง
                setSortDirection(prevDir => (prevDir === 'asc' ? 'desc' : 'asc'));
            } else {
                // หากคลิกคอลัมน์ใหม่ ให้เรียงแบบ asc
                setSortDirection('asc');
            }
            return column;
        });
        setCurrentPage(1); // รีเซ็ตไปหน้าแรกเมื่อเรียงลำดับ
    }, []);

    const changePage = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }, [totalPages]);

    // Helper function: แสดงไอคอนเรียงลำดับ
    const renderSortIcon = (column: SortColumn) => {
        if (column !== sortColumn) return '↕'; // ไม่ได้เรียงลำดับ
        return sortDirection === 'asc' ? '⬆' : '⬇';
    };

    // Helper function: สร้างปุ่ม Pagination
    const renderPaginationControls = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const pageButtons = [];
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => changePage(i)}
                    className={`w-10 h-10 border rounded-full text-sm font-medium transition duration-150 ${
                        i === currentPage
                            ? 'bg-indigo-700 text-white shadow-lg'
                            : 'bg-white text-indigo-700 hover:bg-indigo-100 border-indigo-300'
                    }`}
                >
                    {i}
                </button>
            );
        }
        
        // เพิ่ม ... ถ้าจำเป็น
        if (endPage < totalPages) {
            pageButtons.push(<span key="dots" className="self-end pb-2 text-gray-500">...</span>);
        }
        
        return pageButtons;
    };


    return (
        <div id="app" className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
            <h1 className="text-3xl font-extrabold text-gray-800 border-b pb-4 mb-6">
                ข้อมูลจากฐานข้อมูล (จำลอง)
            </h1>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <input
                    type="text"
                    id="search-input"
                    placeholder="ค้นหาชื่อรายการ..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full md:w-1/3 p-3 border-2 border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                />
                <div id="status-display" className="text-sm font-medium text-gray-600">
                    {searchQuery 
                        ? `พบ ${totalItems} รายการจากการค้นหา`
                        : `แสดงข้อมูลทั้งหมด ${data.length} รายการ (เรียงตาม ${sortColumn}, ${sortDirection === 'asc' ? 'น้อยไปมาก' : 'มากไปน้อย'})`
                    }
                </div>
            </div>

            {/* ตารางข้อมูล */}
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600">
                        <tr>
                            {/* หัวตาราง ID */}
                            <th onClick={() => handleSort('id')} className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider rounded-tl-lg cursor-pointer hover:bg-indigo-700 transition duration-150 select-none">
                                ID <span className="ml-1">{renderSortIcon('id')}</span>
                            </th>
                            {/* หัวตาราง ชื่อรายการ */}
                            <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-indigo-700 transition duration-150 select-none">
                                ชื่อรายการ <span className="ml-1">{renderSortIcon('name')}</span>
                            </th>
                            {/* หัวตาราง หมวดหมู่ (ไม่เรียงลำดับ) */}
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider hidden sm:table-cell">
                                หมวดหมู่
                            </th>
                            {/* หัวตาราง ราคา */}
                            <th onClick={() => handleSort('price')} className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider rounded-tr-lg cursor-pointer hover:bg-indigo-700 transition duration-150 select-none">
                                ราคา <span className="ml-1">{renderSortIcon('price')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="data-table-body" className="bg-white divide-y divide-gray-100">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => (
                                <tr key={item.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50 transition duration-150`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700 text-right">{item.price.toLocaleString('th-TH')} บาท</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-500">
                                    {totalItems === 0 
                                        ? `ไม่พบรายการสินค้าที่ตรงกับคำค้นหา "${searchQuery}"`
                                        : 'ไม่พบข้อมูลในหน้านี้'
                                    }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ส่วน Pagination และควบคุม */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <div id="pagination-summary" className="text-sm text-gray-600">
                    แสดงรายการที่ {startIndex + 1} ถึง {endIndex} จากทั้งหมด {totalItems} รายการ
                </div>
                <div className="flex space-x-2" id="pagination-controls">
                    {/* ปุ่มก่อนหน้า */}
                    <button 
                        onClick={() => changePage(currentPage - 1)} 
                        disabled={currentPage === 1 || totalPages === 0}
                        className={`px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ${
                            currentPage === 1 || totalPages === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md'
                        }`}
                    >
                        &larr; ก่อนหน้า
                    </button>
                    
                    {/* หมายเลขหน้า */}
                    {renderPaginationControls()}

                    {/* ปุ่มถัดไป */}
                    <button 
                        onClick={() => changePage(currentPage + 1)} 
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`px-4 py-2 border rounded-full text-sm font-medium transition duration-150 ${
                            currentPage === totalPages || totalPages === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md'
                        }`}
                    >
                        ถัดไป &rarr;
                    </button>
                </div>
            </div>

            {/* Message Modal (ถูกตัดออก เพราะควรใช้ Library Modal สำหรับ React/Next.js) */}
            
        </div>
    );
};

export default DataTable;