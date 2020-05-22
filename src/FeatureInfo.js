import React from 'react'
import { formatInt, formatDec } from './formats'

const names = {
  sa: 'Small Area',
  subplace: 'Subplace',
  mainplace: 'Mainplace',
  metro: 'Metropolitan Municipality',
  district: 'District Municipality',
  local: 'Local Municipality'
}

export default function FeatureInfo ({ feature }) {
  return (
    <>
      <div className='placename'>{feature.name}</div>
      <div className='placetype'>{names[feature.layer]}</div>
      <table class='geninfo'>
        <tbody>
          <tr>
            <td>Area:</td>
            <td className='num'>{formatDec(feature.area)}</td>
            <td>km&sup2;</td>
          </tr>
          <tr>
            <td>Population:</td>
            <td className='num'>{formatInt(feature.population)}</td>
          </tr>
          <tr>
            <td>Population density:</td>
            <td className='num'>{formatDec(feature.population / feature.area)}</td>
            <td>per km&sup2;</td>
          </tr>
          <tr>
            <td>Households:</td>
            <td className='num'>{formatInt(feature.households)}</td>
          </tr>
          <tr>
            <td>Household density:</td>
            <td className='num'>{formatDec(feature.households / feature.area)}</td>
            <td>per km&sup2;</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
