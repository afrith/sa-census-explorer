import React, { useState, useEffect } from 'react'
import ReactMapGL, { Source, Layer, WebMercatorViewport } from 'react-map-gl'
import queryString from 'query-string'
import 'mapbox-gl/dist/mapbox-gl.css'

const layout = {
  'line-cap': 'round',
  'line-join': 'round'
}

const layers = [
  {
    id: 'subplace-line',
    'source-layer': 'subplace',
    minzoom: 9,
    type: 'line',
    layout,
    paint: {
      'line-color': '#4daf4a',
      'line-width': 0.2
    }
  },
  {
    id: 'mainplace-line',
    'source-layer': 'mainplace',
    minzoom: 7,
    type: 'line',
    layout,
    paint: {
      'line-color': '#4daf4a',
      'line-width': 0.5
    }
  },
  {
    id: 'local-line',
    'source-layer': 'local',
    type: 'line',
    layout,
    paint: {
      'line-color': '#377eb8',
      'line-width': 1
    }
  },
  {
    id: 'district-line',
    'source-layer': 'district',
    type: 'line',
    layout,
    paint: {
      'line-color': '#1f78b4',
      'line-width': 2
    }
  },
  {
    id: 'metro-line',
    'source-layer': 'metro',
    type: 'line',
    layout,
    paint: {
      'line-color': '#377eb8',
      'line-width': 2
    }
  },
  {
    id: 'province-line',
    'source-layer': 'province',
    type: 'line',
    layout,
    paint: {
      'line-color': '#000000',
      'line-width': 3
    }
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

export default function Map () {
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

  return (
    <ReactMapGL
      mapStyle='https://maptiles.frith.dev/styles/positron/style.json'
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <Source id='census' type='vector' tiles={[`${process.env.REACT_APP_TILE_ROOT}/{z}/{x}/{y}.mvt`]} maxzoom={20}>
        {layers.map(l => <Layer key={l.id} {...l} />)}
      </Source>
    </ReactMapGL>
  )
}
