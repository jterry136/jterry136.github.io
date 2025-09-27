import React from 'react'

type PostMeta = {
  path: string
  slug: string
  title: string
  date?: string | null
  excerpt?: string
}

export default function PostList({ posts, onSelect, selected }: { posts: PostMeta[]; onSelect: (p: PostMeta) => void; selected: PostMeta | null }) {
  return (
    <div>
      {posts.map(p => (
        <div key={p.path} className="py-3 border-b last:border-b-0 post-card">
          <a
            href={`#${p.slug}`}
            onClick={(e) => { e.preventDefault(); onSelect(p) }}
            className={`post-link block font-semibold ${selected?.path === p.path ? 'active' : ''}`}
          >
            {p.title}
          </a>
          <div className="text-sm text-muted mt-1">{p.date ? new Date(p.date).toLocaleDateString() : ''}</div>
          <p className="text-sm muted mt-2">{(p.excerpt || '').slice(0, 160)}{(p.excerpt && p.excerpt.length > 160) ? '…' : ''}</p>
        </div>
      ))}
    </div>
  )
}
