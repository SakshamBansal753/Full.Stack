import React from 'react'

const Home = () => {
  return (
    <div>
        <div className='flex flex-col p-20 gap-7'>
            <div className='flex'>
            <div >
                <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" width={100} className='profileimg'/>
            </div>
            <div className='mt-7 ml-7 '>
                Profile Name
            </div>
            </div>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg" alt="nature" width={1000} />
            </div>
        </div>
    </div>
  )
}

export default Home