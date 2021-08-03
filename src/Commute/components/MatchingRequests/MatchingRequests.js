import React from 'react'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DisplayDropDown } from '../Common/components/DisplayDropDown.js'
import {
   Header,
   Title,
   DropDown,
   MatchingRequestsDisplay,
   CardsDisplay
} from './styledComponents.js'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

import {
   MatchingRideRequestCard,
   MatchingAssetRequestCard
} from '../../stores/Models/MatchingRequestCard'
import { AssetRequest } from './AssetRequest.js'
import { RideRequest } from './RideRequest.js'
import { MoreDetails } from './MoreDetails.js'

toast.configure()

@observer
class MatchingRequests extends React.Component {
   @action.bound
   getMatchingRequests() {
      const { getMatchingRequests } = this.props
      let modelsForMatchingRequests = getMatchingRequests().map(request => {
         if (request.hasOwnProperty('assetType')) {
            const requestData = {
               request: request,
               addButtonFunction: this.onClickAddButtonInRequest,
               onClickMoreButton: this.onClickMoreButton
            }
            return new MatchingAssetRequestCard(requestData)
         } else {
            const requestData = {
               request: request,
               addButtonFunction: this.onClickAddButtonInRequest,
               onClickMoreButton: this.onClickMoreButton
            }
            return new MatchingRideRequestCard(requestData)
         }
      })
      //return getMatchingRequests();
      return modelsForMatchingRequests
   }
   @action.bound
   onClickAddButtonInRequest(userDetails) {
      alert(userDetails)
   }
   onClickMoreButton(userDetails) {
      //alert(userDetails);
      toast(<MoreDetails />, {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 5000,
         closeButton: true,
         hideProgressBar: true
      })
   }
   @action.bound
   onChangeFilter(filterBy) {
      const { onChangeMatchingRequestsFilter } = this.props
      onChangeMatchingRequestsFilter(filterBy)
   }
   @action.bound
   renderCardRequestCards() {
      return (
         <CardsDisplay>
            {this.getMatchingRequests().map(request => {
               if (request.typeOfRequest === 'RIDE') {
                  return (
                     <RideRequest
                        key={Math.random() + request.id}
                        requestData={request}
                     />
                  )
               } else {
                  return (
                     <AssetRequest
                        key={Math.random() + request.id}
                        requestData={request}
                     />
                  )
               }
            })}
         </CardsDisplay>
      )
   }
   @action.bound
   renderSuccessUI() {
      const { onChangeFilter, renderCardRequestCards } = this
      const {
         getMatchingRequestAPIStatus,
         getMatchingRequestAPIError,
         doNetworkCalls
      } = this.props
      const filterOptions = {
         listTitle: '',
         listItems: [
            { key: 'ALL', text: 'All', value: 'ALL' },
            { key: 'RIDE', text: 'Ride', value: 'RIDE' },
            { key: 'ASSETS', text: 'Assets', value: 'ASSETS' }
         ],
         placeholder: 'Filter'
      }
      return (
         <MatchingRequestsDisplay>
            <Header>
               <Title>Matching Requests</Title>
               <DropDown>
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                  />
               </DropDown>
            </Header>
            <LoadingWrapperWithFailure
               key={this.navigateTo}
               apiStatus={getMatchingRequestAPIStatus}
               apiError={getMatchingRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderCardRequestCards}
            />
         </MatchingRequestsDisplay>
      )
   }
   render() {
      const { renderSuccessUI } = this
      return <React.Fragment>{renderSuccessUI()}</React.Fragment>
   }
}
export { MatchingRequests }
