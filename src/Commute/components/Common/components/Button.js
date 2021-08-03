import React from 'react'
import { observer } from 'mobx-react'
import { ButtonStyle } from '../../../styledComponents/styleComponents.js'

@observer
class Button extends React.Component {
   render() {
      const { onClickFunction, buttonText } = this.props
      return <ButtonStyle onClick={onClickFunction}>{buttonText}</ButtonStyle>
   }
}
export { Button }
