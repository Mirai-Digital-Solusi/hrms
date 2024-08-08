'use client';
import { ApprovalAttendances } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<ApprovalAttendances>[] = [
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
    accessorKey: 'date_request',
    header: 'REQUESTED DATE'
  },
  {
    accessorKey: 'type',
    header: 'TYPE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'reason',
    header: 'REASON'
  },
];
