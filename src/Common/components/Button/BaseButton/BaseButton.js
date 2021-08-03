import React from 'react'
import { BaseButtonStyle, Text } from './styledComponents.js'

class BaseButton extends React.Component {
   render() {
      const { text, onClick } = this.props
      return (
         <BaseButtonStyle type='button' onClick={onClick}>
            <Text>{text}</Text>
         </BaseButtonStyle>
      )
   }
}
export { BaseButton }
