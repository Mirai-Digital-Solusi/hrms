import BreadCrumb from '@/components/breadcrumb';
import { KehadiranForm } from '@/components/forms/kehadiran-form/create-kehadiran';
import { ScrollArea } from '@/components/ui/scroll-area';
import { kehadirans } from '@/constants/data';
import React from 'react';

export default function Page({params}:any) { 
  const breadcrumbItems = [
    { title: 'Kehadiran', link: '/dashboard/kehadiran' },
    { title: params.kehadiranId === 'new' ? 'Create' : 'Update', link: params.kehadiranId === 'new' ? '/dashboard/kehadiran/create' : '/dashboard/kehadiran/update' }
  ];
  
  const dataInitial = kehadirans.find((item) => item.id === parseInt(params.kehadiranId));

  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        
        <KehadiranForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={dataInitial}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
