import Notify from "@/components/notify";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen gap-4">
            <Sidebar></Sidebar>
            <div className="bg-background flex-grow px-4 pb-12 pt-4">
                {children}
            </div>
            {/* <Notify /> */}
        </div>
    );
}
