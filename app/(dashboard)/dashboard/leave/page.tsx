import BreadCrumb from '@/components/breadcrumb';
import { KehadiranClient } from '@/components/tables/kehadiran-tables/client';
import { kehadirans } from '@/constants/data';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const breadcrumbItems = [{ title: 'Time Off', link: '/dashboard/leave' }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <NavigationMenu>
          <NavigationMenuList className='gap-2'>
            <NavigationMenuItem>
              <Link href="/dashboard/kehadiran">
              <Button variant="secondary">Attendance</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/overtime" legacyBehavior passHref>
              <Button variant="secondary">Overtime</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/leave" legacyBehavior passHref>
              <Button variant="default">Time Off</Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <BreadCrumb items={breadcrumbItems} />
        <KehadiranClient data={kehadirans} />
      </div>
    </>
  );
}
