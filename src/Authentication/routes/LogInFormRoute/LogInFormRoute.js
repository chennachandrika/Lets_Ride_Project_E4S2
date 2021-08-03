import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { withRouter, Redirect } from 'react-router-dom'

import { LogInForm } from '../../components/LogInForm'

import { COMMUTE_DASHBOARD_HOME_PAGE } from '../../constants/NavigationalConstants.js'
import { goToDashboardHomePage } from '../../utils/NavigationalUtils.js'

@inject('authStore')
@observer
class LogInPageRoute extends React.Component {
   @observable userName
   @observable password
   @observable displayError
   @observable errorText
   @observable isSignInClicked
   @observable userNameErrorText
   constructor() {
      super()
      this.init()
      this.displayError = false
   }

   init = () => {
      this.userName = ''
      this.password = ''
      this.errorText = ''
   }
   onSubmit = event => {
      event.preventDefault()
      let { userName, password } = this
      if (userName.length !== 0 && password.length !== 0) {
         this.displayError = false
         this.onClickLogInButton(this.userName, this.password)
      } else {
         this.displayError = true
      }
   }
   onChangeUserName = event => {
      this.userName = event.target.value
      this.displayError = false
      this.errorText = ''
   }
   onChangePassword = event => {
      this.password = event.target.value
      this.displayError = false
      this.errorText = ''
   }

   @action.bound
   async onClickLogInButton(userName, password) {
      this.init()
      const {
         authStore: { userLogIn }
      } = this.props
      await userLogIn(userName, password)
      this.isSignInClicked = true
      const {
         authStore: { access_token }
      } = this.props
      if (access_token) {
         const { history } = this.props
         goToDashboardHomePage(history)
      }
   }

   render() {
      const {
         userName,
         password,
         onChangeUserName,
         onChangePassword,
         errorText,
         onSubmit,
         displayError,
         isSignInClicked
      } = this
      return (
         <LogInForm
            userName={userName}
            password={password}
            isSignInClicked={isSignInClicked}
            onChangeUserName={onChangeUserName}
            onChangePassword={onChangePassword}
            onSubmit={onSubmit}
            displayError={displayError}
            errorText={errorText}
         />
      )
   }
}
export default withRouter(LogInPageRoute)
