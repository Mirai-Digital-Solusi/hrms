import BreadCrumb from '@/components/breadcrumb';
import { LeaveForm } from '@/components/forms/kehadiran-form/leave';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { createClient } from '@/utils/supabase/server'

export default async function Page({params}:any) { 
  const breadcrumbItems = [
    { title: 'Leave', link: '/dashboard/kehadiran/leave' },
    { title: params.leaveId === 'new' ? 'Create' : 'Update', link: params.leaveId === 'new' ? '/dashboard/kehadiran/leave/create' : '/dashboard/kehadiran/leave/update' }
  ];
  
  const supabase = createClient()

  let initialData = null

  if(params.leaveId !== "new"){
    const { data, error } = await supabase
    .from('leaves')
    .select()
    .eq('id', parseInt(params.leaveId));

    if (error) {
      throw error;
    }

    initialData = data
  }

  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        
        <LeaveForm
          initialData={initialData}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
