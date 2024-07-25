'use client'

import React, { useState, useEffect } from 'react';

export const DigitalClock: React.FC = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {
        hour12: false, // Use 24-hour format
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', {
                hour12: false, // Use 24-hour format
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-2xl font-bold">
            <h1>{time}</h1>
        </div>
    );
}