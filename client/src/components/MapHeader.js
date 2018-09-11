import React from 'react'
import { css, cx } from 'emotion'

import { Divider, H1, H2 } from '@blueprintjs/core'

const MapHeader = ({ map }) => (
  <header className={cx(headerStyle, 'bp3-text-large')}>
    <H1>LsMaps</H1>
    <Divider />
    <H2>{map.name}</H2>
    <em className='bp3-text-large'>{map.description}</em>

  </header>
)

const headerStyle = css`
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 60px;

  em, h2 {
    margin-left: 50px;
  }
  
`

export default MapHeader
