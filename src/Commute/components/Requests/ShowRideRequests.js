import React from 'react'
import { observer } from 'mobx-react'

import { RiAddLine } from 'react-icons/ri'
import strings from '../../i18n/strings.json'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton
} from './styledComponents.js'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'
import { NoDataFound as NoDataFoundDisplay } from '../Common/components/NoDataFound.js'

@observer
class ShowRideRequests extends React.Component {
   constructor() {
      super()
      this.tableHeaders = [
         'FROM',
         'TO',
         'DATE AND TIME',
         'NO OF PEOPLE',
         'LUGGAGE QUANTITY',
         'ACCEPTED PERSON DETAILS',
         'STATUS'
      ]
   }
   renderSuccessUI = () => {
      const { tableHeaders } = this
      const { getRequests, addRequestButton, requestType } = this.props
      const rideRequests = getRequests()
      if (rideRequests.length !== 0) {
         return (
            <RequestDetailsTable>
               <TableRow key={Math.random()}>
                  {this.tableHeaders.map(eachOne => {
                     return (
                        <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(rideRequests).map(request => {
                  return (
                     <TableRow key={Math.random() + request.id}>
                        <TableCellLeftAligned>
                           {request.origin}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {request.destination}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           {request.flexible_with_time ? (
                              <span>
                                 From:{request.start_datetime.slice(0, 21)}{' '}
                                 <br />
                                 To:{request.end_datetime.slice(0, 21)}
                              </span>
                           ) : (
                              request.datetime.slice(0, 21)
                           )}
                        </TableCellLeftAligned>
                        <TableCellAlignedCenter>
                           {request.no_of_seats}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {request.luggage_quantity}
                        </TableCellAlignedCenter>
                        <TableCellLeftAligned>
                           {request.status === 'CONFIRM' ? (
                              <span>
                                 {request.accepted_person.name}
                                 <br />
                                 {request.accepted_person.mobile_number}
                              </span>
                           ) : request.status === 'PENDING' ? (
                              'Pending'
                           ) : (
                              'Expired'
                           )}
                        </TableCellLeftAligned>
                        <TableCellLeftAligned>
                           <StatusButton status={request.status.toUpperCase()}>
                              {request.status.toUpperCase()}
                           </StatusButton>
                        </TableCellLeftAligned>
                     </TableRow>
                  )
               })}
            </RequestDetailsTable>
         )
      } else {
         return (
            <NoDataFoundDisplay
               noOfItems={getRequests()}
               onClick={addRequestButton}
               buttonType={requestType}
            />
         )
      }
   }
   render() {
      const { renderSuccessUI } = this
      const {
         getMyRideRequestAPIStatus,
         getMyRideRequestAPIError,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={this.navigateTo}
               apiStatus={getMyRideRequestAPIStatus}
               apiError={getMyRideRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowRideRequests }
