/*global expect*/
/*global jest*/

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { AuthService } from '../../services/AuthService'
import { AuthStore } from '../../stores'
import getUserLogInResponse from '../../fixtures/getUserSignUpResponse.json'
import {
   COMMUTE_DASHBOARD_LOGIN_PAGE,
   COMMUTE_DASHBOARD_HOME_PAGE
} from '../../constants/NavigationalConstants.js'

import LogInFormRoute from './LogInFormRoute.js'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('LogInFormRoute Tests', () => {
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
            <LogInFormRoute authStore={authStore} />
         </Router>
      )
      const logInButton = getByRole('button', { name: 'LOG IN' })

      fireEvent.click(logInButton)
   })

   it('should render password empty error message', () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <LogInFormRoute authStore={authStore} />
         </Router>
      )
      let username = 'test-user'
      let usernameField = getByPlaceholderText('Username')
      let logInButton = getByRole('button', { name: 'LOG IN' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(logInButton)
   })

   it('should submit log-in on press enter', () => {
      const { getByLabelText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <LogInFormRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      let usernameField = getByPlaceholderText('Username')
      let passwordField = getByPlaceholderText('Password')
      let logInButton = getByRole('button', { name: 'LOG IN' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.keyPress(logInButton, { key: 'Enter', code: 'Enter' })
   })

   it('should render logInRoute loading state', async () => {
      const { getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <LogInFormRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      let usernameField = getByPlaceholderText('Username')
      let passwordField = getByPlaceholderText('Password')
      let logInButton = getByRole('button', { name: 'LOG IN' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockLogInAPI = jest.fn()
      mockLogInAPI.mockReturnValue(mockLoadingPromise)
      authService.logInAPI = mockLogInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(logInButton)

      getByRole('button', { disabled: true })
   })

   it('should render logInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = COMMUTE_DASHBOARD_LOGIN_PAGE
      history.push(route)

      const { getByRole, debug, queryByRole, getByTestId } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={COMMUTE_DASHBOARD_LOGIN_PAGE}>
                  <LogInFormRoute />
               </Route>
               <Route path={COMMUTE_DASHBOARD_HOME_PAGE}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )
      const logInButton = getByRole('button', { name: 'LOG IN' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(getUserLogInResponse)
      })
      const mockLogInAPI = jest.fn()
      mockLogInAPI.mockReturnValue(mockSuccessPromise)
      authService.logInAPI = mockLogInAPI
      fireEvent.click(logInButton)

      waitFor(() => {
         expect(
            queryByRole('button', { name: 'LOG IN' })
         ).not.toBeInTheDocument()
         expect(getByTestId('location-display')).toHaveTextContent(
            COMMUTE_DASHBOARD_HOME_PAGE
         )
      })
   })
   it('should render logInRoute failure state', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <LogInFormRoute authStore={authStore} />
         </Router>
      )
      const logInButton = getByRole('button', { name: 'LOG IN' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockLogInAPI = jest.fn()
      mockLogInAPI.mockReturnValue(mockFailurePromise)
      authService.logInAPI = mockLogInAPI
      fireEvent.click(logInButton)

      waitFor(() => {
         getByText(/server-error/i)
      })
   })
})
