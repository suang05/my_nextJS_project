export interface DataItem {
    id: number;
    name: string;
    category: 'เครื่องใช้ไฟฟ้า' | 'อาหารแห้ง' | 'อุปกรณ์สำนักงาน';
    price: number;
}

export const mockData: DataItem[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `รายการสินค้าลำดับที่ ${i + 1}`,
    category: i % 3 === 0 ? 'เครื่องใช้ไฟฟ้า' : i % 3 === 1 ? 'อาหารแห้ง' : 'อุปกรณ์สำนักงาน',
    price: (100 + i * 5),
}));