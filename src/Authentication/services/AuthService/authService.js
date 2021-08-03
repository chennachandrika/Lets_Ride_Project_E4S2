import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants.js'
import { EnvironmentConstants } from '../../../Common/constants'
import { endpoints } from '../endpoints.js'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: 'https://1d2c1582fff8.ngrok.io/'
      })
   }
   signInAPI = (userName, password) => {
      const siva = {
         username: userName,
         password: password
      }
      return networkCallWithApisauce(
         this.api,
         'api/lets_ride/user/login/v1/',
         siva,
         apiMethods.post
      )
   }
   logInAPI = (userName, password) => {
      const siva = {
         username: userName,
         password: password
      }
      return networkCallWithApisauce(
         this.api,
         'api/lets_ride/user/login/v1/',
         siva,
         apiMethods.post
      )
   }
   @action.bound
   getProfileDetailsAPI() {
      return networkCallWithApisauce(
         this.baseApi,
         'api/lets_ride/user/profile/v1/',
         {},
         apiMethods.get
      )
   }
}
export { AuthService }
