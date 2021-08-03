import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import {
   getAccessToken,
   setAccessToken,
   clearUserSession
} from '../../Common/utils/StorageUtils'

class AuthStore {
   @observable getUserSignInAPIStatus
   @observable getUserSignInAPIError
   @observable access_token

   @observable getUserProfileDetailsStatus
   @observable getUserProfileDetailsError
   @observable getUserProfileDetailsResponse

   authService
   constructor(authService) {
      this.init()
      this.initUserProfileDetailsAPI()
      this.authService = authService
   }
   @action.bound
   init() {
      this.getUserSignInAPIStatus = API_INITIAL
      this.getUserSignInAPIError = null
      this.access_token = getAccessToken()
   }
   //<--------------------------------INTIALISING THE USERPROFILE DETAILS API--------------------------------------------------->
   @action.bound
   initUserProfileDetailsAPI() {
      this.getUserProfileDetailsStatus = API_INITIAL
      this.getUserProfileDetailsError = null
      this.getUserProfileDetailsResponse = ''
   }

   @action.bound
   userSignUp() {
      let signInPromise = this.authService.signInAPI()
      return bindPromiseWithOnSuccess(signInPromise)
         .to(this.setGetUserSignInAPIStatus, this.setUserSignInAPIResponse)
         .catch(this.setGetUserSignInAPIError)
   }
   @action.bound
   userLogIn(userName, password) {
      let signInPromise = this.authService.signInAPI(userName, password)

      return bindPromiseWithOnSuccess(signInPromise)
         .to(this.setGetUserSignInAPIStatus, this.setUserSignInAPIResponse)
         .catch(this.setGetUserSignInAPIError)
   }
   @action.bound
   setUserSignInAPIResponse(signInResponse) {
      const access_token = signInResponse.access_token
      setAccessToken(access_token)
      this.access_token = access_token
   }
   @action.bound
   setGetUserSignInAPIError(apiError) {
      this.getUserSignInAPIError = apiError
   }
   @action.bound
   setGetUserSignInAPIStatus(apiStatus) {
      this.getUserSignInAPIStatus = apiStatus
   }
   //<----------------------------------GET USER PROFILE DETAILS REQUEST--------------------->
   @action.bound
   getUserProfileDetails() {
      this.initUserProfileDetailsAPI()
      let userDetailsRequestPromise = this.authService.getProfileDetailsAPI()
      return bindPromiseWithOnSuccess(userDetailsRequestPromise)
         .to(
            this.setGetUserProfileDetailsStatus,
            this.setGetUserProfileDetailsResponse
         )
         .catch(this.setGetUserProfileDetailsError)
   }
   @action.bound
   setGetUserProfileDetailsStatus(apiStatus) {
      this.getUserProfileDetailsStatus = apiStatus
   }
   @action.bound
   setGetUserProfileDetailsError(apiError) {
      this.getUserProfileDetailsError = apiError
   }
   @action.bound
   setGetUserProfileDetailsResponse(apiResponse) {
      this.getUserProfileDetailsResponse = apiResponse
   }

   @action.bound
   userSignOut() {
      clearUserSession()
      this.init()
   }
}
export { AuthStore }
