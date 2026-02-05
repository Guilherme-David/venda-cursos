# app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from routes import register_routes
import os

def create_app():
    app = Flask(__name__)
    CORS(app)

    register_routes(app)
    return app

app = create_app()

UPLOAD_FOLDER = "uploads/cursos"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/uploads/cursos/<filename>")
def get_course_image(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

if __name__ == "__main__":
    app.run(debug=True)