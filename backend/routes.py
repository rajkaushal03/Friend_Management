from app import app,db

from flask import request, jsonify  # type: ignore
from models import Friend 


# this is a route for the home page
@app.route("/",methods=["GET"])
def home():    
    return "hello world"


# Get all the Friends
@app.route("/api/friends",methods=["GET"])
# route handler function
def get_friends():
    # give us all the data store in friend database
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    # response data 
    return jsonify(result), 200

# create a friend
@app.route("/api/friends",methods=["POST"])
def create_friend():
    try:
        data = request.json
        
        # to check if something is missing or Validation
        required_fields = ["name","role","description","gender"]
        for fields in required_fields:
            if fields not in data:
                return jsonify({"error":f'missing fields:{fields}'}), 400
        
        # Update the data
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        
        # fetch avatar image based on gender
        if gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        elif gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        else:
            img_url = None
        
        new_friend = Friend(name=name,role = role, description = description, gender = gender, img_url = img_url)
        
        db.session.add(new_friend)
        db.session.commit()
        
        return jsonify({"msg":"Friend Created ","data":data }), 201
    
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": " error occur"}), 500
    
    
# delete a friend

@app.route("/api/friends/<int:id>",methods=["DELETE"])

def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "friend not found"}), 404
        
        db.session.delete(friend)
        db.session.commit()
        
        return jsonify({"msg":"Friend deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "couldn't delete the data"}), 500
    
    
# UPDATE FRIENDS
# WE USE METHODS PATCH BECAUSE PATCH ONLY UPDATE REQUIRE AND SPECIFIC FIELDS OF DATA WHEREAS PUT ENTIRELY CHANGE THE DATA
@app.route("/api/friends/<int:id>",methods=["PATCH"])

def update_friend(id):
    try:
        # first find out which data need to be change with the help of id
        friend = Friend.query.get(id)
        # check if friend is available of not 
        if friend is None:
            return jsonify({"error":"friend not found"}),  404
        
        # now get the data from the user that need to change 
        data = request.json 
        
        # now change friend data fields to data fields sends by user below is how its done if only role has to change then others will remain same as only role get changes 
        # as i am using friends.name, friends.role,friends.description which means if data dont have these fields it should have its previous value means dont change
        friend.name = data.get("name",friend.name)
        friend.role = data.get("role",friend.role)
        friend.description = data.get("description",friend.description)
        friend.gender = data.get("gender",friend.gender)
        
        # now commit all these changes here friend directly represent data itself its not a variable so we directly commit it 
        db.session.commit()
        return jsonify(friend.to_json()),200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500