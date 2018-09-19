import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Dialog, NonIdealState, Spinner } from '@blueprintjs/core'
import { css } from 'emotion'

export default ({ isOpen }) => (
  <Dialog isOpen={isOpen} className={css`padding-top: 30px;`}>
    <NonIdealState
      intent='danger'
      title='Map not found'
      icon='error'
      action={
        <Link to='/'>
          <Button icon='home' text='Home' intent='primary' />
        </Link>
      }
      description="I'm sorry, we weren't able to find that map."
    />
  </Dialog>
)
