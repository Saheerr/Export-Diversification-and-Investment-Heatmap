// src/pages/InvestmentMap.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const InvestmentMap = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    console.log('🔍 InvestmentMap mounted');
    console.log('🔍 about to fetch http://localhost:5000/api/exp-div-heatmap');

    fetch('http://localhost:5000/api/exp-div-heatmap')
      .then(res => {
        console.log('🔍 got response', res);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('🔍 parsed JSON', data);
        setGeoData(data);
      })
      .catch(err => console.error('🔍 fetch error:', err));
  }, []);

  const getColor = v =>
    v > 80 ? '#800026' :
    v > 60 ? '#BD0026' :
    v > 40 ? '#E31A1C' :
    v > 20 ? '#FC4E2A' :
             '#FFEDA0';

  const styleFeature = feature => ({
    fillColor:   getColor(feature.properties.metric),
    weight:      2,
    opacity:     1,
    color:       'white',
    dashArray:   '3',
    fillOpacity: 0.7,
  });

  const onEachFeature = (feature, layer) => {
    const { name, metric } = feature.properties;
    layer.bindPopup(`${name}<br/>Score: ${metric}`);
  };

  return (
    <MapContainer
      center={[23.6850, 90.3563]}
      zoom={7}
      style={{ height: '70vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default InvestmentMap;
