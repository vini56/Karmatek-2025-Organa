"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setTheme } = useTheme();
    useEffect(() => {
        setTheme("light");
    }, []);
    return <main className="">{children}</main>;
}
