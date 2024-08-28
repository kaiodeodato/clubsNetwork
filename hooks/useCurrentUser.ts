import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

interface User {
    id: string;
    name: string;
    username?: string;
    email?: string;
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