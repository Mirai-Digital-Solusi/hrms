import BreadCrumb from '@/components/breadcrumb';
// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { columns } from '@/components/tables/employees/columns';
import { EmployeeTable } from '@/components/tables/employees/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { Database } from '@/types/supabase';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [{ title: 'Employee', link: '/dashboard/employee' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const name = searchParams.search || '';
  const offset = (page - 1) * pageLimit;
  

  const supabase = createClient()

  const { count } = await supabase
    .from('employees')
    .select('id', { count: 'exact', head: true });

  const totalUsers = Math.ceil(count ?? 0 / 10);

  const { data, error } = await supabase
    .from('employees')
    .select()
    .order('id', { ascending: true })
    .range(offset, offset + pageLimit - 1)
    .ilike('name', `%${name}%`);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return { data: [], totalUsers };
  }

  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = data ?? [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <EmployeeTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={data}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
