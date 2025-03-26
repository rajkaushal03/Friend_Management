from flask import Flask, send_from_directory # type: ignore
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore
import os 

app = Flask(__name__)
CORS(app)

# just like how we connect in mongodb using mongoose here how it is connected below 
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

# use to write the sql queries in python
db = SQLAlchemy(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Server static files from the "dist" folder under the "frontend" directory
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)


import routes

# create the database and the table
with app.app_context():
    db.create_all()
    
# this works as the code under it will only execute if and only if this particular file is run for eg := python app.py
if __name__ == "__main__":
    app.run(debug = True)
    
    

# it is a way how to use sql queries directly instead of python 
# from app import app, db
# from sqlalchemy import text
# from flask import jsonify

# @app.route("/api/friends/count", methods=["GET"])
# def get_friend_count():
#     try:
#         # Writing raw SQL query
#         query = text("SELECT name, COUNT(name) AS count FROM friend GROUP BY name;")
#         result = db.session.execute(query)

#         # Convert result to list of dictionaries
#         data = [{"name": row[0], "count": row[1]} for row in result]

#         return jsonify(data), 200

#     except Exception as e:
#         return jsonify({"error": "Could not fetch data"}), 500
