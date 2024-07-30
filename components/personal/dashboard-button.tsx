'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'

interface ButtonProps {
    initialData: any | null;
}

export const DashboardClockInButton: React.FC<ButtonProps> = ({ initialData }) => {
    const supabase = createClient();
    const router = useRouter();
    const [backgroundColor, setBackgroundColor] = useState('bg-lime-400');
    const [buttonText, setButtonText] = useState('Clock-In');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const startOfDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
    const timestampz = startOfDay.toISOString() + '+00';
    console.log("initial data", initialData)

    const handleClick = async () => {
        
        if (buttonText === 'Clock-In') {
            const { data, error } = await supabase
                .from('attendances')
                .insert([
                    { name: initialData[0]?.name, division: initialData[0]?.division, role: initialData[0]?.job, status: 'Berhasil', check_in: `${hour}:${minute}`, check_out: '' },
                ])
                .select()
            router.push(`/personal/dashboard`);
            window.location.reload();


        } else {
            const { data, error } = await supabase
                .from('attendances')
                .update({ check_out: `${hour}:${minute}` })
                .eq('name', initialData[0]?.name)
                .gte('created_at', timestampz)
            router.push(`/personal/dashboard`);
            window.location.reload();
        }
    };

    const fetchDataAttendances = async () => {
        let { data: attendances, error } = await supabase
            .from('attendances')
            .select()
            .eq('name', initialData[0]?.name)
            .gte('created_at', timestampz)
        if (!!attendances?.length) {
            setButtonText('Clock Out');
            setBackgroundColor('bg-red-400');
            setStartTime(attendances[0].check_in)
            setEndTime(attendances[0].check_out)
        }
        console.log("attendances exist?", attendances)

    }

    useEffect(() => {
        fetchDataAttendances()
    }, []);

    return (
        <><div className="text-xl font-bold flex place-content-center">{startTime} - {endTime}</div><Button
            className={backgroundColor}
            onClick={handleClick}
        >
            {buttonText}
        </Button></>
    );
};