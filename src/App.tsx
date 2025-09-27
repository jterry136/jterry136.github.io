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

  useEffect(() => {
    // Vite's import.meta.glob - load raw markdown
    const modules = import.meta.glob('/posts/*.md', { as: 'raw' }) as Record<string, () => Promise<string>>
    Promise.all(
      Object.entries(modules).map(async ([path, loader]) => {
        const raw = await loader()
        // parse frontmatter
        const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/) as RegExpMatchArray | null
        let fm: Record<string, any> | null = null
        let body = raw
        if (fmMatch) {
          const fmText = fmMatch[1]
          body = raw.slice(fmMatch[0].length)
          fm = {}
          for (const line of fmText.split('\n')) {
            const idx = line.indexOf(':')
            if (idx === -1) continue
            const k = line.slice(0, idx).trim()
            let v: any = line.slice(idx + 1).trim()
            if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
            if (k === 'tags') v = (v as string).split(/,\s*/).filter(Boolean)
            fm[k] = v
          }
        }

        const slug = path.split('/').pop()!.replace(/\.md$/, '')
        const title = (fm && fm.title) || (body.match(/^#\s+(.*)/m) || [])[1] || slug
        const excerpt = (fm && fm.excerpt) || (() => {
          const noCode = body.replace(/```[\s\S]*?```/g, '')
          const paras = noCode.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
          let first = ''
          for (const p of paras) {
            if (!/^#{1,6}\s+/.test(p)) { first = p; break }
          }
          if (!first && paras.length) first = paras[0]
          first = first.replace(/\n+/g, ' ').replace(/!\[[^\]]*\]\([^\)]+\)/g, '').replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          return first.slice(0, 240)
        })()

        return { path, slug, title, date: fm?.date ?? null, tags: fm?.tags, excerpt, content: body } as PostMeta
      }),
    ).then(list => {
      list.sort((a, b) => {
        if (a.date && b.date) return new Date(b.date as string).getTime() - new Date(a.date as string).getTime()
        if (a.date) return -1
        if (b.date) return 1
        return b.path.localeCompare(a.path)
      })
      setPosts(list)
      if (list.length) setSelected(list[0])
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="visual-header">
        <div className="site-container">
          <header className="site-header">
            <div>
              <div className="site-title">This Week in Cyber</div>
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
