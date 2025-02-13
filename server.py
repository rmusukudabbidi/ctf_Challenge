from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)  # Enable CORS for frontend requests

FLAG = "CTF{input_length_is_74}"

@app.route('/')
def home():
    return render_template("Hyper.html")  # Load from the templates folder

@app.route('/check', methods=['POST'])
def check_input():
    try:
        data = request.get_json()
        if not data or "input" not in data:
            return jsonify({"message": "Invalid request!"}), 400

        user_input = data["input"]

        if len(user_input) == 74:
            return jsonify({"message": FLAG})
        else:
            return jsonify({"message": "Try again!"})
    except Exception as e:
        return jsonify({"message": "Server error!"}), 500

if __name__ == '__main__':
    app.run(debug=True)
