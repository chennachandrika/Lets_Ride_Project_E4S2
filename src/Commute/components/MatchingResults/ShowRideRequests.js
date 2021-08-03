import React from 'react'
import { observer } from 'mobx-react'
import { FcCheckmark } from 'react-icons/fc'
import { FiPlus } from 'react-icons/fi'
import { API_SUCCESS } from '@ib/api-constants'
import strings from '../../i18n/strings.json'
import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton,
   NoDataFound
} from './styledComponents.js'

import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

@observer
class ShowRideRequests extends React.Component {
   renderSuccessUI = () => {
      const {
         tableHeaders,
         getRequests,
         getAcceptingMatchedRequestAPIStatus
      } = this.props
      const rideRequests = getRequests()
      if (rideRequests.length !== 0) {
         return (
            <RequestDetailsTable key={Math.random()}>
               <TableRow key={Math.random()}>
                  {tableHeaders.map(eachOne => {
                     return (
                        <TableHeader key={Math.random()}>{eachOne}</TableHeader>
                     )
                  })}
               </TableRow>
               {Object.values(rideRequests).map(request => {
                  return (
                     <TableRow key={Math.random()}>
                        <TableCellLeftAligned>
                           {request.requested_by.name}
                           <br />
                           {request.requested_by.mobile_number}
                        </TableCellLeftAligned>
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
                           <StatusButton onClick={request.onClickAddButton}>
                              {request.isAdded ? <FcCheckmark /> : <FiPlus />}
                           </StatusButton>
                        </TableCellLeftAligned>
                     </TableRow>
                  )
               })}
            </RequestDetailsTable>
         )
      } else {
         return <NoDataFound> No Matching Requests Found</NoDataFound>
      }
   }
   render() {
      const { renderSuccessUI } = this
      const {
         getMatchingRequestAPIStatus,
         getMatchingRequestAPIError,
         doNetworkCalls
      } = this.props

      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={this.navigateTo}
               apiStatus={getMatchingRequestAPIStatus}
               apiError={getMatchingRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowRideRequests }
