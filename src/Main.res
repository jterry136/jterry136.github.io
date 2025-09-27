%%raw("import './index.css'")

switch ReactDOM.querySelector("#root") {
| Some(domElement) =>
  ReactDOM.Client.createRoot(domElement)->ReactDOM.Client.Root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
| None => ()
}
/* Deprecated ReScript bootstrap. App now boots from TypeScript: src/main.tsx */

%%raw("/* deprecated: Main.res - see src/main.tsx */")
