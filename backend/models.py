
from db import db

class Export(db.Model):
    __tablename__ = 'exports'
    id       = db.Column(db.Integer, primary_key=True)
    year     = db.Column(db.Integer, nullable=False)
    sector   = db.Column(db.String(100), nullable=False)
    value    = db.Column(db.Float, nullable=False)
    country  = db.Column(db.String(100), nullable=True)  # destination

    def to_dict(self):
        return {
            "id": self.id,
            "year": self.year,
            "sector": self.sector,
            "value": self.value,
            "country": self.country
        }
