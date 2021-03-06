import React, { useState, useEffect, useCallback } from 'react'
import ReactMapGL, { Source, Layer, WebMercatorViewport } from 'react-map-gl'
import queryString from 'query-string'
import 'mapbox-gl/dist/mapbox-gl.css'

const layout = {
  'line-cap': 'round',
  'line-join': 'round'
}

const fillColor = ['step',
  ['/',
    ['get', 'population'],
    ['get', 'area']
  ],
  '#ffffcc',
  3, '#ffeda0',
  10, '#fed976',
  30, '#feb24c',
  100, '#fd8d3c',
  300, '#fc4e2a',
  1000, '#e31a1c',
  3000, '#bd0026',
  10000, '#800026'
]

const layers = [
  {
    id: 'sa-fill',
    'source-layer': 'sa',
    minzoom: 11,
    type: 'fill',
    paint: {
      'fill-color': fillColor,
      'fill-opacity': 0.5
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'subplace-fill',
    'source-layer': 'subplace',
    minzoom: 9,
    maxzoom: 11,
    type: 'fill',
    paint: {
      'fill-color': fillColor,
      'fill-opacity': 0.5
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'mainplace-fill',
    'source-layer': 'mainplace',
    minzoom: 7,
    maxzoom: 9,
    type: 'fill',
    paint: {
      'fill-color': fillColor,
      'fill-opacity': 0.5
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'local-fill',
    'source-layer': 'local',
    maxzoom: 7,
    type: 'fill',
    paint: {
      'fill-color': fillColor,
      'fill-opacity': 0.5
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'metro-fill',
    'source-layer': 'metro',
    maxzoom: 7,
    type: 'fill',
    paint: {
      'fill-color': fillColor,
      'fill-opacity': 0.5
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'sa-line',
    'source-layer': 'sa',
    minzoom: 9,
    type: 'line',
    layout,
    paint: {
      'line-color': '#5f5f5f',
      'line-width': 0.5
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'subplace-line',
    'source-layer': 'subplace',
    minzoom: 9,
    type: 'line',
    layout,
    paint: {
      'line-color': '#5f5f5f',
      'line-width': ['interpolate', ['exponential', 1.41], ['zoom'], 9, 0.5, 11, 1]
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'mainplace-line',
    'source-layer': 'mainplace',
    minzoom: 7,
    type: 'line',
    layout,
    paint: {
      'line-color': '#5f5f5f',
      'line-width': ['interpolate', ['exponential', 1.41], ['zoom'], 7, 0.5, 9, 1, 11, 2]
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'local-line',
    'source-layer': 'local',
    type: 'line',
    layout,
    paint: {
      'line-color': '#5f5f5f',
      'line-width': ['interpolate', ['exponential', 1.41], ['zoom'], 5, 0.5, 7, 1, 9, 2]
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'metro-line',
    'source-layer': 'metro',
    type: 'line',
    layout,
    paint: {
      'line-color': '#5f5f5f',
      'line-width': ['interpolate', ['exponential', 1.41], ['zoom'], 5, 0.5, 7, 1, 9, 2]
    },
    beforeId: 'highway_name_other'
  },
  {
    id: 'province-line',
    'source-layer': 'province',
    type: 'line',
    layout,
    paint: {
      'line-color': '#5f5f5f',
      'line-width': ['interpolate', ['exponential', 1.41], ['zoom'], 5, 1, 7, 2]
    },
    beforeId: 'highway_name_other'
  }
]

const calculateInitialViewport = ({ width, height }) => {
  const hash = queryString.parse(window.location.hash)
  let latitude = parseFloat(hash.lat)
  let longitude = parseFloat(hash.lon)
  let zoom = parseFloat(hash.zoom)

  if (isNaN(latitude) || isNaN(longitude) || isNaN(zoom)) {
    ({ longitude, latitude, zoom } = new WebMercatorViewport({ width, height })
      .fitBounds([[16.45, -34.833333], [32.891667, -22.127778]], { padding: 20 }))
  }

  return { longitude, latitude, zoom }
}

const updateHash = ({ longitude, latitude, zoom }) => {
  const newHash = '#' + queryString.stringify({
    lat: latitude.toFixed(3),
    lon: longitude.toFixed(3),
    zoom: zoom.toFixed(1)
  })
  window.history.replaceState(null, null, newHash)
}

export default function Map ({ onHoverFeature = () => {} }) {
  const [viewport, setViewport] = useState({})
  const [locationInitialised, setLocationInitialised] = useState(false)

  // Once the initial size of the map is known, position it to hash if it exists, or to fit whole SA
  useEffect(() => {
    if (locationInitialised || !viewport.height || !viewport.width) return

    const newViewport = calculateInitialViewport(viewport)
    setViewport(viewport => ({ ...viewport, ...newViewport }))
    setLocationInitialised(true)
  }, [viewport, locationInitialised])

  // Debounced hash updates
  useEffect(() => {
    const timeout = setTimeout(() => { updateHash(viewport) }, 250)
    return () => { clearTimeout(timeout) }
  }, [viewport])

  const handleMouseMove = useCallback(e => {
    const feature = e.features && e.features.find(f => f.layer.id.endsWith('-fill'))
    onHoverFeature(feature && { ...feature.properties, layer: feature.layer['source-layer'] })
  }, [onHoverFeature])

  return (
    <ReactMapGL
      mapStyle='https://maptiles.frith.dev/styles/positron/style.json'
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onHover={handleMouseMove}
    >
      <Source id='census' type='vector' tiles={[`${process.env.REACT_APP_TILE_ROOT}/{z}/{x}/{y}.mvt`]} maxzoom={20}>
        {layers.map(l => <Layer key={l.id} {...l} />)}
      </Source>
    </ReactMapGL>
  )
}
