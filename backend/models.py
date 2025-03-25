from app import db


# data base design

class Friend(db.Model):
    # here id is a primary key so we dont need to pass its value in body because it will automaticaly adjust its value to 1 and incremently accordingly to make it unique and not null
    id = db.Column(db.Integer, primary_key = True)
    
    name = db.Column(db.String(100), nullable = False)
    role = db.Column(db.String(50),nullable = False)
    description = db.Column(db.Text,nullable = False)    
    gender = db.Column(db.String(10),nullable = False)
    img_url = db.Column(db.String(200),nullable = True)
    
    # database data to json format
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgURL" : self.img_url
        }