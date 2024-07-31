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
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardClockInButton } from '@/components/personal/dashboard-button';

export default async function page() {
  const currentUser = getCurrentUser();
  const supabase = createClient()
  let { data: employee, error: employeeError } = await supabase
            .from('employees')
            .select()
            .eq('user_id', (await currentUser).id)
        console.log("data user", employee)
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back {(await currentUser).email} 👋
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
              <DashboardClockInButton initialData={employee}/>
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
                <Button className='text-white'>
            Ajukan
        </Button>
                </CardContent>
              </Card>
              </div>
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
