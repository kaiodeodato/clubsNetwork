import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";

import Avatar from "../Avatar";

interface CommentItemProps {
    data: Record<string, any>
};

const CommentItem: React.FC<CommentItemProps> = ({data}) => {
    const router = useRouter();

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();

        router.push(`/users/${data.user.id}`);
    },[router, data.user.id]);

    const createdAt = useMemo(() => {
        if(!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt])


    return ( 
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.user.id}/>
            <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                    <p onClick={goToUser} className="text-write text-sm font-semibold cursor-pointer hover:underline">
                        {data.user.name}
                    </p>
                    <span onClick={goToUser} className="text-sm text-neutral-500 cursor-pointer hover:underline hidden md:block">
                        @{data.user.username}
                    </span>
                    <span className="text-sm text-neutral-500">
                        {createdAt}
                    </span>
                </div>
                <div className="text-sm text-neutral-300 mt-1">
                    {data.body}
                </div>
            </div>
        </div>
    </div> 
    );
}

export default CommentItem;