import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

type Post = string

function PostView({filepath}: {filepath: string}) {
  let [post, setPost] = useState<Post>();

  useEffect(() => {
    if (filepath.length != 0) {
      fetch("/posts/" + filepath)
        .then(response => response.text())
        .then(text => {
          console.log(text);
          setPost(text);
        });
    } else {
      setPost("Click a post from the list to view it.");
    }
  })

  return (
    <div className="w-3/4 p-4 m-4 rounded shadow-lg">
      <h2>Preview</h2>
      <div className="preview">
        <ReactMarkdown>{post}</ReactMarkdown>
      </div>
    </div>
  );
}

export default PostView