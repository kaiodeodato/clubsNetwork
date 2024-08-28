import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const Postviwe = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);

    if(isLoading || !fetchedPost) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader />
            </div>
        )
    }

    return ( 
    <>
        <Header label="Post" showBackArrow />
        <PostItem data={fetchedPost} />
        <Form 
            postId={postId as string}
            isComment
            placeholder="Post your reply"
        />
        <CommentFeed comments={fetchedPost?.comments} />
    </> 
    );
}

export default Postviwe;