// frontend/src/pages/InvestmentMap.jsx

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const WORLD_POLYGON = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-180, -90],
      [ 180, -90],
      [ 180,  90],
      [-180,  90],
      [-180, -90],
    ]]
  }
};

export default function InvestmentMap() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/exp-div-heatmap')
      .then(r => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  const getColor = v =>
    v > 80 ? '#800026' :
    v > 60 ? '#BD0026' :
    v > 40 ? '#E31A1C' :
    v > 20 ? '#FC4E2A' :
             '#FFEDA0';

  
  const fillStyle = feature => ({
    fillColor:   getColor(feature.properties.metric),
    fillOpacity: 0.8,
    stroke:      false
  });

  
  const maskStyle = {
    fillColor:   '#ffffff',
    fillOpacity: 1,
    stroke:      false
  };

  
  const edgeStyle = {
    fill:        false,
    color:       '#000000',
    weight:      2,
    opacity:     1
  };

  const onEach = (feature, layer) => {
    layer.bindPopup(
      `<strong>${feature.properties.name}</strong><br/>Score: ${feature.properties.metric}`
    );
  };

  return (
    <MapContainer
      center={[24.0, 90.5]}
      zoom={7}
      minZoom={7}
      maxZoom={10}
      style={{ height: '70vh', width: '100%' }}
      scrollWheelZoom={false}
     
      maxBounds={[[20.7, 88.0], [26.6, 92.7]]}
      maxBoundsViscosity={1.0}
    >
      
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
        attribution="&copy; OSM &copy; CARTO"
      />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png" />

      {geoData && (
        <>
         
          <GeoJSON data={WORLD_POLYGON} style={maskStyle} interactive={false} />
        
          <GeoJSON data={geoData} style={fillStyle} onEachFeature={onEach} />
          
          <GeoJSON data={geoData} style={edgeStyle} interactive={false} />
        </>
      )}
    </MapContainer>
  );
}
