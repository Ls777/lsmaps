import React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  ButtonGroup,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuDivider,
  Popover
} from '@blueprintjs/core'

import NewMarkerForm from './NewMarkerForm'
import {
  openMarkerForm,
  openMapForm,
  exitSelectLocationMode
} from '../reducers/ui'
import { cloneMap } from '../reducers/map'

import AutoComplete from './AutoComplete'
import { FormikProvider } from 'formik'

class MapMenu extends React.Component {
  cloneThisMap = () => {
    this.props.cloneMap().then(() => {
      console.log('redirecting')
      console.log(this.props.map.id)
      this.props.history.push(`/maps/${this.props.map.id}`)
    })
  }

  render () {
    const {
      openMarkerForm,
      openMapForm,
      cloneMap,
      map,
      staticContext,
      ...props
    } = this.props

    return (
      <Menu className={props.className}>
        <MenuItem
          text='New Map'
          icon='document'
          {...props}
          onClick={() => openMapForm(false)}
        />
        <MenuItem
          text='Clone Map'
          icon='folder-shared'
          {...props}
          onClick={this.cloneThisMap}
        />
        <MenuDivider />
        <MenuItem
          text='Edit Map Details'
          icon='floppy-disk'
          {...props}
          onClick={() => openMapForm(true)}
        />
        <MenuItem text='Change Map Theme' icon='floppy-disk' {...props} />
        <MenuDivider />
        <MenuItem text='Exit' icon='cross' {...props} />
      </Menu>
    )
  }
}

const MapMenuWithRouter = withRouter(MapMenu)

const MarkerMenu = ({ openMarkerForm, openMapForm, ...props }) => (
  <Menu className={props.className}>
    <MenuItem
      text='New Marker'
      icon='document'
      {...props}
      onClick={() => openMarkerForm(false)}
    />
    <MenuItem text='From spreadsheet' icon='folder-shared' {...props} />
    <MenuDivider />
    <MenuItem text='Export Spreadsheet' icon='floppy-disk' {...props} />
    <MenuDivider />
    <MenuItem text='Exit' icon='cross' {...props} />
  </Menu>
)

class MapUi extends React.Component {
  state = { redirect: false }

  render () {
    const {
      inputRef,
      exitSelectLocationMode,
      mapCenter,
      ...menuProps
    } = this.props

    return (
      <div className={container}>
        <ButtonGroup className={css`flex:none;`}>
          <Popover
            content={<MapMenuWithRouter {...menuProps} />}
            position='bottom'
            minimal
          >
            <Button text='Map' />
          </Popover>
          <Popover
            content={<MarkerMenu {...menuProps} />}
            position='bottom'
            minimal
          >
            <Button text='Marker' />
          </Popover>

          <Divider />
          <Button icon='add' onClick={exitSelectLocationMode} />
          <Button icon='remove' />
        </ButtonGroup>
        <AutoComplete
          className={input}
          map={menuProps.map}
          google={menuProps.google}
        />
      </div>
    )
  }
}

const container = css`
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
`

const input = css`
  flex: auto;
  margin-left: 20px;
  margin-right: 150px;
  max-width: 600px;
`

export default connect(state => ({ ui: state.ui, map: state.map }), {
  openMarkerForm,
  openMapForm,
  exitSelectLocationMode,
  cloneMap
})(MapUi)
