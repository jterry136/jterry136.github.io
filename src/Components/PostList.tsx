import { useState } from 'react'

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
    return <div key={index} onClick={() => setFilepath(post)}>{post}</div>
  });

  return (
    <div>
      {postElementList}
    </div>
  )
}

export default PostList