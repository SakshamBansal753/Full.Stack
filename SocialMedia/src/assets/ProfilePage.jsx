import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const ProfilePage = () => {
  const [formdata, setformdata] = useState({
    postdata: "",
    posturl: ""
  });

  const location = useLocation();
  const data = location.state;

  const add_post = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${data.UserName}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      });

      if (!response.ok) {
        throw new Error("Failed to add post");
      }

      const result = await response.json();
      console.log("Post added:", result);

      // Optional: Reset form
      setformdata({ postdata: "", posturl: "" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='bg-black text-white min-h-screen p-10'>
      <section className='flex gap-20'>
        {/* Profile Image */}
        <div>
          <img src={data.Profile} alt="Profile" className='w-[220px] rounded-lg' />
        </div>

        {/* User Info + Post Input */}
        <div className='text-2xl space-y-6'>
          <div className='flex items-center gap-8'>
            <p className='text-3xl font-semibold'>@{data.UserName}</p>
          </div>

          <div className='flex gap-4'>
            <input
              type='text'
              value={formdata.posturl}
              onChange={(e) => setformdata({ ...formdata, posturl: e.target.value })}
              placeholder='Post Image URL'
              className='text-white p-2 rounded'
            />
            <input
              type='text'
              value={formdata.postdata}
              onChange={(e) => setformdata({ ...formdata, postdata: e.target.value })}
              placeholder='Post Content'
              className='text-white p-2 rounded'
            />
            <button className='bg-gray-900 px-4 py-2 rounded' onClick={add_post}>
              Add Post
            </button>
          </div>

          <div className='flex gap-8'>
            <p>Followers: {data.Follower}</p>
            <p>Following: {data.Following}</p>
          </div>

          <div>
            <strong>Bio:</strong> {data.Bio}
          </div>
         <div>
  <strong>Posts:</strong>
  <ul className="mt-4 space-y-4">
    {data.Posts.length>0? data.Posts.map((post, index) => (
      <li key={index} className="border p-4 rounded-lg bg-gray-800">
        <img src={post.image} alt="Post" className="w-64 h-64 object-cover rounded" />
        <p className="mt-2">{post.content}</p>
      </li>
    )):(<p>Loading</p>)}
  </ul>
</div>


          
        </div>
      </section>
    </div>
  )
}

export default ProfilePage
