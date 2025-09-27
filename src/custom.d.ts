declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

interface ImportMeta {
  glob: any
}

declare module '*.md' {
  const src: string
  export default src
}

declare module '*.css'
