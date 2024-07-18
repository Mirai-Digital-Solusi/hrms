'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Leave } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Leave>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'division',
    header: 'DIVISION'
  },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    accessorKey: 'type',
    header: 'TYPE'
  },
  {
    accessorKey: 'date_from',
    header: 'DATE FROM'
  },
  {
    accessorKey: 'date_to',
    header: 'DATE TO'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
