import BreadCrumb from '@/components/breadcrumb';
import { KehadiranClient } from '@/components/tables/kehadiran-tables/client';
import { kehadirans } from '@/constants/data';

const breadcrumbItems = [{ title: 'Kehadiran', link: '/dashboard/kehadiran' }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <KehadiranClient data={kehadirans} />
      </div>
    </>
  );
}
