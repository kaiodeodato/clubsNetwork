import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

interface User {
    id: string;
    name: string;
    username?: string;
    email?: string;
    bio?: string;
    profileImage?: string;
    coverImage?: string;
    emailVerified?: string;
    image?: string;
    hashedPassword: string;
    createdAt: string;
    updatedAt: string;
    followingIds: string[];
    hasNotifications?: boolean;
}

const useCurrentUser = () => {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';

    const { data, error, isLoading, mutate } = useSWR<User>(
        isAuthenticated ? '/api/current' : null,
        fetcher
    );

    return {
        data,
        error,
        isLoading,
        mutate
    };
};

export default useCurrentUser;