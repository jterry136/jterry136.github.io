import React, { useEffect, useState } from 'react'
import PostList from './components/PostList'
import PostView from './components/PostView'

type PostMeta = {
  path: string
  slug: string
  title: string
  date?: string | null
  tags?: string[]
  excerpt?: string
  content?: string
}

export default function App(): JSX.Element {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [selected, setSelected] = useState<PostMeta | null>(null)

  // Load list of posts from the "posts" directory
  async function loadPosts() {
    const response = await fetch('/posts/post1.md');
    const text = await response.text();
    console.log("Printing something.....")
    console.log(text);
  }

  loadPosts();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="visual-header">
        <div className="site-container">
          <header className="site-header">
            <div>
              <div className="site-title">This Week abcdefg in Cyber</div>
              <div className="muted">An open source aggregation of current cyber events</div>
            </div>
          </header>
        </div>
      </div>
      <div className="site-container py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <aside className="md:col-span-1">
            <div className="card">
              <h2 className="font-semibold mb-3">Posts</h2>
              <PostList posts={posts} onSelect={setSelected} selected={selected} />
            </div>
          </aside>
          <main className="md:col-span-3">
            <div className="card">
              {selected ? <PostView post={selected} /> : <div className="muted">No post selected</div>}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
