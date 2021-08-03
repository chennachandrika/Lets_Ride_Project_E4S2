import React from 'react'
import { observer } from 'mobx-react'
import { FcCheckmark } from 'react-icons/fc'
import { FiPlus } from 'react-icons/fi'
import { API_SUCCESS } from '@ib/api-constants'
import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

import {
   RequestDetailsTable,
   TableCellLeftAligned,
   TableCellAlignedCenter,
   TableHeader,
   TableRow,
   StatusButton,
   NoDataFound
} from './styledComponents.js'

@observer
class ShowAssetTransport extends React.Component {
   renderSuccessUI = () => {
      const { tableHeaders, getRequests } = this.props
      const assetRequests = getRequests()

      if (assetRequests.length !== 0) {
         return (
            <RequestDetailsTable>
               <TableRow>
                  {tableHeaders.map(eachOne => {
                     return <TableHeader>{eachOne}</TableHeader>
                  })}
               </TableRow>
               {Object.values(assetRequests).map(request => {
                  return (
                     <TableRow>
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
                           {request.no_of_assets}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {request.asset_type}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {request.asset_sensitivity}
                        </TableCellAlignedCenter>
                        <TableCellAlignedCenter>
                           {request.whom_to_deliver}
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
         getMatchingRequestAPIError,
         getMatchingRequestAPIStatus,
         doNetworkCalls
      } = this.props
      return (
         <React.Fragment>
            <LoadingWrapperWithFailure
               key={Math.random()}
               apiStatus={getMatchingRequestAPIStatus}
               apiError={getMatchingRequestAPIError}
               onRetryClick={doNetworkCalls}
               renderSuccessUI={renderSuccessUI}
            />
         </React.Fragment>
      )
   }
}
export { ShowAssetTransport }
