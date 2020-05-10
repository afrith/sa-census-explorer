import React, { useState, useEffect } from 'react'
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Map () {
  const [viewport, setViewport] = useState({
    latitude: -30,
    longitude: 25,
    zoom: 6
  })

  const { width, height } = viewport

  // Once the initial size of the map is known, position it to show the whole of SA
  useEffect(() => {
    if (!height) return
    const { longitude, latitude, zoom } = new WebMercatorViewport({ width, height })
      .fitBounds([[16.45, -34.833333], [32.891667, -22.127778]], { padding: 20 })
    setViewport(viewport => ({
      ...viewport,
      longitude,
      latitude,
      zoom
    }))
  }, [!height]) // eslint-disable-line

  return (
    <ReactMapGL
      mapStyle='https://maptiles.frith.dev/styles/positron/style.json'
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  )
}
