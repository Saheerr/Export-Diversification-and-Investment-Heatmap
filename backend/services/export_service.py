# backend/services/export_service.py
from models import Export
from db import db

def get_exports_by_year(year: int):
    rows = Export.query.filter_by(year=year).all()
    return [r.to_dict() for r in rows]
