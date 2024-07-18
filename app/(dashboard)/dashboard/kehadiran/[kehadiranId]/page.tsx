import BreadCrumb from '@/components/breadcrumb';
import { KehadiranForm } from '@/components/forms/kehadiran-form/kehadiran';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { createClient } from '@/utils/supabase/server'

export default async function Page({params}:any) { 
  const breadcrumbItems = [
    { title: 'Kehadiran', link: '/dashboard/kehadiran' },
    { title: params.kehadiranId === 'new' ? 'Create' : 'Update', link: params.kehadiranId === 'new' ? '/dashboard/kehadiran/create' : '/dashboard/kehadiran/update' }
  ];
  
  const supabase = createClient()

  let initialData = null

  if(params.kehadiranId !== "new"){
    const { data, error } = await supabase
    .from('attendances')
    .select()
    .eq('id', parseInt(params.kehadiranId));

    if (error) {
      throw error;
    }

    initialData = data
  }

  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        
        <KehadiranForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={initialData}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
