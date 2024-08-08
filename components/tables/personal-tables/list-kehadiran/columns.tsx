'use client';
import { Kehadiran } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Kehadiran>[] = [
  {
    id: 'select',
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'created_at',
    header: 'DATE',
    cell: (info:any) => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString('en-CA'); // returns '2024-08-07'
    },
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'check_in',
    header: 'IN'
  },
  {
    accessorKey: 'check_out',
    header: 'OUT'
  },
];
