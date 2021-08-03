import React from 'react'
import { observer, inject } from 'mobx-react'
import { action } from 'mobx'
import { RiAddLine } from 'react-icons/ri'
import { DisplayDropDown } from '../Common/components/DisplayDropDown.js'
import { PaginationUI as Pagination } from '../Common/components/Pagination.js'
import { ShowRideRequests } from './ShowRideRequests.js'
import { ShowAssetTransport } from './ShowAssetTransport.js'

import {
   MyRequestsHeader,
   MyRequestType,
   MyRequestsDashboard,
   RequestHeader,
   NoOfRequests,
   FilterAndSort,
   Footer,
   Pages,
   AddRequestButton
} from './styledComponents.js'
import strings from '../../i18n/strings.json'

const filterOptions = {
   listTitle: '',
   listItems: [
      { key: 'PENDING', text: 'Pending', value: 'PENDING' },
      { key: 'CONFIRMED', text: 'Confirmed', value: 'CONFIRM' },
      { key: 'EXPIRE', text: 'Expire', value: 'EXPIRED' }
   ],
   placeholder: 'Filter'
}
const sortOptionsForRides = {
   listTitle: '',
   listItems: [
      { key: 'datetime', text: 'dateTime', value: 'datetime' },
      { key: 'Seats', text: 'Seats', value: 'no_of_seats' }
   ],
   placeholder: 'Sort'
}
const sortOptionsForAssets = {
   listTitle: '',
   listItems: [
      { key: 'datetime', text: 'Date Time', value: 'datetime' },
      {
         key: 'Assets Quantity',
         text: 'Assets Quantity',
         value: 'assets_quantity'
      }
   ],
   placeholder: 'Sort'
}

@inject('commuteStore')
@observer
class Requests extends React.Component {
   constructor() {
      super()
   }
   doNetWorkCalls() {
      const { doNetWorkCallsForRequests } = this.props
      doNetWorkCallsForRequests()
   }
   onChangePageNumber = (event, data) => {
      const {
         commuteStore: { onChangePageNumber }
      } = this.props
      onChangePageNumber('myRequests', data.activePage)
      this.doNetWorkCalls()
   }
   onClickRequestType = requestType => {
      const {
         commuteStore: { onChangeRequestType }
      } = this.props
      onChangeRequestType('myRequests', requestType)
      this.doNetWorkCalls()
   }
   @action.bound
   onChangeSortField(sortBy) {
      const {
         commuteStore: { onChangeSortField }
      } = this.props
      onChangeSortField('myRequests', sortBy)
      this.doNetWorkCalls()
   }
   @action.bound
   onChangeFilter(filterBy) {
      const {
         commuteStore: { onChangeFilter }
      } = this.props
      onChangeFilter('myRequests', filterBy)
      this.doNetWorkCalls()
   }

   @action.bound
   getRequests() {
      const {
         commuteStore: { displayData }
      } = this.props
      switch (displayData.myRequests.requestType) {
         case 'RIDE': {
            return displayData.myRequests.rideRequests
         }
         case 'ASSET': {
            return displayData.myRequests.assetRequests
         }
      }
   }
   @action.bound
   renderSuccessUI() {
      const {
         commuteStore: {
            displayData,
            getMyRideRequestAPIStatus,
            getMyRideRequestAPIError,
            getMyAssetRequestAPIStatus,
            getMyAssetRequestAPIError
         }
      } = this.props
      const { doNetWorkCallsForRequests, addRequestButton } = this.props
      let requestType = displayData.myRequests.requestType
      const { getRequests } = this

      switch (requestType) {
         case 'RIDE': {
            return (
               <ShowRideRequests
                  getRequests={getRequests}
                  doNetWorkCalls={doNetWorkCallsForRequests}
                  getMyRideRequestAPIStatus={getMyRideRequestAPIStatus}
                  getMyRideRequestAPIError={getMyRideRequestAPIError}
                  addRequestButton={addRequestButton}
                  requestType={requestType}
               />
            )
         }
         case 'ASSET': {
            return (
               <ShowAssetTransport
                  getRequests={getRequests}
                  doNetWorkCalls={doNetWorkCallsForRequests}
                  getMyAssetRequestAPIStatus={getMyAssetRequestAPIStatus}
                  getMyAssetRequestAPIError={getMyAssetRequestAPIError}
                  addRequestButton={addRequestButton}
                  requestType={requestType}
               />
            )
         }
      }
   }
   render() {
      const {
         onClickRequestType,
         onChangeSortField,
         onChangeFilter,
         onChangePageNumber,
         getRequests
      } = this
      const {
         commuteStore: { displayData, limit },
         addRequestButton
      } = this.props
      let requestType = displayData.myRequests.requestType
      const noOfRequests =
         requestType === 'RIDE'
            ? displayData.myRequests.noOfRideRequests
            : displayData.myRequests.noOfAssetRequests

      const totalNumberOfPages = Math.ceil(noOfRequests / limit)
      const pageNumber =
         requestType === 'RIDE'
            ? displayData.myRequests.rideRequestPageNumber
            : displayData.myRequests.assetRequestPageNumber

      return (
         <MyRequestsDashboard key={Math.random() + requestType}>
            <MyRequestsHeader>
               <MyRequestType
                  onClick={() => onClickRequestType('RIDE')}
                  isSelected={requestType === 'RIDE' ? true : false}
               >
                  {strings.text.ride.toUpperCase()}
               </MyRequestType>
               <MyRequestType
                  onClick={() => onClickRequestType('ASSET')}
                  isSelected={requestType === 'ASSET' ? true : false}
               >
                  {strings.text.asset.toUpperCase()}
               </MyRequestType>
            </MyRequestsHeader>
            <RequestHeader>
               {noOfRequests !== 0 ? (
                  <NoOfRequests>{noOfRequests} Request(s)</NoOfRequests>
               ) : (
                  ' '
               )}

               <FilterAndSort noOfRequests={noOfRequests}>
                  <DisplayDropDown
                     data={
                        requestType === 'RIDE'
                           ? sortOptionsForRides
                           : sortOptionsForAssets
                     }
                     onChange={onChangeSortField}
                  />
                  <DisplayDropDown
                     data={filterOptions}
                     onChange={onChangeFilter}
                  />
               </FilterAndSort>
            </RequestHeader>

            {this.renderSuccessUI()}

            {getRequests().length !== 0 ? (
               <Footer>
                  <AddRequestButton
                     data-testid={requestType.toLowerCase() + 'RequestButton'}
                     onClick={() => addRequestButton(requestType)}
                  >
                     <RiAddLine /> &nbsp;Add {requestType.toLowerCase()}
                  </AddRequestButton>
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
export { Requests }
