'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'
import { AlertModal } from '@/components/modal/alert-modal';
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
import { useToast } from '../../ui/use-toast';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue
// } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
// import FileUpload from '../../file-upload';


// const ImgSchema = z.object({
//     fileName: z.string(),
//     name: z.string(),
//     fileSize: z.number(),
//     size: z.number(),
//     fileKey: z.string(),
//     key: z.string(),
//     fileUrl: z.string(),
//     url: z.string()
// });
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
    id: z.union([z.string(), z.number(), z.array(z.string()), z.undefined()]),
    name: z
        .string()
        .min(3, { message: 'Employee Name must be at least 3 characters' }),
    gender: z
        .string(),
    status: z
        .string(),
    job: z
        .string(),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
    initialData: any | null;
    categories: any;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
    initialData,
    categories
}) => {
    //const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    //const [imgLoading, setImgLoading] = useState(false);
    const title = initialData ? 'Edit Employee' : 'Create Employee';
    const description = initialData ? 'Edit a Employee.' : 'Add a new Employee';
    //const toastMessage = initialData ? 'Employee updated.' : 'Employee created.';
    const action = initialData ? 'Save changes' : 'Create';

    const supabase = createClient();

    const defaultValues = initialData
        ? initialData[0]
        : {
            id: '',
            name: '',
            gender: '',
            job: '',
            status: '',
        };

    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const onSubmit = async (value: EmployeeFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                // await axios.post(`/api/Employees/edit-Employee/${initialData._id}`, data);
                const { data, error } = await supabase
                    .from('employees')
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
                    .from('employees')
                    .insert([
                        { name: value.name, gender: value.gender, job: value.job, status: value.status },
                    ])
                    .select()
                router.push(`/dashboard/employee`);
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
                .from('employees')
                .delete()
                .eq('id', initialData[0].id)
            router.push(`/dashboard/employee`);
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
                                            placeholder="ID Employee"
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
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Employee Gender"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="job"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Job Employee"
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
                                            placeholder="Status Employee"
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
