"use client"
import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover-without-portal"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from '@/utils/supabase/client'

export function RequestAttendanceDialog() {
    const supabase = createClient();
    const router = useRouter();
    const { toast } = useToast();

    const [name, setName] = React.useState('')
    const [date, setDate] = React.useState<Date>()
    const [time, setTime] = React.useState('08:00')
    const [type, setType] = React.useState('Clock-In')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (date) {
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const { data, error } = await supabase
                .from('attendances_approval')
                .insert([
                    { name: name, date_request: formattedDate, time_request: time, type: type, status: 'Needs Approval' },
                ])
                .select()
            router.push(`/personal/dashboard`);
            window.location.reload();
            toast({
                variant: 'success',
                title: 'Insert Request Success.',
                description: 'Insert operation is successful!'
            });
        } else {
            console.log("Date is null or undefined");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-white'>Request</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Request Attendance</DialogTitle>
                        <DialogDescription>
                            Kindly provide your details in the form below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-6 items-center">
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <Input id="name" value={name} onChange={(event) => setName(event.target.value)} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-6 items-center">
                            <Label htmlFor="date">
                                Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[250px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}

                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-6 items-center">
                            <Label htmlFor="time">
                                Time
                            </Label>
                            <Input id="time" value={time} onChange={(event) => setTime(event.target.value)} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-6 items-center">
                            <Label htmlFor="type">
                                Type
                            </Label>
                            <Input id="type" value={type} onChange={(event) => setType(event.target.value)} className="col-span-4" />
                        </div>
                        <Button type="submit">Save Form</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
