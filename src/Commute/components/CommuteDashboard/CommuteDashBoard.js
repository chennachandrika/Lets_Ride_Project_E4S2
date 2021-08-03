import React from 'react'
import { observer, inject } from 'mobx-react'
import {
   CommuteDashboardDisplay,
   MatchingResultsSelector,
   MyRequestsSelector,
   SharedDetailsSelector,
   Selectors
} from './styledComponents.js'
@inject('commuteStore', 'authStore')
@observer
class DashBoard extends React.Component {
   render() {
      const { selector, onClickSelector } = this.props
      return (
         <CommuteDashboardDisplay key={Math.random()}>
            <Selectors>
               <MatchingResultsSelector
                  onClick={() => onClickSelector('/home/matched-requests')}
                  isSelected={
                     selector === '/home/matched-requests' ? true : false
                  }
               >
                  Matching Results
               </MatchingResultsSelector>
               <MyRequestsSelector
                  onClick={() => onClickSelector('/home/my-requests')}
                  isSelected={selector === '/home/my-requests' ? true : false}
               >
                  My Requests
               </MyRequestsSelector>
               <SharedDetailsSelector
                  onClick={() => onClickSelector('/home/shared-details')}
                  isSelected={
                     selector === '/home/shared-details' ? true : false
                  }
               >
                  Shared Details
               </SharedDetailsSelector>
            </Selectors>
            {this.props.childComponent}
         </CommuteDashboardDisplay>
      )
   }
}
export { DashBoard }
