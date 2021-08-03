import React from 'react'
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect
} from 'react-router-dom'
import { observer, Provider } from 'mobx-react'

import {
   COMMUTE_DASHBOARD_SIGNUP_PAGE,
   COMMUTE_DASHBOARD_LOGIN_PAGE
} from './Authentication/constants/NavigationalConstants.js'
import {
   COMMUTE_DASHBOARD_HOME_PAGE,
   COMMUTE_DASHBOARD_RIDE_REQUEST,
   COMMUTE_DASHBOARD_ASSET_REQUEST,
   COMMUTE_DASHBOARD_SHARE_RIDE,
   COMMUTE_DASHBOARD_USERPROFILE,
   COMMUTE_DASHBOARD_SHARE_TRAVEL_INFO,
   COMMUTE_DASHBOARD_MY_REQUESTS,
   COMMUTE_DASHBOARD_MATCHEDRESULTS,
   COMMUTE_DASHBOARD_SHARED_DETAILS
} from './Commute/constants/NavigationalConstants.js'

import { LogInPageRoute } from './Authentication/routes'
import { SignInFormRoute } from './Authentication/routes'
import DashBoardRoute from './Commute/routes/DashBoardRoute/DashBoardRoute.js'
import UserProfile from './Authentication/components/UserProfile/UserProfile.js'
import { ProtectedRoute } from './Common/routes/ProtectedRoute'
import stores from './Common/stores'

import { AssetTransportRequest } from './Commute/components/AssetTransportRequest'
import { RideRequest } from './Commute/components/RideRequest'
import { ShareRide } from './Commute/components/ShareRide'
import { TravelInfo } from './Commute/components/TravelInfo'
import Home from './Common/components/HomePage'
import { PracticeDashboardRoute } from './Practice/routes/PracticeDashboardRoute'
import { PracticeCommonComponents } from './Practice/components/PracticeCommonComponents'

import './App.css'

@observer
class App extends React.Component {
   render() {
      return (
         <Provider {...stores}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  <Route
                     exact
                     path={COMMUTE_DASHBOARD_LOGIN_PAGE}
                     component={LogInPageRoute}
                  />
                  <Route
                     exact
                     path={COMMUTE_DASHBOARD_SIGNUP_PAGE}
                     component={SignInFormRoute}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_USERPROFILE}
                     component={UserProfile}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_MY_REQUESTS}
                     component={DashBoardRoute}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_MATCHEDRESULTS}
                     component={DashBoardRoute}
                     history={this.props.history}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_SHARED_DETAILS}
                     component={DashBoardRoute}
                  />

                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_ASSET_REQUEST}
                     component={AssetTransportRequest}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_RIDE_REQUEST}
                     component={RideRequest}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_SHARE_RIDE}
                     component={ShareRide}
                  />
                  <ProtectedRoute
                     exact
                     path={COMMUTE_DASHBOARD_SHARE_TRAVEL_INFO}
                     component={TravelInfo}
                  />

                  <Route
                     exact
                     path='/pagination'
                     component={PracticeDashboardRoute}
                  />
                  <Route
                     exact
                     path='/practice-common-components'
                     component={PracticeCommonComponents}
                  />

                  <Route exact path='/' component={Home} />
               </Switch>
            </Router>
         </Provider>
      )
   }
}
export default App
