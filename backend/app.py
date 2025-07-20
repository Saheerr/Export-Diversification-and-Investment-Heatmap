# backend/app.py
import os
from flask import Flask
from flask_cors import CORS
from db import db
from routes.exports import exports_bp
from dotenv import load_dotenv

def create_app():
    load_dotenv()  # loads DB_URL from .env
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app)

    app.register_blueprint(exports_bp)

    with app.app_context():
        db.create_all()  # create tables if not exist

    return app

if __name__ == '__main__':
    create_app().run(debug=True, port=5000)
