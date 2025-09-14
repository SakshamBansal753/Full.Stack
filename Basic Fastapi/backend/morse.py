from fastapi import FastAPI,Request
import uvicorn

from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["*"],   # Allow all origins (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)




@app.post("/form")

async def submit(request:Request):
    data=await request.json()
    print(data)
    return {"status":data}

if __name__ == "__main__":

    uvicorn.run("morse:app", host="127.0.0.1", port=8000, reload=True)
