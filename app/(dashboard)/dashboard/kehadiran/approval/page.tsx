import BreadCrumb from '@/components/breadcrumb';
import { NavigationKehadiran } from '@/components/navigation-menu/navigation-kehadiran/kehadiran';
import { kehadiranNavItems } from '@/constants/data';
// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { columns } from '@/components/tables/kehadiran/main/list-approval/columns';
import { ListApprovalKehadiranClient } from '@/components/tables/kehadiran/main/list-approval/attendance-approval-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApprovalAttendances } from '@/constants/data';
// import { Database } from '@/types/supabase';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [{ title: 'Kehadiran', link: '/dashboard/kehadiran' }];

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
    .from('attendances_approval')
    .select('id', { count: 'exact', head: true })
    .ilike('name', `%${name}%`);;

  const totalUsers = Math.ceil(count ?? 0 / 10);

  const { data, error } = await supabase
    .from('attendances_approval')
    .select()
    .order('id', { ascending: true })
    .range(offset, offset + pageLimit - 1)
    .ilike('name', `%${name}%`);

  if (error) {
    throw error;
  }

  const pageCount = Math.ceil(totalUsers / pageLimit);
  const attendance: ApprovalAttendances[] = data ?? [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <NavigationKehadiran items={kehadiranNavItems} />
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Attendances Approval(${totalUsers})`}
            description="Manage approval of employee attendances"
          />

          <Link
            href={'/dashboard/kehadiran/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <ListApprovalKehadiranClient
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={attendance}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}