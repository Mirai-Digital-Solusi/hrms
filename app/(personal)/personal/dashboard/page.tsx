import { getCurrentUser } from '@/utils/supabase/user';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { Overview } from '@/components/overview';
import { RecentSales } from '@/components/recent-sales';
import { createClient } from '@/utils/supabase/server'
import { DigitalClock } from '@/components/digital-clock';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardClockInButton } from '@/components/personal/dashboard-button';
import { Kehadiran, ApprovalAttendances } from '@/constants/data';
import { AttendanceTable } from '@/components/tables/personal-tables/list-kehadiran/attendance-table';
import { columns } from '@/components/tables/personal-tables/list-kehadiran/columns';
import { AttendanceApprovalTable } from '@/components/tables/personal-tables/list-approval/attendance-table';
import { columns as approvalColumns } from '@/components/tables/personal-tables/list-approval/columns';
import { RequestAttendanceDialog } from '@/components/modal/personal/attendance-request/request-attendance';

export default async function page() {
  const currentUser = getCurrentUser();
  const supabase = createClient()

  const page = 1;
  const pageLimit = 10;
  const offset = (page - 1) * pageLimit;

  let { data: employee, error: employeeError } = await supabase
    .from('employees')
    .select()
    .eq('user_id', (await currentUser).id)

  const { count } = await supabase
    .from('attendances')
    .select('id', { count: 'exact', head: true })
    .ilike('name', `%${employee?.[0]?.name}%`);;

  const totalUsers = Math.ceil(count ?? 0 / 10);

  const { data, error } = await supabase
    .from('attendances')
    .select()
    .order('id', { ascending: true })
    .range(offset, offset + pageLimit - 1)
    .ilike('name', `%${employee?.[0]?.name}%`);

  if (error) {
    throw error;
  }

  const { count: approvalCount } = await supabase
    .from('attendances')
    .select('id', { count: 'exact', head: true })
    .ilike('name', `%${employee?.[0]?.name}%`);;

  const totalApproval = Math.ceil(approvalCount ?? 0 / 10);

  const { data: approvalData, error: approvalError } = await supabase
    .from('attendances_approval')
    .select()
    .order('id', { ascending: true })
    .range(offset, offset + pageLimit - 1)
    .ilike('name', `%${employee?.[0]?.name}%`);

  if (error) {
    throw error;
  }

  const pageCount = Math.ceil(totalUsers / pageLimit);
  const attendance: Kehadiran[] = data ?? [];

  const pageApprovalCount = Math.ceil(totalApproval / pageLimit);
  const approval: ApprovalAttendances[] = approvalData ?? [];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome Back {(await currentUser).email} 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <DigitalClock />
          </div>
        </div>
        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="myteam">
              My Team
            </TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <Card className='flex place-content-center'>
                  <div className='grid gap-4 content-center justify-center'>
                    {/* <Button className='bg-lime-400 '>Clock-In</Button> */}
                    <DashboardClockInButton initialData={employee} />
                  </div>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Keterlambatan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      Selamat Anda Tepat Waktu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex place-content-center flex-row">
                    <CardTitle className="text-sm font-medium">
                      Pengajuan Kehadiran
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex place-content-center flex-row">
                      <RequestAttendanceDialog />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card className='px-4'>
                <CardHeader className="flex place-content-center flex-row">
                  <CardTitle className="text-sm font-medium">
                    List Kehadiran
                  </CardTitle>
                </CardHeader>
                <AttendanceTable
                  pageNo={page}
                  columns={columns}
                  totalUsers={totalUsers}
                  data={attendance}
                  pageCount={pageCount}
                />
              </Card>
              <Card className='px-4'>
                <CardHeader className="flex place-content-center flex-row">
                  <CardTitle className="text-sm font-medium">
                    Pengajuan Kehadiran
                  </CardTitle>
                </CardHeader>
                <AttendanceApprovalTable
                  pageNo={page}
                  columns={approvalColumns}
                  totalUsers={totalApproval}
                  data={approval}
                  pageCount={pageApprovalCount}
                />
              </Card>
            </div>

            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
