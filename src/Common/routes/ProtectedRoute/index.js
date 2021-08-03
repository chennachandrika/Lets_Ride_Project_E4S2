import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { COMMUTE_DASHBOARD_LOGIN_PAGE } from '../../../Authentication/constants/NavigationalConstants.js'
const ProtectedRoute = inject('authStore')(
   observer(({ component: Component, authStore, history, path, ...rest }) => {
      let accessToken = authStore.access_token
      window.localStorage.setItem('path', path)
      return (
         <Route
            {...rest}
            render={props => {
               if (accessToken !== undefined) {
                  return <Component />
               } else {
                  return (
                     <Redirect
                        to={{
                           pathname: COMMUTE_DASHBOARD_LOGIN_PAGE
                        }}
                     />
                  )
               }
            }}
         />
      )
   })
)
export { ProtectedRoute }
