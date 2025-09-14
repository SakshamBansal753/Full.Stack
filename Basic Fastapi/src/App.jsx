import React, { useState } from 'react'

const App = () => {
  const [Formdata, setFormdata] = useState({
    name:"",
    Class:"",
    Age:"",
  })
  const [Message, setMessage] = useState('')
  const serve=async(e)=>{
    e.preventDefault();
    try{
    const response=await fetch("http://127.0.0.1:8000/form",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(Formdata)
      }
    )
    const data=await response.json();
    setMessage(data)
    console.log(data)

  }catch(error){
    console.error("Error")
  }

  }
  return (
    <div>
      <input type='text'
      name='name'
      placeholder='name'
      value={Formdata.name}
      onChange={(e)=>{
        setFormdata({...Formdata,[e.target.name]:e.target.value})

      }}></input>
      <input type='text'
      name="Class"
      placeholder='class'
      value={Formdata.class}
      onChange={(e)=>{
        setFormdata({...Formdata,[e.target.name]:e.target.value})

      }}></input>
       <input type='text'
       name='Age'
      placeholder='Age'
      value={Formdata.Age}
      onChange={(e)=>{
        setFormdata({...Formdata,[e.target.name]:e.target.value})

      }}></input>
      <button onClick={
        serve
      }>Click me</button>
    </div>
  )
}

export default App