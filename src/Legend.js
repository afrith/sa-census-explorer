import React from 'react'

const Legend = () => (
  <div id='legend'>
    <div class='header'>Population density</div>
    <div class='subhead'>(per km&sup2;)</div>
    <table class='legtable'>
      <tr>
        <td class='col' style={{ backgroundColor: '#ffffcc', opacity: 0.5 }} />
        <td class='from'>0</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>3</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#ffeda0', opacity: 0.5 }} />
        <td class='from'>3</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>10</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#fed976', opacity: 0.5 }} />
        <td class='from'>10</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>30</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#feb24c', opacity: 0.5 }} />
        <td class='from'>30</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>100</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#fd8d3c', opacity: 0.5 }} />
        <td class='from'>100</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>300</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#fc4e2a', opacity: 0.5 }} />
        <td class='from'>300</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>1000</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#e31a1c', opacity: 0.5 }} />
        <td class='from'>1000</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>3000</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#bc0026', opacity: 0.5 }} />
        <td class='from'>3000</td>
        <td class='dash'>&ndash;</td>
        <td class='to'>10000</td>
      </tr>
      <tr>
        <td class='col' style={{ backgroundColor: '#800026', opacity: 0.5 }} />
        <td class='from'>10000</td>
        <td class='dash'>&ndash;</td>
        <td class='to' />
      </tr>
    </table>
  </div>
)

export default React.memo(Legend)
