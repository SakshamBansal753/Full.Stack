from flask import Flask, jsonify, request
from flask_cors import CORS
import smtplib
app = Flask(__name__)
CORS(app)

EMAIL="YOUR EMAIL"
PASSWORD="YOUR APP PASSWORD"
@app.route('/api/message', methods=["GET"])
def get_msg():
    return jsonify({"me": "Hello Hi How are you"})


@app.route('/api/send', methods=["POST", "GET"])
def send_data():
    data = request.get_json()
    print(data)
    with smtplib.SMTP("smtp.gmail.com", 587) as connection:
        connection.starttls()
        connection.login(EMAIL,PASSWORD)
        connection.sendmail(from_addr=EMAIL,to_addrs=data["email"],msg=f"Subject:Hello\n\n\n body:{data["msg"]}")

    return jsonify({"Recieved": f"Yes The Email is Sent to {data['email']}"})


if __name__ == "__main__":
    app.run(debug=True)
