import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType
    onClick?: () => void;
    auth?: boolean;
    alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    icon: Icon,
    onClick,
    auth,
    alert
}) => {
    const loginModal = useLoginModal();
    const {data: currentUser, mutate } = useCurrentUser();
    const { mutate: mutateNotifications } = useNotifications();
    const router = useRouter();
    
    const handleClick = useCallback(()=> {
        if(onClick){
            return onClick();
        }
        if(auth && !currentUser){
            loginModal.onOpen();
        }else if(href){
            router.push(href);
            mutate();
            mutateNotifications();
        }

    },[router, onClick, href, currentUser, auth, loginModal, mutate])

    useEffect(() => {
        if (currentUser) {
            mutate();
        }
    }, [alert, mutate]);


    return ( 
        <div onClick={handleClick} className='flex flex-row items-center justify-start'>
            <div className='relative rounded-full h-10 w-10 flex items-center justify-center p-2 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
                <Icon size={20} color='white' />
                {alert ? <BsDot className='text-sky-500 absolute -top-5 -left-1' size={60} /> : null}
            </div>
            <div className='relative hidden lg:flex items-center gap-4 p-2 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer'>
                <Icon size={20} color='white' />
                <p className='hidden lg:block test-white text-sm'>
                    { label }
                </p>
                {alert ? <BsDot className='text-sky-500 absolute -top-5 -left-1' size={60} /> : null}
            </div>

        </div>
    );
}

export default SidebarItem;