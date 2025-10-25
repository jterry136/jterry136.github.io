import { useState } from 'react'
import PostView from './Components/PostView'
import PostList from './Components/PostList';


function App() {
  let [filepath, setFilepath] = useState("");

  return (
    <>
      <div className="bg-blue-700 text-white p-6 shadow-lg">
        <div className="text-xl">CyberNews</div>
        <div className="text-lg">Open Source Aggregation of cybersecurity events</div>
      </div>
      
      <div className="flex flex-row">
        <PostList setFilepath={setFilepath} />
        <PostView filepath={filepath} />
      </div>
    </>
  )
}

export default App
