import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { getCurrentUser } from '@/utils/supabase/user';
import { createClient } from '@/utils/supabase/server'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();
  const supabase = createClient()

  let { data: employee, error: employeeError } = await supabase
    .from('employees')
    .select()
    .eq('user_id', (await currentUser).id)

  const role = employee?.[0]?.role

  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar role={role}/>
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
}
