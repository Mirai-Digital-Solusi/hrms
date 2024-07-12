import BreadCrumb from '@/components/breadcrumb';
import { EmployeeForm } from '@/components/forms/employee-form/employee';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { Database } from '@/types/supabase';
import { createClient } from '@supabase/supabase-js'

export default async function Page({params}:any) {
  const breadcrumbItems = [
    { title: 'Employee', link: '/dashboard/employee' },
    { title: params.employeeId === 'new' ? 'Create' : 'Update', link: params.employeeId === 'new' ? '/dashboard/employee/create' : '/dashboard/employee/update' }
  ];

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  )

  let initialData = null

  if(params.employeeId !== "new"){
    const { data, error } = await supabase
    .from('employees')
    .select()
    .eq('id', parseInt(params.employeeId));

    if (error) {
      throw error;
    }

    initialData = data
  }
  

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <BreadCrumb items={breadcrumbItems} />
        <EmployeeForm
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
