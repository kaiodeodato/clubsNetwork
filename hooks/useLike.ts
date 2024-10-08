import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId } : { postId: string, userId?: string }) => {
    const { data: currentUser, mutate: mutateFetchedUser  } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId); 
    const { mutate: mutateFetchedPosts } = usePosts(userId);


    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    },[currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async () => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        try{
            let request;

            if(hasLiked){
                request = () => axios.delete('/api/like', { data: { postId }});
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();
            mutateFetchedUser();
            mutateFetchedPost();
            mutateFetchedPosts();


            toast.success('Success');

        }catch(error) {
            toast.error('Something went wrong')
        }

    },[ currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts,loginModal]);

    return {
        hasLiked,
        toggleLike
    }
};

export default useLike;