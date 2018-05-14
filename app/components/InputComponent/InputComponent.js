import React from 'react'
import PropTypes from 'prop-types'
import { inputComponent, inputContainer, inputField, inputList } from './styles.css'

class InputComponent extends React.Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    updateFunc: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

  constructor () {
    super()
    this.inputRef = React.createRef()
    this.state = {
      value: '',
      options: []
    }
  }

  handleInputChange = (value) => {
    const newOptions = this.props.options.filter((option) => {
      return option.label.toLowerCase().startsWith(value.toLowerCase())
    })
    this.setState(() => {
      return { value, options: newOptions }
    })
  }

  handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleSelect(e.target.value)
    }
  }

  handleClick = (value) => {
    this.handleInputChange(value)
    this.handleSelect(value)
  }

  handleSelect = (value) => {
    const selection = this.props.options.filter((item) => {
      return item.label.toLowerCase() === value.toLowerCase()
    })
    if (selection.length > 0) {
      this.inputRef.current.blur()
      this.props.updateFunc(selection[0])
    }
  }

  render () {
    return (
      <div className={inputComponent}>
        <label>{this.props.label}</label>
        <div className={inputContainer}>
          <input
            className={inputField}
            value={this.state.value}
            onChange={(e) => this.handleInputChange(e.target.value)}
            onKeyPress={(e) => this.handleOnEnter(e)}
            ref={this.inputRef}
          />
          {this.state.options.length > 1
            ? <ul
              className={inputList}
              onMouseDown={(e) => this.handleClick(e.target.innerText)}>
              {this.state.options.map((item) => (<li key={item.label}>{item.label}</li>))}
            </ul>
            : null
          }
        </div>
      </div>
    )
  }
}

export default InputComponent
