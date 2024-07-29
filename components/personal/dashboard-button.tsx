'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'

interface ButtonProps {
    initialData: any | null;
}

export const DashboardClockInButton: React.FC<ButtonProps> = ({initialData}) => {
    const supabase = createClient();
    const [backgroundColor, setBackgroundColor] = useState('bg-lime-400');
    const [buttonText, setButtonText] = useState('Clock-In');
    console.log("initial data", initialData)

    const handleClick = () => {
        setBackgroundColor('');
        setButtonText('-');
    };

    const fetchDataAttendances = async () => {
        const currentDate = new Date();
        const startOfDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
        const timestampz = startOfDay.toISOString() + '+00';
        let { data: attendances, error } = await supabase
            .from('attendances')
            .select()
            .eq('name', initialData[0]?.name)
            .gte('created_at', timestampz)

    }

    useEffect(() => {
        fetchDataAttendances()
    }, []);

    return (
        <Button
            className={backgroundColor}
            onClick={handleClick}
        >
            {buttonText}
        </Button>
    );
};