"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const onClick = useCallback(()=> {
        loginModal.onOpen();
    }, [loginModal])

    return ( 
        <div onClick={onClick}>
            <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-purple-900 hover:bg-opacity-80 transition cursor-pointer">
                <FaFeather size={20} color="white" />
            </div>
            <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-purple-900 hover:bg-opacity-80 cursor-pointer transition">
                <p className="hidden lg:block text-center font-semibold text-white text-[15px]">
                    Post
                </p>
            </div>
        </div>
    );
}

export default SidebarTweetButton;