import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const location = useLocation();
  const userData = location.state;

  const [formdata, setformdata] = useState({
    postdata: '',
    posturl: ''
  });

  const [user, setUser] = useState(userData || {});
  const [posts, setPosts] = useState(userData?.Posts || []);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/${userData.UserName}`);
      const data = await res.json();
      setUser(data);
      setPosts(data.Posts);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const add_post = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${user.UserName}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      });

      if (!response.ok) throw new Error('Failed to add post');

      // Update posts locally without refetching
      setPosts([...posts, formdata]);

      setformdata({ postdata: '', posturl: '' });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <section className="flex flex-col lg:flex-row gap-12">
        {/* Profile Image */}
        <div>
          <img
            src={user.Profile}
            alt="Profile"
            className="w-[220px] h-[220px] object-cover rounded-xl border-4 border-gray-700"
          />
        </div>

        {/* User Info + Post Input */}
        <div className="text-2xl space-y-6 w-full">
          <div className="flex items-center gap-6">
            <p className="text-3xl font-bold">@{user.UserName}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={formdata.posturl}
              onChange={(e) => setformdata({ ...formdata, posturl: e.target.value })}
              placeholder="Post Image URL"
              className="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              value={formdata.postdata}
              onChange={(e) => setformdata({ ...formdata, postdata: e.target.value })}
              placeholder="Post Content"
              className="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded w-full"
            />
            <button
              onClick={add_post}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
            >
              Add Post
            </button>
          </div>

          <div className="flex gap-8 text-lg text-gray-300">
            <p>Followers: {user.Follower}</p>
            <p>Following: {user.Following}</p>
          </div>

          <div>
            <strong>Bio:</strong> <span className="text-gray-300">{user.Bio}</span>
          </div>

          {/* Posts */}
          <div>
            <strong className="text-xl">Posts:</strong>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <li key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-60 object-cover rounded-lg mb-2"
                    />
                    <p className="text-gray-300">{post.content}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No posts yet.</p>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
