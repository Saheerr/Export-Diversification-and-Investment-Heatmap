

from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

@app.route('/', strict_slashes=False)
def home():
    return '✅ Flask is running'

@app.route('/api/exports', strict_slashes=False)
def get_exports():
    
    return jsonify({"message": "this is /api/exports"})  

@app.route('/api/exp-div-heatmap', strict_slashes=False)
def exp_div_heatmap():
    print("📡 Serving /api/exp-div-heatmap")  
    conn = psycopg2.connect(
        host="localhost",
        dbname="your_db",
        user="your_user",
        password="your_password"
    )
    cur = conn.cursor()
    cur.execute("""
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'properties', json_build_object(
              'name', division_name,
              'metric', score
            ),
            'geometry', ST_AsGeoJSON(geom)::json
          )
        )
      )
      FROM export_diversification_scores;
    """)
    geojson = cur.fetchone()[0]
    cur.close()
    conn.close()
    return jsonify(geojson)

if __name__ == '__main__':
   
    app.run(host='0.0.0.0', port=5000, debug=True)
