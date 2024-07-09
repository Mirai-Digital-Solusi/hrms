import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/employee-tables/columns';
import { OvertimeTable } from '@/components/tables/overtime-tables/overtime-table';
import { buttonVariants } from '@/components/ui/button';
import { NavigationKehadiran } from '@/components/navigation-menu/navigation-kehadiran/kehadiran';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee, kehadiranNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [{ title: 'Overtime', link: '/dashboard/kehadiran/overtime' }];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : '')
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = employeeRes.users;
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <NavigationKehadiran items={kehadiranNavItems} />

        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Overtime (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <OvertimeTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={employee}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
