'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ApprovalAttendances } from '@/constants/data';
import { FileCheck, MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: ApprovalAttendances;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleApproveClick = () => {
    setActionType('Approved');
    setOpen(true);
  };

  const handleRejectClick = () => {
    setActionType('Rejected');
    setOpen(true);
  };

  const router = useRouter();
  const supabase = createClient()
  const { toast } = useToast();

  const onConfirm = async (statusType: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('attendances_approval')
        .update({ status: statusType })
        .eq('id', data.id)
      if (statusType === 'Approved') {
        const dateString = data.date_request;
        const date = new Date(`${dateString}T00:00:00.000Z`);
        const isoString = date.toISOString();
        if (data.type === 'Clock-In') {
          const { error } = await supabase
            .from('attendances')
            .insert([
              { name: data.name, division: data.division, role: data.role, status: "Tepat Waktu", check_in: data.time_request, created_at: isoString },
            ])
            .select()
        }
        else {
          const dateString = data.date_request;
          const date = new Date(`${dateString}T00:00:00.000Z`);
          const isoString = date.toISOString();
          const { error } = await supabase
            .from('attendances')
            .update([
              { check_out: data.time_request },
            ])
            .eq('name', data.name)
            .gte('created_at', isoString)
        }

      }
      router.push(`/dashboard/kehadiran/approval`);
      router.refresh();
      toast({
        variant: 'success',
        title: 'Operation Success.',
        description: 'Operation is successful!'
      });
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirm(actionType)}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={handleApproveClick}
          >
            <FileCheck className="mr-2 h-4 w-4" /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRejectClick}>
            <X className="mr-2 h-4 w-4" /> Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
