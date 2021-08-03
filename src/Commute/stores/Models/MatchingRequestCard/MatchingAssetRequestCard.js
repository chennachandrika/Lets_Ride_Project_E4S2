import React from 'react'
import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'

toast.configure()

class MatchingAssetRequestCard {
   @observable getAcceptingMatchedRequestAPIStatus
   @observable getAcceptingMatchedRequestAPIError
   @observable isAdded
   constructor(props) {
      this.origin = props.request.origin
      this.destination = props.request.destination
      this.no_of_assets = props.request.assets_quantity
      this.asset_type = props.request.asset_type
      this.asset_sensitivity = props.request.asset_sensitivity
      this.luggage_quantity = props.request.luggage_quantity
      this.asset_to_be_delivered_to = props.request.asset_to_be_delivered_to
      this.requested_by = props.request.requested_by
      this.asset_request_id = props.request.asset_request_id
      this.flexible_with_time = props.request.flexible_with_time
      this.whom_to_deliver = props.request.whom_to_deliver
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
      this.isAdded = !this.isAdded
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
      await this.acceptTheMatchedRequest(this.asset_request_id)
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
export { MatchingAssetRequestCard }
// "origin": "string",
//       "destination": "string",
//       "datetime": "string",
//       "flexible_with_time": true,
//       "start_datetime": "string",
//       "end_datetime": "string",
//       "no_of_assets": 0,
//       "asset_type": "BAGS",
//       "asset_sensitivity": "HIGHLY_SENSITIVE",
//       "luggage_quantity": 0,
//       "asset_to_be_delivered_to": "string",
//       "accepted_person": {
//        "name": "string",
//        "mobile_number": "string"
//       }
