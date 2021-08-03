import React from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import SignInForm from '../../components/SignInForm/SignInForm.js'
import { COMMUTE_DASHBOARD_MATCHEDRESULTS } from '../../constants/NavigationalConstants.js'
import { goToDashboardHomePage } from '../../utils/NavigationalUtils.js'
@inject('authStore')
@observer
class SignInFormRoute extends React.Component {
   @observable userName = ''
   @observable password = ''
   @observable mobileNumber = ''
   @observable confirmPassword = ''
   @observable displayError = ''
   @observable choosePassword = ''
   constructor() {
      super()
      this.init()
      this.displayError = false
   }
   init() {
      this.userName = ''
      this.password = ''
      this.mobileNumber = ''
      this.confirmPassword = ''
      this.choosePassword = ''
   }
   onSubmit = event => {
      event.preventDefault()
      let {
         userName,
         password,
         onClickSignUpButton,
         confirmPassword,
         mobileNumber
      } = this
      if (
         userName.length === 0 ||
         password.length === 0 ||
         confirmPassword.length === 0 ||
         mobileNumber.length === 0
      ) {
         this.displayError = true
      } else if (
         userName.length !== 0 &&
         password.length !== 0 &&
         confirmPassword.length !== 0 &&
         mobileNumber.length !== 0
      ) {
         this.displayError = false
         if (this.password === this.confirmPassword) {
            onClickSignUpButton()
         } else {
            this.choosePassword = 'choose a better password'
         }
      }
   }
   onChangeUserName = event => {
      this.userName = event.target.value
      this.choosePassword = ''
      this.displayError = false
   }
   onChangePassword = event => {
      this.password = event.target.value
      this.choosePassword = ''
      this.displayError = false
   }
   onChangeConfirmPassword = event => {
      this.confirmPassword = event.target.value
      this.choosePassword = ''
      this.displayError = false
   }
   onChangeMobileNumber = event => {
      this.mobileNumber = event.target.value
      this.choosePassword = ''
      this.displayError = false
   }
   @action.bound
   async onClickSignUpButton() {
      this.init()
      const {
         authStore: { userSignUp }
      } = this.props
      await userSignUp()
      const {
         authStore: { access_token }
      } = this.props
      if (access_token) {
         const { history } = this.props
         goToDashboardHomePage(history, window.localStorage.getItem('path'))
      }
   }

   render() {
      const {
         userName,
         password,
         confirmPassword,
         mobileNumber,
         choosePassword,
         onChangeUserName,
         onChangePassword,
         onChangeConfirmPassword,
         onChangeMobileNumber,
         onSubmit,
         displayError
      } = this
      return (
         <SignInForm
            userName={userName}
            password={password}
            confirmPassword={confirmPassword}
            onChangeUserName={onChangeUserName}
            onChangePassword={onChangePassword}
            onChangeConfirmPassword={onChangeConfirmPassword}
            onChangeMobileNumber={onChangeMobileNumber}
            onSubmit={onSubmit}
            displayError={displayError}
            mobileNumber={mobileNumber}
            choosePassword={choosePassword}
         />
      )
   }
}
export default withRouter(SignInFormRoute)
