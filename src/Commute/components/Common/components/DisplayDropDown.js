import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { Label } from '../../../styleGuides/StyleGuides.js'
import {
   Dropdown as DropdownAs,
   Star,
   ErrorStyle
} from '../../../styledComponents/styleComponents.js'

@observer
class DisplayDropDown extends React.Component {
   @observable isClicked
   constructor() {
      super()
      this.isClicked = false
   }
   @action.bound
   onChange(event, data) {
      this.isClicked = true
      const { onChange } = this.props
      onChange(data.value)
   }
   render() {
      const { data } = this.props
      return (
         <DropdownAs>
            {data.listTitle.length !== 0 ? (
               <Label htmlFor={data.listTitle.toLowerCase()}>
                  {data.listTitle}
                  <Star>*</Star>
               </Label>
            ) : (
               ''
            )}
            <Dropdown
               id={data.listTitle.toLowerCase()}
               placeholder={data.placeholder}
               selection
               options={data.listItems}
               onChange={this.onChange}
            />
            <ErrorStyle isError={!this.isClicked && this.props.displayError}>
               {' '}
               Required
            </ErrorStyle>
         </DropdownAs>
      )
   }
}
export { DisplayDropDown }
