# backend/routes/exports.py
from flask import Blueprint, jsonify, request
from services.export_service import get_exports_by_year

exports_bp = Blueprint('exports', __name__, url_prefix='/api/exports')

@exports_bp.route('', methods=['GET'])
def exports_by_year():
    year = request.args.get('year', type=int)
    if not year:
        return jsonify({"error": "Must provide ?year=YYYY"}), 400
    data = get_exports_by_year(year)
    return jsonify(data), 200
