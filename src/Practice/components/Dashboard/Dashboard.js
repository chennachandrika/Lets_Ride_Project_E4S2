import React from 'react'
import { observer } from 'mobx-react'
import { action, computed } from 'mobx'
import { getLoadingStatus, ApiFailed } from '@ib/api-utils'
import { Table, Rating } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { PaginationUI } from '../../../Commute/components/Common/components/Pagination.js'
import LoadingWrapperWithFailure from '../../../Common/components/common/LoadingWrapperWithFailure'

@observer
class Dashboard extends React.Component {
   @computed
   get loadingStatus() {
      const {
         practiceStore: {
            getResourceDetailsAPIStatus,
            getResourceItemsAPIStatus
         }
      } = this.props
      return getLoadingStatus(
         getResourceDetailsAPIStatus,
         getResourceItemsAPIStatus
      )
   }
   @computed
   get apiFailed() {
      const {
         practiceStore: { getResourceDetailsAPIError, getResourceItemsAPIError }
      } = this.props
      return ApiFailed(getResourceDetailsAPIError, getResourceItemsAPIError)
   }
   @action.bound
   renderSuccessUI() {
      const {
         practiceStore: {
            paginationStore: {
               getAPIStatus,
               getAPIError,
               getData,
               pageNumber,
               totalNumberOfPages,
               onChangePageNumber
            }
         }
      } = this.props

      const {
         practiceStore: { resourceDetails, resourceItems }
      } = this.props
      return (
         <div
            key={Math.random()}
            className='flex flex-col justify-center items-center flex-column w-screen'
         >
            <h1>Animals</h1>
            <div className='w-3/4'>
               <div className='h-64'>
                  <LoadingWrapperWithFailure
                     apiStatus={getAPIStatus}
                     apiError={getAPIError}
                     renderSuccessUI={this.renderList}
                     onRetryClick={getData}
                  />
               </div>
               {totalNumberOfPages !== 0 ? (
                  <div className='flex justify-around items-center w-full my-12'>
                     <span>
                        {pageNumber} of {totalNumberOfPages}
                     </span>
                     <PaginationUI
                        pageNumber={pageNumber}
                        totalNumberOfPages={totalNumberOfPages}
                        onChangePageNumber={onChangePageNumber}
                     />
                  </div>
               ) : (
                  ''
               )}
            </div>

            <div className='flex'>
               <div>
                  <h1>{resourceDetails.name}</h1>
                  <div>{resourceDetails.description}</div>
               </div>
               <img src={resourceDetails.imgUrl} className='w-64 h-64' />
            </div>
            <div>
               {resourceItems.map(item => {
                  return <div key={item.name}>{item.name}</div>
               })}
            </div>
         </div>
      )
   }
   @action.bound
   renderList() {
      const {
         practiceStore: {
            paginationStore: { results, pageNumber }
         }
      } = this.props
      let listItems = results.get(pageNumber)
      return (
         <div className='flex flex-col justify-center items-center '>
            <Table celled padded>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                     <Table.HeaderCell>Cost</Table.HeaderCell>
                     <Table.HeaderCell>Rating</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>
               <Table.Body>
                  {listItems.map(item => (
                     <Table.Row key={item.name}>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.cost}</Table.Cell>
                        <Table.Cell>
                           <Rating
                              icon='star'
                              defaultRating={3}
                              maxRating={3}
                           />
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         </div>
      )
   }
   render() {
      const {
         practiceStore: {
            paginationStore: { getAPIStatus, getAPIError }
         },
         doNetworkCalls
      } = this.props
      const { loadingStatus, renderSuccessUI } = this

      const {
         practiceStore: { getResourceItemsAPIError }
      } = this.props
      return (
         <div
            key={Math.random()}
            className='flex flex-col justify-center items-center flex-column w-screen'
         >
            <LoadingWrapperWithFailure
               apiStatus={loadingStatus}
               apiError={getResourceItemsAPIError}
               renderSuccessUI={renderSuccessUI}
               onRetryClick={doNetworkCalls}
            />
         </div>
      )
   }
}
export { Dashboard }
