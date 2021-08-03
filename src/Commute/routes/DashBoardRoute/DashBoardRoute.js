import React from 'react'
import { action, observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import { DashBoard } from '../../components/CommuteDashboard'

import { withHeader } from '../../Hocs/withHeader'
import { MatchingResults } from '../../components/MatchingResults'
import { Requests } from '../../components/Requests'
import { SharedDetails } from '../../components/SharedDetails'
import {
   COMMUTE_DASHBOARD_MY_REQUESTS,
   COMMUTE_DASHBOARD_MATCHEDRESULTS,
   COMMUTE_DASHBOARD_SHARED_DETAILS
} from '../../constants/NavigationalConstants.js'

import {
   goToRideRequestPage,
   goToAssetRequestPage,
   goToShareRidePage,
   goToTravelInfoPage,
   goToSharedDetailsPage,
   goToMyRequestsPage,
   goToMatchingResultsPage
} from '../../utils/NavigationalUtils.js'

@inject('commuteStore')
@observer
class DashBoardRoute extends React.Component {
   @observable selector
   constructor(props) {
      super(props)
      const {
         commuteStore: { onChangeSelectedPage }
      } = this.props
      const { history } = this.props
      onChangeSelectedPage(history.location.pathname.slice(18, 50))
      const {
         commuteStore: { selectedPage }
      } = this.props
      this.selector = selectedPage
   }

   componentDidMount() {
      const { doNetWorkCalls } = this
      doNetWorkCalls(this.selector)
   }
   @action.bound
   doNetWorkCalls(selectedPage) {
      const {
         doNetWorkCallsForMatchingRequests,
         doNetWorkCallsForRequests,
         doNetWorkCallsForSharedDetails
      } = this
      switch (selectedPage) {
         case '/home/my-requests': {
            doNetWorkCallsForRequests()
            return
         }
         case '/home/matched-requests': {
            doNetWorkCallsForMatchingRequests()
            return
         }
         case '/home/shared-details': {
            doNetWorkCallsForSharedDetails()
            return
         }
      }
   }
   @action.bound
   onClickSelector(selector) {
      const {
         commuteStore: { onChangeSelectedPage }
      } = this.props
      onChangeSelectedPage(selector)
      const { doNetWorkCalls } = this
      this.selector = selector
      switch (this.selector) {
         case '/home/my-requests': {
            goToMyRequestsPage(this.props.history)
            doNetWorkCalls('/home/my-requests')
            return
         }
         case '/home/matched-requests': {
            goToMatchingResultsPage(this.props.history)
            doNetWorkCalls('/home/matched-requests')
            return
         }
         case '/home/shared-details': {
            goToSharedDetailsPage(this.props.history)
            doNetWorkCalls('/home/shared-details')
            return
         }
      }
   }
   @action.bound
   doNetWorkCallsForRequests() {
      const {
         commuteStore: {
            displayData,
            limit,
            getMyRideRequests,
            getMyAssetRequests
         }
      } = this.props
      const requestType = displayData.myRequests.requestType

      switch (requestType) {
         case 'RIDE': {
            const filter = displayData.myRequests.filter
            const pageNumber = displayData.myRequests.rideRequestPageNumber
            const sortBy = displayData.myRequests.sortBy
            const sortByField = displayData.myRequests.sortByField
            let offset = (pageNumber - 1) * limit
            const dataToGetRequests = {
               filterBy: filter,
               sortBy: sortBy,
               sortByField: sortByField,
               offset: offset,
               limit: limit
            }
            getMyRideRequests(dataToGetRequests)
            break
         }
         case 'ASSET': {
            const filter = displayData.myRequests.filter
            const pageNumber = displayData.myRequests.assetRequestPageNumber
            const sortBy = displayData.myRequests.sortBy
            const sortByField = displayData.myRequests.sortByField
            let offset = (pageNumber - 1) * limit
            const dataToGetRequests = {
               filterBy: filter,
               sortBy: sortBy,
               sortByField: sortByField,
               offset: offset,
               limit: limit
            }
            getMyAssetRequests(dataToGetRequests)
            break
         }
      }
   }
   @action.bound
   async doNetWorkCallsForMatchingRequests() {
      const {
         commuteStore: { displayData, limit, getAllMatchingRequests }
      } = this.props
      const requestType = displayData.matchingResults.requestType
      const filter = displayData.matchingResults.filterBy
      const pageNumber =
         requestType === 'RIDE'
            ? displayData.matchingResults.rideRequestPageNumber
            : displayData.matchingResults.assetRequestPageNumber
      const sortBy = displayData.matchingResults.sortBy
      const sortByOrder = displayData.matchingResults.sortBy

      let offset = (pageNumber - 1) * limit
      /*const dataToGetRequests = {
         filterBy: filter,
         sortBy: sortBy,
         sortByOrder:sortByOrder,
         offset: offset,
         limit: limit,
      };
      await getAllMatchingRequests(requestType,dataToGetRequests);*/
      const dataToGetRequests = {
         limit: limit,
         offset: offset
      }
      await getAllMatchingRequests(requestType, dataToGetRequests)
   }
   @action.bound
   addRequestButton(requestType) {
      const { history } = this.props
      switch (requestType) {
         case 'RIDE': {
            goToRideRequestPage(history)
            return
         }
         case 'ASSET': {
            goToAssetRequestPage(history)
            return
         }
      }
   }
   @action.bound
   addShareButton(shareType) {
      const { history } = this.props
      switch (shareType) {
         case 'RIDE': {
            goToShareRidePage(history)
            return
         }
         case 'TRAVEL INFO': {
            goToTravelInfoPage(history)
            return
         }
      }
   }
   @action.bound
   onChangePath() {}
   @action.bound
   async doNetWorkCallsForSharedDetails() {
      const {
         commuteStore: {
            displayData,
            limit,
            getSharedRides,
            getSharedTravelInfo
         }
      } = this.props
      const shareType = displayData.sharedDetails.shareType
      switch (shareType) {
         case 'RIDE': {
            const filter = displayData.sharedDetails.filter
            const pageNumber = displayData.sharedDetails.sharedRidePageNumber
            let offset = (pageNumber - 1) * limit
            const details = {
               filter: filter,
               limit: limit,
               offset: offset
            }
            await getSharedRides(details)
            break
         }
         case 'TRAVEL INFO': {
            const filter = displayData.sharedDetails.filter
            const pageNumber =
               displayData.sharedDetails.sharedTravelInfoPageNumber
            let offset = (pageNumber - 1) * limit
            const details = {
               filter: filter,
               limit: limit,
               offset: offset
            }
            await getSharedTravelInfo(details)
            break
         }
      }
   }
   renderPage = () => {
      const {
         addRequestButton,
         addShareButton,
         doNetWorkCallsForMatchingRequests,
         doNetWorkCallsForRequests,
         doNetWorkCallsForSharedDetails,
         selector
      } = this

      const {
         commuteStore: {
            getMatchingRequestAPIStatus,
            getMatchingRequestAPIError,
            noOfAssetRequests,
            getMyRideRequestAPIStatus,
            getMyRideRequestAPIError,
            getMyAssetRequestAPIStatus,
            getMyAssetRequestAPIError
         }
      } = this.props

      switch (selector) {
         case '/home/my-requests': {
            return (
               <Requests
                  key={Math.random() + 'myrequests'}
                  doNetWorkCallsForRequests={doNetWorkCallsForRequests}
                  addRequestButton={addRequestButton}
               />
            )
         }
         case '/home/matched-requests': {
            return (
               <MatchingResults
                  key={Math.random() + 'matchingrequests'}
                  doNetWorkCallsForMatchingRequests={
                     doNetWorkCallsForMatchingRequests
                  }
               />
            )
         }
         case '/home/shared-details': {
            return (
               <SharedDetails
                  doNetWorkCallsForSharedDetails={
                     doNetWorkCallsForSharedDetails
                  }
                  addShareButton={addShareButton}
                  key={Math.random() + 'sharedDetails'}
               />
            )
         }
      }
   }
   render() {
      const {
         doNetWorkCallsForMatchingRequests,
         doNetWorkCallsForRequests,
         doNetWorkCallsForSharedDetails,
         addRequestButton,
         addShareButton,
         selector,
         onClickSelector
      } = this

      return (
         <DashBoard
            selector={selector}
            onClickSelector={onClickSelector}
            history={this.props.history}
            doNetWorkCallsForMatchingRequests={
               doNetWorkCallsForMatchingRequests
            }
            doNetWorkCallsForRequests={doNetWorkCallsForRequests}
            doNetWorkCallsForSharedDetails={doNetWorkCallsForSharedDetails}
            addRequestButton={addRequestButton}
            addShareButton={addShareButton}
            childComponent={this.renderPage()}
         />
      )
   }
}
export default withRouter(withHeader(DashBoardRoute))
