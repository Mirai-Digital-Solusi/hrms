"use client"
import * as React from "react"
import { KehadiranNavItem } from '@/types';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

interface NavigationKehadiranProps {
    items: KehadiranNavItem[];
}

export function NavigationKehadiran({ items }: NavigationKehadiranProps) {

    const path = usePathname();

    return (
        <div>
            <NavigationMenu className="mb-6">
                <NavigationMenuList className='gap-4'>
                    {items.map((item, index) => {
                        return (
                            <NavigationMenuItem key={index} className="rounded-md border-slate-500 border-2 " >
                                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                <NavigationMenuContent className="rounded-md">
                                    <ul className="grid w-[500px] gap-4 grid-cols-2 p-4">
                                        {item.subNav.map((subItem, subIndex) => {
                                            return (
                                                <ListItem key={subIndex} className={cn(path === subItem.href ? 'bg-accent' : 'transparent')} href={subItem.href} title={subItem.label}>
                                                    {subItem.description}
                                                </ListItem>
                                            )
                                        })}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        )
                    })}

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