import React, { useState } from 'react'
import './App.css'
import Map from './Map'
import FeatureInfo from './FeatureInfo'

function App () {
  const [hoverFeature, setHoverFeature] = useState()
  return (
    <>
      <div id='bar' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '0' }}>
          {hoverFeature && <FeatureInfo feature={hoverFeature} />}
        </div>
        <div style={{ flex: '1' }} />
        <div className='hint' style={{ flex: '0' }}>
          Move your mouse over the map to view statistics. Zoom in to see more detail.
        </div>
      </div>
      <div id='map'>
        <Map onHoverFeature={f => setHoverFeature(f)} />
      </div>
    </>
  )
}

export default App
