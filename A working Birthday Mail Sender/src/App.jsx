import React, { useEffect, useState } from 'react';

const App = () => {
  const [message, setmessage] = useState('');
  const [Recievedmsg, setRecievedmsg] = useState('')
  const [formdata, setformdata] = useState({
    name: '',
    email: '',
    msg: ''
  });
  const [Loading ,setLoading]=useState(false)

  const recieve = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/message");
      const data = await response.json();
      setmessage(data.me);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const send_msg = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formdata)
      });
      if(!response.ok){
        throw new Error("Failed to Load")
      }
      const result = await response.json();
      setRecievedmsg(result.Recieved);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <form onSubmit={send_msg} className="bg-gray-900 text-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-400">Birthday Mail</h2>

        <p className="text-center text-green-300">{message}</p>

        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formdata.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formdata.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Birthday Message</label>
          <textarea
            name="msg"
            placeholder="Your Message"
            value={formdata.msg}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 rounded-lg font-semibold"
        >
          Send Message
        </button>

        <button
          type="button"
          onClick={recieve}
          className="w-full mt-2 bg-green-600 hover:bg-green-700 transition-colors text-white py-2 rounded-lg font-semibold"
        >
          Load Greeting
        </button>
         {Loading?(<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>):(<p>{Recievedmsg}</p>)}

      </form>
     
    </div>
  );
};

export default App;
