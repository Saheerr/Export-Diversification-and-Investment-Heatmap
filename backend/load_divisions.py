# backend/load_divisions.py

import json
import os
import psycopg2
import sys


with open('bangladesh_divisions.geojson', encoding='utf-8') as f:
    raw = json.load(f)

# 2) Extract features
if 'features' in raw and isinstance(raw['features'], list):
    features = raw['features']
elif 'divisions' in raw and isinstance(raw['divisions'], list):
    features = raw['divisions']
else:
    print("ERROR: Expected a 'features' or 'divisions' array, found keys:", list(raw.keys()))
    sys.exit(1)

print(f"Found {len(features)} features in the GeoJSON")


conn = psycopg2.connect(
    host=os.getenv("DB_HOST", "localhost"),
    dbname=os.getenv("DB_NAME", "heatmap_db"),
    user=os.getenv("DB_USER", "heatmap_user"),
    password=os.getenv("DB_PASS", "S3cureP@ssw0rd")
)
cur = conn.cursor()


cur.execute("TRUNCATE export_diversification_scores;")


for feat in features:
    props = feat.get('properties', {})
    
    name = props.get('name') or props.get('NAME_1') or props.get('DIVISION') or props.get('admin1name')
    if not name:
        print("WARNING: feature missing name property, skipping:", props)
        continue
    
    score = 50  
    geometry = json.dumps(feat.get('geometry'))

    cur.execute("""
        INSERT INTO export_diversification_scores
            (division_name, score, geometry)
        VALUES (%s, %s, %s)
    """, (name, score, geometry))

conn.commit()
cur.close()
conn.close()

print(f"✅ Loaded {len(features)} divisions into the database")
