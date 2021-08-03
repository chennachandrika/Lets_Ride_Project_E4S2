import React from 'react'

import { RiAddLine } from 'react-icons/ri'
import {
   NoDataFoundStyle,
   AddButton
} from '../../../styledComponents/styleComponents.js'
class NoDataFound extends React.Component {
   constructor() {
      super()
   }
   render() {
      const { noOfItems, onClick, buttonType } = this.props
      return (
         <React.Fragment>
            <NoDataFoundStyle>
               {' '}
               No Data Found
               <AddButton
                  noOfItems={noOfItems}
                  onClick={() => onClick(buttonType)}
               >
                  <RiAddLine /> &nbsp;Add {buttonType.toLowerCase()}
               </AddButton>
            </NoDataFoundStyle>
         </React.Fragment>
      )
   }
}
export { NoDataFound }
