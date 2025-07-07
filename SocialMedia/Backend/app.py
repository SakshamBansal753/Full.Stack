from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import smtplib
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, String, Float
DATA_FILE="Users.json"
def load_user():
    with open(DATA_FILE,'r') as f:
        return json.load(f)
app = Flask(__name__)
new_user={}
@app.route("/api/create",methods=["GET","POST"])
def create_user():
    data = request.get_json()
    users = load_user()

    username = data["username"]
    if username in users:
        return jsonify({"error": "Username already exists"}), 400

    users[username] = {
        "Password": data["password"],
        "email": data["email"],
        "Follower": 0,
        "Following": 0,
        "Profile": "https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg",
        "Bio": "Developer",
        "Posts": [],
        "UserName": username
    }


    with open(DATA_FILE,"w") as file:
        json.dump(users,file)
    return jsonify({"message": "User created successfully"}), 201

CORS(app)  # Optional: enables CORS if needed
@app.route("/api/<username>/add",methods=["GET","POST"])
def add_post(username):
    data=request.get_json()
    users=load_user()
    newdata={
        "image":data["posturl"],
        "content":data["postdata"],
    }
    users[username]["Posts"].append(newdata)
    with open(DATA_FILE,"w") as file:
        json.dump(users,file)


    return "Post"
@app.route("/api/signin", methods=["POST"])
def get_user():
    data = request.get_json()
    users = load_user()

    username = data.get("username")
    password = data.get("password")

    if username not in users:
        return jsonify({"Message": "Wrong"}), 401

    if users[username]["Password"] != password:
        return jsonify({"Message": "Wrong"}), 401

    return jsonify({"Message": "Valid user"}), 200
@app.route('/api/<username>')
def home(username):
    users=load_user()
    user=users[username]
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)
