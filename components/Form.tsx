import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface FormProps{
    placeholder: string;
    isComment?: boolean;
    postId?: string;
}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser, mutate:mutateUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [ body, setBody ] = useState('');
    const [ isLoading, setisLoading ] = useState(false);

    const onSubmit = useCallback(async () => {
        try{
            setisLoading(true);

            const url = isComment
            ? `/api/comments?postId=${postId}`
            : `/api/posts`; 

            await axios.post( url, { body });
            
            toast.success('Post Created');
            setBody('');
            mutateUser();
            mutatePosts();
            mutatePost();

        } catch(error){
            toast.error('Something wrnt wrong');
        } finally {
            setBody('');
            setisLoading(false);
        }
    },[ body, mutatePosts, mutatePost, isComment, postId ])

    console.log(body.length)

    return ( 
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        {currentUser ? 
        (
            <div className="flex flex-row gap-4">
                <div>
                    <Avatar userId={currentUser?.id} />
                </div>
                <div className="w-full">
                    <textarea
                        disabled={isLoading}
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        maxLength={144} 
                        rows={3}
                        className="
                        disabled:opacity-80
                        peer
                        resize-none
                        mt-3
                        w-full
                        bg-black
                        ring-0
                        outline-none
                        text-[15px]
                        placeholder-neutral-500
                        text-white
                        "
                        placeholder={placeholder}
                    >
                        
                    </textarea>
                    <hr className="
                        opacity-0
                        peer-focus:opacity-100
                        h-[1px]
                        w-full
                        border-neutral-800
                        transition
                    " />
                    <div className="mt-4 flex flex-row justify-between">
                        <div className={`text-sm text-neutral-500 ${body.length >= 144 ? 'text-red-400' : ''}`}>
                            <span>
                                144/{body.length}
                            </span>
                        </div>
                        <Button 
                            disabled={isLoading || !body}
                            onClick={onSubmit}
                            label="Post" />
                    </div>
                </div>
            </div>
        ) :
        (
            <div className="py-8">
                <h1 className="text-white text-sm text-center mb-4 font-bold">
                    Welcome to Clubs
                </h1>
                <div className="flex flex-row items-center justify-center gap-4">
                    <Button label="Login" onClick={loginModal.onOpen} />
                    <Button label="Register" onClick={registerModal.onOpen} secondary />
                </div>
            </div>
        )

        }
    </div> 
    );
}

export default Form;