from flask import Flask, request, jsonify
from flask_cors import CORS
import util
import os

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    return jsonify({
        'locations': util.get_location_name()
    })

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    total_sqft = float(data['sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

    return jsonify({
        'estimated_price': estimated_price
    })

if __name__ == '__main__':
    print("Flask server starting for home price prediction...")
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
