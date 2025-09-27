import React from 'react'

type PostMeta = {
  path: string
  slug: string
  title: string
  date?: string | null
  excerpt?: string
  content?: string
}

function parseMarkdown(md?: string) {
  if (!md) return ''
  // keep source intact; removing header is handled by caller when appropriate
  let text = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  text = text.replace(/```([\s\S]*?)```/g, (_, code) => `<pre class="code-block"><code>${code}</code></pre>`)
  text = text.replace(/^#\s+(.*)$/m, '<h1 class="post-h1">$1</h1>')
  text = text.replace(/^##\s+(.*)$/m, '<h2 class="post-h2">$1</h2>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="link-primary" href="$2">$1</a>')
  const parts = text.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
  return parts.map(p => (p.startsWith('<h') || p.startsWith('<pre')) ? p : `<p class="post-paragraph">${p}</p>`).join('\n')
}

export default function PostView({ post }: { post: PostMeta }) {
  // Remove a leading markdown H1 only if it exactly matches the post title to avoid duplicates
  let content = post.content || ''
  const m = content.match(/^\s*#\s+([^\r\n]+)/)
  if (m && m[1].trim() === post.title.trim()) {
    content = content.replace(/^\s*#\s+[^\r\n]+\r?\n/, '')
  }

  return (
    <article className="prose max-w-none">
      <h1 className="post-h1">{post.title}</h1>
      <div className="text-muted mb-4">{post.date ? new Date(post.date).toLocaleDateString() : ''}</div>
      <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
    </article>
  )
}
