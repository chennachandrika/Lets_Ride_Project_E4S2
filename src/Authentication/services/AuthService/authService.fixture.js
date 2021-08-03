import { action } from 'mobx'

import getUserSignUpResponse from '../../fixtures/getUserSignUpResponse.json'

class AuthService {
   signInAPI = (userName, password) => {
      return new Promise(resolve => {
         resolve(getUserSignUpResponse)
      })
   }

   getProfileDetailsAPI = () => {
      let Details = {
         name: 'Loharika'
      }
      return new Promise(resolve => {
         resolve(Details)
      })
   }
}
export { AuthService }
