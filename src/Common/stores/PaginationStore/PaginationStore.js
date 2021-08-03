import React from 'react'
import { observable, action, computed } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class PaginationStore {
   @observable getAPIStatus
   @observable getAPIError
   @observable results
   @observable totalResults
   @observable pageNumber
   constructor(props) {
      this.init(props)
   }
   @action.bound
   init(props) {
      this.getAPIStatus = API_INITIAL
      this.getAPIError = null
      this.results = new Map()
      this.totalResults = 0
      this.pageNumber = 1
      this.api = props.api
      this.limit = props.limit
   }
   @action.bound
   onChangePageNumber(pageNumber, data) {
      this.pageNumber = data.activePage
      if (!this.results.has(this.pageNumber)) {
         this.getData()
      }
   }
   @action.bound
   getData() {
      let data = {
         limit: this.limit,
         offset: (this.pageNumber - 1) * this.limit
      }
      const promise = this.api(data)
      return bindPromiseWithOnSuccess(promise)
         .to(this.setAPIStatus, this.setAPIResponse)
         .catch(this.setAPIError)
   }
   @action.bound
   setAPIResponse(apiResponse) {
      this.results.set(this.pageNumber, apiResponse.resource_items)
      this.totalResults = apiResponse.no_of_resource_items
   }
   @action.bound
   setAPIStatus(apiStatus) {
      this.getAPIStatus = apiStatus
   }
   @action.bound
   setAPIError(apiError) {
      this.getAPIError = apiError
   }
   @computed
   get totalNumberOfPages() {
      return Math.ceil(this.totalResults / this.limit)
   }
}
export { PaginationStore }
