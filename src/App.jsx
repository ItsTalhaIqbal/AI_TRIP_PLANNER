import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-[1300px] mx-auto ">
     <Hero/>
     </div>
  )
}

export default App