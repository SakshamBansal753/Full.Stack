import React, { useState } from 'react'
import Sidebar from './assets/Sidebar.jsx'
import Home from './assets/Home.jsx'
import { useNavigate } from 'react-router-dom'

const Browser = () => {
    const navigate=useNavigate()
    const [Name, setName] = useState('')
  const [Profile, setProfile] = useState(null)
const [Loading, setLoading] = useState(true)
const get_profile=async()=>{
  setLoading(true)
  try{
  const response=await fetch(`http://127.0.0.1:5000/api/${Name}`)
  const data=await response.json()
  console.log(data)
  if(!response.ok){
    throw new Error("Error")
  }
  setProfile(data)
navigate("/profile",{state:data})}
  catch(e){
    console.log(e)
  }finally{
    setLoading(false)
  }
}
  return (
    <main >
      <div className='flex h-full w-screen overflow-x-hidden'>
       <div className=' w-[300px] border-r'>
        <Sidebar/>
       </div>
       <div className='h-screen w-screen ml-12 '>
        <Home/>
       </div>
        <div className='mr-[250px] mt-[220px]  text-4xl'>
           <input
  type="text"
  placeholder="Name"
  value={Name}
  onChange={(e) => setName(e.target.value)}
  className="text-white p-2 rounded border mb-5"
/>
        <button onClick={get_profile} className='bg-gray-900 p-8'>Profile</button>
         
        </div>
       
      </div>
    </main>
  )
}

export default Browser