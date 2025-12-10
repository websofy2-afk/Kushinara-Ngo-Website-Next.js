"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Tooltip from '../common/Tooltip';
import { BallTriangle } from 'react-loader-spinner';

const Logout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [tooltip, setTooltip] = useState<{ message: string; type: any } | null>(null);
    const router = useRouter();
    const showTooltip = (
        message: string,
        type: "success" | "error" | "info" = "info"
    ) => {
        setTooltip({ message, type });
        setTimeout(() => setTooltip(null), 3000);
    };

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setTimeout(() => {
                    router.push("/signin");
                }, 1000)
                showTooltip(data.message, "success");
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
         catch (err: any) {
            showTooltip(err, "success");
        }
    };
    useEffect(() => {
        handleLogout()
    }, [])

    return (
        <div className="flex h-screen items-center justify-center">
            {tooltip && <Tooltip message={tooltip.message} type={tooltip.type} />}
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#FF00D4"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Logout