/*global expect*/
/*global jest*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { AuthService } from '../../services/AuthService'
import { AuthStore } from '../../stores'
import getUserSignInResponse from '../../fixtures/getUserSignUpResponse.json'
import {
   COMMUTE_DASHBOARD_SIGNUP_PAGE,
   COMMUTE_DASHBOARD_HOME_PAGE
} from '../../constants/NavigationalConstants.js'

import SignInFormRoute from './SignInFormRoute.js'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute Tests', () => {
   let authService
   let authStore

   beforeEach(() => {
      authService = new AuthService()
      authStore = new AuthStore(authService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render username and password empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const signInButton = getByRole('button', { name: 'SIGN UP' })

      fireEvent.click(signInButton)
   })

   it('should render password empty error message', () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      let username = 'test-user'
      let usernameField = getByPlaceholderText('Username')
      let signInButton = getByRole('button', { name: 'SIGN UP' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(signInButton)
   })

   it('should submit sign-in on press enter', () => {
      const { getByLabelText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'
      const confirmPassword = 'test-confirmPassword'
      const mobileNumber = 'test-mobileNumber'
      let usernameField = getByPlaceholderText('Username')
      let passwordField = getByPlaceholderText('Password')
      let confirmPasswordField = getByPlaceholderText('Confirm Password')
      let mobileNumberField = getByPlaceholderText('Mobile Number')
      let signInButton = getByRole('button', { name: 'SIGN UP' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.change(confirmPasswordField, {
         target: { value: confirmPassword }
      })
      fireEvent.change(mobileNumberField, { target: { value: mobileNumber } })
      fireEvent.keyPress(signInButton, { key: 'Enter', code: 'Enter' })
   })

   it('should render signInRoute loading state', async () => {
      const { getByLabelText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'
      const confirmPassword = 'test-confirmPassword'
      const mobileNumber = 'test-mobileNumber'
      let usernameField = getByPlaceholderText('Username')
      let passwordField = getByPlaceholderText('Password')
      let confirmPasswordField = getByPlaceholderText('Confirm Password')
      let mobileNumberField = getByPlaceholderText('Mobile Number')

      let signInButton = getByRole('button', { name: 'SIGN UP' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authService.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.change(confirmPasswordField, {
         target: { value: confirmPassword }
      })
      fireEvent.change(mobileNumberField, { target: { value: mobileNumber } })
      fireEvent.click(signInButton)

      getByRole('button', { disabled: true })
   })

   it('should render signInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_SIGNUP_PAGE
      history.push(route)

      const { getByRole, queryByRole, getByTestId } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_SIGNUP_PAGE}>
                  <SignInFormRoute />
               </Route>
               <Route path={COMMUTE_DASHBOARD_HOME_PAGE}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )
      const signInButton = getByRole('button', { name: 'SIGN UP' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserSignInResponse)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authService.signInAPI = mockSignInAPI
      fireEvent.click(signInButton)

      await (() => {
         expect(
            queryByRole('button', { name: 'SIGN UP' })
         ).not.toBeInTheDocument()
         expect(getByTestId('location-display')).toHaveTextContent(
            COMMUTE_DASHBOARD_HOME_PAGE
         )
      })
   })
   it('should render signInRoute failure state', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInFormRoute authStore={authStore} />
         </Router>
      )
      const signInButton = getByRole('button', { name: 'SIGN UP' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authService.signInAPI = mockSignInAPI
      fireEvent.click(signInButton)

      waitFor(() => {
         getByText(/server-error/i)
      })
   })
})
