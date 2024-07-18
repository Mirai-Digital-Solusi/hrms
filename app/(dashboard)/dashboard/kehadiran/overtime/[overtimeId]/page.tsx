import BreadCrumb from '@/components/breadcrumb';
import { OvertimeForm } from '@/components/forms/kehadiran-form/overtime';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { createClient } from '@/utils/supabase/server'

export default async function Page({params}:any) { 
  const breadcrumbItems = [
    { title: 'Overtime', link: '/dashboard/kehadiran/overtime' },
    { title: params.overtimeId === 'new' ? 'Create' : 'Update', link: params.overtimeId === 'new' ? '/dashboard/kehadiran/overtime/create' : '/dashboard/kehadiran/overtime/update' }
  ];
  
  const supabase = createClient()

  let initialData = null

  if(params.overtimeId !== "new"){
    const { data, error } = await supabase
    .from('overtimes')
    .select()
    .eq('id', parseInt(params.overtimeId));

    if (error) {
      throw error;
    }

    initialData = data
  }

  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        
        <OvertimeForm
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
