/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { Element, Container as CSSWithProp } from './styledComponents.js'
const color = 'white'
export const backgroundColor = css`
   background-color: teal;
`

const elementForCSSNormal = css`
   padding: 32px;
   ${backgroundColor}
   font-size: 30px;
   border-radius: 4px;
   &:hover {
      color: ${color};
   }
`
class Button extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Element>styled Component</Element>
            <button css={elementForCSSNormal}>css Normal.</button>
            <CSSWithProp color='orange'>This is lightgreen.</CSSWithProp>
         </React.Fragment>
      )
   }
}
export { Button }
