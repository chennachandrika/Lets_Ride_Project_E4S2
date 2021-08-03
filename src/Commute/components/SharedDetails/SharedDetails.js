import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'

import { RiAddLine } from 'react-icons/ri'
import { DisplayDropDown } from '../Common/components/DisplayDropDown.js'
import { PaginationUI as Pagination } from '../Common/components/Pagination.js'
const filterOptions = {
   listTitle: '',
   listItems: [
      { key: 'ACTIVE', text: 'Pending', value: 'PENDING' },
      { key: 'EXPIRE', text: 'Expire', value: 'EXPIRED' }
   ],
   placeholder: 'Filter'
}

import {
   MyRequestsHeader,
   MyRequestType,
   MyRequestsDashboard,
   RequestHeader,
   NoOfRequests,
   FilterAndSort,
   Footer,
   Pages,
   AddShareButton
} from './styledComponents.js'
import { SharedRidesTable } from './ShareRides.js'
import { TravelInfoTable } from './TravelInfo.js'
import {
   SharedRides,
   TravelInfo
} from '../../stores/Models/SharedDetailsModels'

@inject('commuteStore')
@observer
class SharedDetails extends React.Component {
   constructor(props) {
      super(props)
   }
   @action.bound
   doNetWorkCalls() {
      const { doNetWorkCallsForSharedDetails } = this.props
      doNetWorkCallsForSharedDetails()
   }
   @action.bound
   onChangeFilter(filterBy) {
      //alert(filterBy);
      const {
         commuteStore: { onChangeSharedDetailsFilter }
      } = this.props
      onChangeSharedDetailsFilter(filterBy)
      this.doNetWorkCalls()
   }
   @action.bound
   onChangePageNumber = (event, data) => {
      //alert(data.activePage);
      const {
         commuteStore: { onChangeSharedDetailsPageNumber }
      } = this.props
      onChangeSharedDetailsPageNumber(data.activePage)
      this.doNetWorkCalls()
   }
   @action.bound
   onClickShareType(shareType) {
      //alert(shareType);
      const {
         commuteStore: { onChangeSharedDetailsShareType }
      } = this.props
      onChangeSharedDetailsShareType(shareType)
      this.doNetWorkCalls()
   }
   @action.bound
   getSharedDetails() {
      const {
         commuteStore: { displayData }
      } = this.props
      switch (displayData.sharedDetails.shareType) {
         case 'RIDE': {
            return displayData.sharedDetails.sharedRides
         }
         case 'TRAVEL INFO': {
            return displayData.sharedDetails.travelInfo
         }
      }
   }
   @action.bound
   getSharedDetailsAsModels() {
      const { getSharedDetails } = this

      let modelsForSharedDetails = getSharedDetails().map(share => {
         if (!share.hasOwnProperty('transport_medium')) {
            return new SharedRides(share)
         } else {
            return new TravelInfo(share)
         }
      })

      return modelsForSharedDetails
   }

   renderSuccessUI() {
      const {
         commuteStore: {
            displayData,
            getSharedRidesStatus,
            getSharedRidesError,
            getTravelInfoAPIStatus,
            getTravelInfoAPIError
         },
         addShareButton
      } = this.props
      const { doNetWorkCallsForSharedDetails } = this.props
      let shareType = displayData.sharedDetails.shareType
      const { getSharedDetailsAsModels } = this

      switch (shareType) {
         case 'RIDE': {
            return (
               //<div>RIDE</div>
               <SharedRidesTable
                  getShares={getSharedDetailsAsModels}
                  getSharedRidesStatus={getSharedRidesStatus}
                  getSharedRidesError={getSharedRidesError}
                  doNetworkCalls={doNetWorkCallsForSharedDetails}
                  addShareButton={addShareButton}
                  shareType={shareType}
               />
            )
         }
         case 'TRAVEL INFO': {
            return (
               //<div>Travel Info</div>
               <TravelInfoTable
                  doNetworkCalls={doNetWorkCallsForSharedDetails}
                  getTravelDetails={getSharedDetailsAsModels}
                  getTravelInfoAPIStatus={getTravelInfoAPIStatus}
                  getTravelInfoAPIError={getTravelInfoAPIError}
                  addShareButton={addShareButton}
                  shareType={shareType}
               />
            )
         }
      }
   }

   render() {
      const {
         commuteStore: { displayData, limit },
         addShareButton
      } = this.props
      const {
         onClickShareType,
         onChangePageNumber,
         onChangeFilter,
         getSharedDetails
      } = this

      let shareType = displayData.sharedDetails.shareType
      const noOfShareDetails =
         shareType === 'RIDE'
            ? displayData.sharedDetails.noOfSharedRides
            : displayData.sharedDetails.noOfSharedTravelInfo

      const totalNumberOfPages = Math.ceil(noOfShareDetails / limit)
      const pageNumber =
         shareType === 'RIDE'
            ? displayData.sharedDetails.sharedRidePageNumber
            : displayData.sharedDetails.sharedTravelInfoPageNumber
      return (
         <MyRequestsDashboard key={Math.random() + shareType}>
            <MyRequestsHeader>
               <MyRequestType
                  onClick={() => onClickShareType('RIDE')}
                  isSelected={shareType === 'RIDE' ? true : false}
               >
                  {'RIDE'}
               </MyRequestType>
               <MyRequestType
                  onClick={() => onClickShareType('TRAVEL INFO')}
                  isSelected={shareType === 'TRAVEL INFO' ? true : false}
               >
                  {'TRAVEL INFO'}
               </MyRequestType>
            </MyRequestsHeader>
            <RequestHeader>
               {noOfShareDetails !== 0 ? (
                  <NoOfRequests>{noOfShareDetails} Request(s)</NoOfRequests>
               ) : (
                  ' '
               )}
               <FilterAndSort>
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                  />
               </FilterAndSort>
            </RequestHeader>
            {this.renderSuccessUI()}
            {getSharedDetails().length !== 0 ? (
               <Footer>
                  <AddShareButton onClick={() => addShareButton(shareType)}>
                     <RiAddLine /> &nbsp;Share {shareType.toLowerCase()}
                  </AddShareButton>
                  {totalNumberOfPages !== 0 ? (
                     <Pages>
                        {pageNumber} to {totalNumberOfPages}
                     </Pages>
                  ) : (
                     ''
                  )}
                  <Pagination
                     totalNumberOfPages={totalNumberOfPages}
                     pageNumber={pageNumber}
                     onChangePageNumber={onChangePageNumber}
                  />
               </Footer>
            ) : (
               ''
            )}
         </MyRequestsDashboard>
      )
   }
}
export { SharedDetails }
