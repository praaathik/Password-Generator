import { useState,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length,setLength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
 
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState('')

  const passwordRef=useRef(null)

  const generatePassword= useCallback(()=>{
    let pass=""
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "1234567890"
    if(charAllowed) str+="!@#$%^&*()<>?"

    for (let i =1; i< length; i++){
      const char=Math.floor(Math.random()*str.length + 1);
      pass+=str.charAt(char)

    }
   setPassword(pass)
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword()
  },[length, numberAllowed, charAllowed])
  
  const copyPasswordToClipboard=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

   

  return (
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 my-8 bg-gray-500 text-black-600'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password} 
        className='outline-none w-full py-1 px-3'
        placeholder='Password' 
        readOnly
        ref={passwordRef}
        />
        <button className='outline-none bg-fuchsia-800 text-white 
        px-3 py-0.5 shrink-0' onClick={()=>copyPasswordToClipboard()} >copy</button>
      </div>
      <div className='flex text-sm gap-x-1'>
        <input 
        type="range" 
        min={8}
        max={26}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>setLength(e.target.value)}
        
         />
         <label htmlFor="length">Length :{length}</label>
      <div className='flex text-sm gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={numberAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }}
        name=""
        id=""
         />
         <label htmlFor="number">Numbers</label>
      </div>
      <div className='flex text-sm gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
        name=""
        id=""
         />
         <label htmlFor="characters">Characters</label>
      </div>
      </div>

    </div>
  )
}

export default App
