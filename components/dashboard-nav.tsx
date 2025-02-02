'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import { ChevronRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
  role?: string;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false,
  role,
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }
  console.log('isActive', isMobileNav, isMinimized);
  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight'];
          const itemRole = item.role?.indexOf(role ?? '');
          return (
            item.label && itemRole !== -1 && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                {item.href && itemRole !== -1 && (
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path.split("/")[2] === item.href.split("/")[2] ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-3 size-5`} />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                )}
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
                {!item.href && itemRole !== -1 && (
                    <span className="ml-3 truncate">{item.title}</span>
                )}
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
