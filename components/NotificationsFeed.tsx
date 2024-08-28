import { useEffect } from "react";
import { GiClubs } from "react-icons/gi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

const NotificationsFeed = () => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

    useEffect(()=> {
        mutateCurrentUser();
    },[mutateCurrentUser]);

    
    return ( 
    <div>
        {
            fetchedNotifications.length == 0 ?
            (
                <div className="text-neutral-600 text-center p-6 text-sm">
                    No notifications
                </div>
            )
            :
            (
                <div className="flex flex-col">
                {fetchedNotifications.map((notification: Record<string, any>) => (
                    <div key={notification.id} className="flex flex-row items-center p-3 gap-4 border-b-[1px] border-neutral-800">
                        <GiClubs color="white" size={32} />
                        <p className="text-white text-sm">
                            {notification.body}
                        </p>
                    </div>
                ))}
                </div>
            )
        }

    </div> 
    );
}

export default NotificationsFeed;