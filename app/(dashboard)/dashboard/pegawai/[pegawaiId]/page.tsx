import BreadCrumb from '@/components/breadcrumb';
import { CreateProfile } from '@/components/forms/pegawai-profile-stepper/create-profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'Pegawai', link: '/dashboard/pegawai' },
    { title: 'Create', link: '/dashboard/pegawai/create' }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfile categories={[]} initialData={null} />
      </div>
    </ScrollArea>
  );
}
