import DataTable from '@/components/DataTable';
import SearchTableApp from '@/components/searchLetter';
import SearchTableApp2 from '@/components/SearchTableApp2';
import { mockData } from '@/lib/mockData';
import { Sarabun } from 'next/font/google';

const sarabun = Sarabun({ 
  weight: ['400', '700'], 
  subsets: ['latin', 'thai'], 
});

export default function DataPage() {
    const initialData = mockData; 

    return (
      <>
        <SearchTableApp/>
        {/* <DataTable data={initialData} /> */}
      </>
    );
}
