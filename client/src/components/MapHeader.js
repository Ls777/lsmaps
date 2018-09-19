import React from 'react'
import { css, cx } from 'emotion'
import { Link } from 'react-router-dom'

import { Divider, H1, H2, Text } from '@blueprintjs/core'

export default ({ map }) => (
  <header className={cx(headerStyle, 'bp3-text-large')}>
    <Link to='/'>
      <H1><span>Ls</span>Maps</H1>
    </Link>
    <Divider />
    <H2>{map.name}</H2>
    <Divider />
    <Text ellipsize className='bp3-text-large'>{map.description}</Text>

  </header>
)

const headerStyle = css`
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 60px;

  h1 {
    margin: 0px 20px 0px 10px;
  }

  div, h2 {
    margin: 0px 20px;
  }

  div {
    font-family: 'Roboto', sans-serif;
    font-style: italic;
    max-width: 50%
  }

  span {
    color: #FF4D00;
  }

  .bp3-divider {
    align-self: stretch;
  }

`
