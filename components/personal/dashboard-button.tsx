'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client'

export const DashboardClockInButton: React.FC = () => {
    const supabase = createClient();
    const [backgroundColor, setBackgroundColor] = useState('bg-lime-400');
    const [buttonText, setButtonText] = useState('Clock-In');

    const handleClick = () => {
        setBackgroundColor('');
        setButtonText('-');
    };

    const fetchDataAttendances = async () => {
        const currentDate = new Date();
        const startOfDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
        const timestampz = startOfDay.toISOString() + '+00';
        console.log("data attendances", timestampz)
        let { data: attendances, error } = await supabase
            .from('attendances')
            .select()
            .gte('created_at', timestampz)
        console.log("data attendances", attendances)
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