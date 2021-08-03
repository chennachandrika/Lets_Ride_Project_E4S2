import React from 'react'
import { observer, inject } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {
   goToRideRequestPage,
   goToAssetRequestPage,
   goToShareRidePage,
   goToTravelInfoPage,
   goToUserProfilePage,
   goToMatchingResultsPage
} from '../../utils/NavigationalUtils.js'

import { LogoImage } from '../Common/components'

import {
   HeaderStyle,
   RiderInfo,
   LogoImageContainer,
   Shares,
   Requests,
   ProfileAndSignOut,
   UserProfile,
   HomePage
} from './styledComponents.js'

@inject('authStore', 'commuteStore')
@observer
class Header extends React.Component {
   onClickRide = (event, data) => {
      const { history } = this.props
      goToRideRequestPage(history)
   }
   onClickAssetRequest = (event, data) => {
      const { history } = this.props
      goToAssetRequestPage(history)
   }
   onClickShareRide = (event, data) => {
      const { history } = this.props
      goToShareRidePage(history)
   }
   onClickTravelInfo = (event, data) => {
      const { history } = this.props
      goToTravelInfoPage(history)
   }
   onClickUserProfile = () => {
      const { history } = this.props
      goToUserProfilePage(history)
   }
   onClickSignOut = () => {
      const {
         authStore: { userSignOut }
      } = this.props
      userSignOut()
   }
   onClickHomeButton = () => {
      const { history } = this.props
      const {
         commuteStore: { onChangeSelectedPage }
      } = this.props
      onChangeSelectedPage('/home/matched-requests')
      goToMatchingResultsPage(history, '/home/matched-requests')
   }
   render() {
      const {
         onClickSignOut,
         onClickUserProfile,
         onClickHomeButton,
         onClickRide,
         onClickAssetRequest,
         onClickShareRide,
         onClickTravelInfo
      } = this
      return (
         <HeaderStyle>
            <LogoImageContainer>
               <LogoImage />
            </LogoImageContainer>
            <RiderInfo>
               <HomePage onClick={onClickHomeButton}>Home</HomePage>
               <Requests>
                  <Dropdown
                     text='Requests'
                     data-testid={'Requests'}
                     closeOnEscape={true}
                  >
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Ride'
                           value={'rideRequest'}
                           onClick={onClickRide}
                           data-testid='rideRequest'
                        />
                        <Dropdown.Item
                           text='Asset Transport'
                           value={'assetTranportRequest'}
                           onClick={onClickAssetRequest}
                           data-testid='assetTranportRequest'
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </Requests>
               <Shares>
                  <Dropdown text='Share' closeOnEscape={true}>
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Ride'
                           value={'shareRide'}
                           onClick={onClickShareRide}
                           data-testid={'share-ride-button'}
                        />
                        <Dropdown.Item
                           text='Travel Info'
                           value={'shareTravelInfo'}
                           onClick={onClickTravelInfo}
                           data-testid={'share-travelInfo-button'}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </Shares>
               <ProfileAndSignOut>
                  <Dropdown
                     closeOnEscape={true}
                     icon={
                        <UserProfile
                           src='https://www.logolynx.com/images/logolynx/b4/b4ef8b89b08d503b37f526bca624c19a.jpeg'
                           alt={'userImage'}
                        />
                     }
                  >
                     <Dropdown.Menu>
                        <Dropdown.Item
                           text='Edit Profile'
                           value={'editProfile'}
                           onClick={onClickUserProfile}
                           data-testid={'user-profile'}
                        />
                        <Dropdown.Item
                           text='Sign Out'
                           value={'signOut'}
                           onClick={onClickSignOut}
                           data-testid={'signout-button'}
                        />
                     </Dropdown.Menu>
                  </Dropdown>
               </ProfileAndSignOut>
            </RiderInfo>
         </HeaderStyle>
      )
   }
}
export { Header }
