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

const breadcrumbItems = [{ title: 'Kehadiran', link: '/dashboard/kehadiran' }];
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <NavigationMenu className="mb-6">
          <NavigationMenuList className='gap-2'>
            <NavigationMenuItem>
              <Link href="/dashboard/kehadiran">
              <Button variant="default">Attendance</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/overtime" legacyBehavior passHref>
              <Button variant="secondary">Overtime</Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/leave" legacyBehavior passHref>
              <Button variant="secondary">Time Off</Button>
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