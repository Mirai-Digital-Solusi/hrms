"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavigationKehadiran() {
    return (
        <div>
            <NavigationMenu className="mb-6">
                <NavigationMenuList className='gap-4'>
                    <NavigationMenuItem className="bg-gray-100 rounded-md">
                        <NavigationMenuTrigger className="bg-gray-200 rounded-md">Attendance</NavigationMenuTrigger>
                        <NavigationMenuContent className="rounded-md">
                            <ul className="grid w-[500px] gao-2 grid-cols-2 p-4">
                                <ListItem className="bg-gray-100" href="/dashboard/kehadiran" title="Attendance List">
                                    List all data attendance
                                </ListItem>
                                <ListItem href="/dashboard/kehadiran" title="Attendance Approval">
                                    Attendance entries needing authoritative validation
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Overtime</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[500px] grid-cols-2 p-4">
                                <ListItem href="/dashboard/overtime" title="Overtime List">
                                    List all data overtime
                                </ListItem>
                                <ListItem href="/dashboard/overtime" title="Overtime Approval">
                                    Overtime entries needing authoritative validation
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Time Off</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[500px] grid-cols-2 p-4">
                                <ListItem href="/dashboard/leave" title="Time-off List">
                                    List all data time off
                                </ListItem>
                                <ListItem href="/dashboard/leave" title="Time-off Approval">
                                    Time-off entries needing authoritative validation
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"