import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";

import Avatar from "../Avatar";

interface PostItemProps {
    userId?: string;
    data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

    const goToUser = useCallback(( event: any ) => {
        event.stopPropagation();

        router.push(`/users/${data.user.id}`);
    },[router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    },[router, data.id]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation();

        if(!currentUser){
            loginModal.onOpen();
        }
        toggleLike();

    },[loginModal, currentUser, toggleLike])

    const createdAt = useMemo(()=> {
        if(!data?.createdAt){
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);

    return ( 
    <div
    onClick={goToPost}
    className="
        border-b-[ipx]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
    "
    >
        <div className="flex flex-row items-start gap-3" >
            <div>
                <Avatar userId={data.user.id} />
            </div>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <p onClick={goToUser} className="text-white text-sm font-semibold cursor-pointer hover:underline">
                        {data.user.name}
                    </p>
                    <span onClick={goToUser} className="text-neutral-500 text-xs cursor-pointer hover:underline hidden md:block">
                        @{data.user.username}
                    </span>
                    <span className="text-neutral-600 text-xs">
                        {createdAt}
                    </span>
                </div>
                <div className="text-white mt-1 text-sm">
                    {data.body}
                </div>
                <div className="flex flex-row items-center gap-10">
                    <div className="flex flex-row items-center  text-neutral-500 gap-2 mt-2 cursor-pointer transition hover:text-sky-500">
                        <AiOutlineMessage size={18} />
                        <p className="text-sm ">
                            {data.comments?.length || 0}
                        </p>
                    </div>

                    <div onClick={onLike} className="flex flex-row items-center  text-neutral-500 gap-2 mt-2 cursor-pointer transition hover:text-red-500">
                    { 
                        hasLiked ? <AiFillHeart size={18} color='red'/> : <AiOutlineHeart size={18}/>
                    }

                        <p className="text-sm ">
                            {data.likedIds?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div> );
}

export default PostItem;