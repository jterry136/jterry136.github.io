import { useState } from 'react'
import PostCard from './PostCard'

function PostList({setFilepath}: {setFilepath: (arg0: string) => void}) {
  let [posts, setPosts] = useState<string[]>([]);

  if (posts.length == 0) {
    fetch("filelist.txt")
      .then(response => response.text())
      .then(text => {
        setPosts(text.split("\n"));
      });
  }

  let postElementList = posts.map((post, index) => {
    return <PostCard key={index} post={post} setFilepath={setFilepath} />
  });

  return (
    <div className="w-1/4 m-4 border border-blue-700 rounded shadow-lg">
      <div className="px-4 py-2">Article Summaries</div>
      <div className="px-4 py-2">Summaries of current events in the cyber security landscape</div>
      {postElementList}
    </div>
  )
}

export default PostList