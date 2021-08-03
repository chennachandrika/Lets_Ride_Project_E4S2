import React from 'react'
import { BaseButton } from './BaseButton/BaseButton.js'

class Button extends React.Component {
   render() {
      const { text, textTypo, onClick, disabled } = this.props
      return <BaseButton text={text} onClick={onClick} />
   }
}
export { Button }
