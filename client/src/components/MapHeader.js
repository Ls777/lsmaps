import React from 'react'
import { css, cx } from 'emotion'
import { Link } from 'react-router-dom'
import Logo from '../images/Logo'


import { Divider, H1, H2, Text } from '@blueprintjs/core'

export default ({ map }) => (
  <header className={cx(headerStyle, 'bp3-text-large')}>
    <Link to='/'>
      < Logo />
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

  div, h2 {
    margin: 0px 20px;
  }

  .bp3-text-large {
    font-family: 'Roboto', sans-serif;
    font-style: italic;
    max-width: 50%
  }

  a {
    padding-top: 10px;
  }

  .bp3-divider {
    align-self: stretch;
  }

`
