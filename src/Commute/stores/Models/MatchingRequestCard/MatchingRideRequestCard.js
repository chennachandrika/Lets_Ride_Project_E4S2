import React from 'react'
import { observable, action } from 'mobx'
import 'react-toastify/dist/ReactToastify.css'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import { toast } from 'react-toastify'

toast.configure()

class MatchingRideRequestCard {
   @observable isAdded
   @observable getAcceptingMatchedRequestAPIStatus
   @observable getAcceptingMatchedRequestAPIError

   constructor(props) {
      this.origin = props.request.origin
      this.destination = props.request.destination
      this.flexible_with_time = props.request.flexible_with_time
      this.no_of_seats = props.request.no_of_seats
      this.luggage_quantity = props.request.luggage_quantity
      this.requested_by = props.request.requested_by
      this.ride_request_id = props.request.ride_request_id
      this.isAdded = false
      if (props.request.flexible_with_time) {
         this.initIsFlexible(props)
      } else {
         this.initIsNotFlexible(props)
      }

      this.initAcceptingMatchedRequestsAPI()
   }

   @action.bound
   initAcceptingMatchedRequestsAPI() {
      this.getAcceptingMatchedRequestAPIStatus = API_INITIAL
      this.getAcceptingMatchedRequestAPIError = null
      this.getAcceptingMatchedRequestAPIResponse = ''
   }
   @action.bound
   initIsFlexible(props) {
      this.start_datetime = props.request.start_datetime
      this.end_datetime = props.request.end_datetime
   }
   @action.bound
   initIsNotFlexible(props) {
      this.datetime = props.request.datetime
   }
   @action.bound
   onClickAddButton() {
      this.postTheRequestId()
   }
   displayToaster = () => {
      toast(<div className='text-black font-bold'>Accepted</div>, {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 3000,
         closeButton: false,
         hideProgressBar: true
      })
   }
   async postTheRequestId() {
      await this.acceptTheMatchedRequest(this.ride_request_id)
   }
   @action.bound
   acceptTheMatchedRequest(requestId) {
      this.initAcceptingMatchedRequestsAPI()
      let matchedRequestPromise = this.acceptTheMatchedRequestAPI(requestId)
      return bindPromiseWithOnSuccess(matchedRequestPromise)
         .to(
            this.setGetAcceptingMatchedRequestAPIStatus,
            this.setGetAcceptingMatchedRequestAPIResponse
         )
         .catch(this.setGetAcceptingMatchedRequestAPIError)
   }
   @action.bound
   setGetAcceptingMatchedRequestAPIStatus(apiStatus) {
      this.getAcceptingMatchedRequestAPIStatus = apiStatus
      if (this.getAcceptingMatchedRequestAPIStatus === 200) {
         console.log(this.isAdded)
         this.isAdded = !this.isAdded
         console.log(this.isAdded)
         this.displayToaster()
      }
   }
   @action.bound
   setGetAcceptingMatchedRequestAPIError(apiError) {
      this.getAcceptingMatchedRequestAPIError = apiError
   }
   @action.bound
   setGetAcceptingMatchedRequestAPIResponse(apiResponse) {
      this.getAcceptingMatchedRequestAPIResponse = apiResponse
   }
   @action
   acceptTheMatchedRequestAPI(requestId) {
      return new Promise(resolve => {
         setTimeout(() => {
            resolve('added')
         }, 1000)
      })
   }
}
export { MatchingRideRequestCard }
