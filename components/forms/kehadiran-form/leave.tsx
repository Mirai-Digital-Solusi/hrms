'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    //FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { AlertModal } from '@/components/modal/alert-modal';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../../ui/use-toast';
// import FileUpload from '../../file-upload';
// import { Database } from '@/types/supabase';
// import { createClient } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

// const ImgSchema = z.object({
//   fileName: z.string(),
//   name: z.string(),
//   fileSize: z.number(),
//   size: z.number(),
//   fileKey: z.string(),
//   key: z.string(),
//   fileUrl: z.string(),
//   url: z.string()
// });
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
    id: z.union([z.string(), z.number(), z.array(z.string()), z.undefined()]),
    name: z
        .string()
        .min(3, { message: 'Leave Name must be at least 3 characters' }),
    division: z
        .string(),
    role: z
        .string(),
    type: z
        .string(),
    date_from: z
        .string(),
    date_to: z
        .string(),
    status: z.union([z.string(), z.number(), z.array(z.string()), z.undefined()]),
    description: z
        .string(),
});

type LeaveFormValues = z.infer<typeof formSchema>;

interface LeaveFormProps {
    initialData: any | null;
}

export const LeaveForm: React.FC<LeaveFormProps> = ({
    initialData
}) => {
    //const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Edit Leave' : 'Create Leave';
    const description = initialData ? 'Edit a Leave.' : 'Add a new Leave';
    //const toastMessage = initialData ? 'Leave updated.' : 'Leave created.';
    const action = initialData ? 'Save changes' : 'Create';

    const supabase = createClient();

    const defaultValues = initialData
        ? initialData[0]
        : {
            id: '',
            name: '',
            division: '',
            role: '',
            type: '',
            date_from: '',
            date_to: '',
            status: '',
            description: '',
        };

    const form = useForm<LeaveFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const onSubmit = async (value: LeaveFormValues) => {
        console.log("test initial", initialData)
        try {
            setLoading(true);
            if (initialData) {
                // await axios.post(`/api/Employees/edit-Employee/${initialData._id}`, data);
                const { data, error } = await supabase
                    .from('leaves')
                    .update(value)
                    .eq('id', value.id)
                    .select()
                router.refresh();
                toast({
                    variant: 'success',
                    title: 'Update Success.',
                    description: 'Update operation is successful!'
                });
            } else {
                const { data, error } = await supabase
                    .from('leaves')
                    .insert([
                        { name: value.name, division: value.division, role: value.role, type: value.type, date_from: value.date_from, date_to: value.date_to, status: value.status, description: value.description },
                    ])
                    .select()
                router.push(`/dashboard/kehadiran/leave`);
                router.refresh();
                toast({
                    variant: 'success',
                    title: 'Insert Success.',
                    description: 'Insert operation is successful!'
                });
            }

        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.'
            });
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            const { error } = await supabase
                .from('leaves')
                .delete()
                .eq('id', initialData[0].id)
            router.push(`/dashboard/kehadiran/leave`);
            router.refresh();
        } catch (error: any) {
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    //const triggerImgUrlValidation = () => form.trigger('imgUrl');

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    {/* <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            placeholder="ID Leave"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Nama Pegawai"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Employee Division"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Role Pegawai"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Leave Type"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date_from"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date From</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Date From Leave"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date_to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date To</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Date To Leave"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Status Leave"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Leave Reason"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
