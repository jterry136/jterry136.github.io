import { useState } from 'react'
import './App.css'
import PostView from './Components/PostView'
import PostList from './Components/PostList';


function App() {
  let [filepath, setFilepath] = useState("");

  return (
    <>
      <PostList setFilepath={setFilepath} />
      <PostView filepath={filepath} />
    </>
  )
}

export default App
