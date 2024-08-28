"use client";

import { useRouter } from "next/router";
import { GiClubs } from "react-icons/gi";

const SidebarLogo = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    }

    return (
        <div 
            onClick={handleClick}
            className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 cursor-pointer transition">
            <GiClubs size={28} color="white" />
        </div>
    );
}

export default SidebarLogo;
