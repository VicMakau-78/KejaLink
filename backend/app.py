from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

import os
from dotenv import load_dotenv

# MySQL Database Connection Configuration
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

def get_db_connection():
    host = os.getenv('DB_HOST', 'localhost')
    user = os.getenv('DB_USER', 'root')
    password = os.getenv('DB_PASSWORD', '')
    database = os.getenv('DB_NAME', 'kejalink')
    port = int(os.getenv('DB_PORT', 3306))

    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=port,
        )
        return connection
    except Error as err:
        print(f"MySQL connection error: {err}")
        return None

# Add Rating Endpoint
@app.route('/api/add_rating', methods=['POST'])
def add_rating():
    try:
        data = request.json
        product_id = data.get("product_id")
        rating = data.get("rating")

        if not product_id or not rating:
            return jsonify({"error": "Missing product_id or rating"}), 400

        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO ratings (product_id, rating) VALUES (%s, %s)",
            (product_id, rating)
        )
        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Rating added successfully"}), 201

    except Error as err:
        return jsonify({"error": str(err)}), 500

# Get Ratings for a Product
@app.route('/api/get_ratings/<int:product_id>', methods=['GET'])
def get_ratings(product_id):
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM ratings WHERE product_id = %s",
            (product_id,)
        )
        ratings = cursor.fetchall()
        cursor.close()
        connection.close()

        return jsonify(ratings), 200

    except Error as err:
        return jsonify({"error": str(err)}), 500

# Health Check
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "Backend is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
