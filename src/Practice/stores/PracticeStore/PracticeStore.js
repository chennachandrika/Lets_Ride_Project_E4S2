import React from 'react'
import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import { PaginationStore } from '../../../Common/stores/PaginationStore'

class PracticeStore {
   @observable getResourceDetailsAPIStatus
   @observable getResourceDetailsAPIError
   @observable getResourceItemsAPIStatus
   @observable getResourceItemsAPIError

   @observable resouceDetails
   @observable resourceItems
   constructor(practiceService) {
      this.init(practiceService)
      this.limit = 4
      this.paginationStore = new PaginationStore({
         limit: this.limit,
         api: this.practiceService.getResourceListItemsAPI
      })
   }

   @action.bound
   init(practiceService) {
      this.practiceService = practiceService
      this.initResourceDetailsAPI()
      this.initResourceItemsAPI()
   }
   @action.bound
   initResourceDetailsAPI() {
      this.getResourceDetailsAPIStatus = API_INITIAL
      this.getResourceDetailsAPIError = null
      this.resourceDetails = ''
   }
   @action.bound
   initResourceItemsAPI() {
      this.getResourceItemsAPIStatus = API_INITIAL
      this.getResourceItemsAPIError = null
      this.resourceItems = ''
   }
   @action.bound
   getResourceDetails() {
      const resouceDetailsPromise = this.practiceService.getResourceDetailsAPI()
      return bindPromiseWithOnSuccess(resouceDetailsPromise)
         .to(
            this.setGetResourceDetailsAPIStatus,
            this.setGetResourceDetailsAPIResponse
         )
         .catch(this.setGetResourceDetailsAPIError)
   }
   @action.bound
   setGetResourceDetailsAPIStatus(apiStatus) {
      this.getResourceDetailsAPIStatus = apiStatus
   }
   @action.bound
   setGetResourceDetailsAPIResponse(apiResponse) {
      this.resourceDetails = apiResponse
   }
   @action.bound
   setGetResourceDetailsAPIError(apiError) {
      this.getResourceDetailsAPIError = apiError
   }

   @action.bound
   getResourceItems() {
      const resouceItemsPromise = this.practiceService.getResourceItemsAPI()
      return bindPromiseWithOnSuccess(resouceItemsPromise)
         .to(
            this.setGetResourceItemsAPIStatus,
            this.setGetResourceItemsAPIResponse
         )
         .catch(this.setGetResourceItemsAPIError)
   }
   @action.bound
   setGetResourceItemsAPIStatus(apiStatus) {
      this.getResourceItemsAPIStatus = apiStatus
   }
   @action.bound
   setGetResourceItemsAPIResponse(apiResponse) {
      this.resourceItems = apiResponse.data
   }
   @action.bound
   setGetResourceItemsAPIError(apiError) {
      this.getResourceItemsAPIError = apiError
   }
}
export { PracticeStore }
