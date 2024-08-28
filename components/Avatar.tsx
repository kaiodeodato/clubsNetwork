'use client';

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
    userId: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder
}) => {
    const router = useRouter();
    const { data: fetchedUser} = useUser(userId);

    const onClick = useCallback((event:any) => {
        event?.stopPropagation();

        const url = `/users/${userId}`

        router.push(url)
    },[router, userId]) 

    return ( 
        <div className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'w-24 h-24' : 'w-8 h-8'}
        rounded-full
        hover:scale-105
        transition
        cursor-pointer
        relative
        `}>
            <Image 
            fill 
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover', borderRadius: '100%' }}
            alt="Avatar"
            onClick={onClick}
            src={fetchedUser?.profileImage || '/images/placeholder.jpg'}
            />
        </div>
    );
}

export default Avatar
;