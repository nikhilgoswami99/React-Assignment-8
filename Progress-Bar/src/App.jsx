import { useEffect, useState } from 'react'
import './App.css'

function App() {
  let [width, setWidth] = useState(0);
  let [text, setText] = useState("Loading...");

  useEffect(() => {
    const intervalID = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          setText("Complete!");
          clearInterval(intervalID);
          return prevWidth; 
        }
        return prevWidth + 1; 
      });
    }, 100); 

  }, []); 

  return (
    <>
    <h1 style={{color: "red"}}>Progress Bar</h1>
     <div className='container'>
      <p>{width}%</p>
      <div style={{width: `${width}%`}} className='progress-bar'>
      </div>
     </div>
     <h1>{text}</h1>
    </>
  )
}

export default App
