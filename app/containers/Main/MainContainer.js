import React from 'react'
import InputComponent from '../../components/InputComponent/InputComponent'
import { mainContainer } from './styles.css'
import { DATA } from '../../config/constants'

class MainContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      data: DATA
    }
  }

  handleSelection = ({label, value}) => {
    this.setState(() => { return { label, value } })
  }

  render () {
    return (
      <div className={mainContainer}>
        <div style={{width: '400px'}}>
          <InputComponent
            options={this.state.data}
            label='Choose a person'
            updateFunc={this.handleSelection}
            id='one'
          />
        </div>
        <label>The current selected label is <em><strong>{this.state.label}</strong></em></label>
        <label>The current selected value is <em><strong>{this.state.value}</strong></em></label>
      </div>
    )
  }
}

export default MainContainer
