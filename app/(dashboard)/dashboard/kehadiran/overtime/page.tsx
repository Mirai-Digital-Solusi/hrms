import BreadCrumb from '@/components/breadcrumb';
import { NavigationKehadiran } from '@/components/navigation-menu/navigation-kehadiran/kehadiran';
import { kehadiranNavItems } from '@/constants/data';
// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { columns } from '@/components/tables/kehadiran/overtime/list-overtime/columns';
import { OvertimeTable } from '@/components/tables/kehadiran/overtime/list-overtime/overtime-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Overtime } from '@/constants/data';
// import { Database } from '@/types/supabase';
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
  const name = searchParams.search || '';
  const offset = (page - 1) * pageLimit;


  const supabase = createClient()

  const { count } = await supabase
    .from('overtimes')
    .select('id', { count: 'exact', head: true })
    .ilike('name', `%${name}%`);;

  const totalOvertimes = Math.ceil(count ?? 0 / 10);

  const { data, error } = await supabase
    .from('overtimes')
    .select()
    .order('id', { ascending: true })
    .range(offset, offset + pageLimit - 1)
    .ilike('name', `%${name}%`);

  if (error) {
    throw error;
  }

  const pageCount = Math.ceil(totalOvertimes / pageLimit);
  const overtime: Overtime[] = data ?? [];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <NavigationKehadiran items={kehadiranNavItems} />
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Overtimes (${totalOvertimes})`}
            description="Manage employee overtimes"
          />

          <Link
            href={'/dashboard/kehadiran/overtime/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <OvertimeTable
          searchKey="name"
          pageNo={page}
          columns={columns}
          totalUsers={totalOvertimes}
          data={overtime}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}