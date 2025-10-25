// Function for display only
function stripMd(post: string) {
    if (post.endsWith(".md")) {
        return post.slice(0, -3);
    }
}

type PostCardProps = {
    post: string,
    setFilepath: (arg0: string) => void
}

const PostCard = (props: PostCardProps) => {
    return (
        <div className="p-4 border-t border-blue-700 hover:bg-blue-100 cursor-pointer" onClick={() => props.setFilepath(props.post)}>
            {stripMd(props.post)}
        </div>
    )
}

export default PostCard