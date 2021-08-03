import React from 'react'
import { inject, observer } from 'mobx-react'

import { withRouter } from 'react-router-dom'
import { withHeader } from '../../../Commute/Hocs/withHeader'

import strings from '../../i18n/strings.json'
import {
   UserImage,
   UserProfileDashboard,
   UserProfileView,
   NameEmailGender,
   JobDepartment,
   UserDetail,
   UserDetailElement
} from './styledComponents.js'
import { Label as UserDetailLabel } from '../../styleGuides/StyleGuides.js'

@inject('authStore')
@observer
class UserProfile extends React.Component {
   constructor() {
      super()
   }
   async doNetworkCalls() {
      const {
         authStore: { getUserProfileDetails }
      } = this.props
      await getUserProfileDetails()
   }
   componentDidMount() {
      this.doNetworkCalls()
   }
   render() {
      const {
         authStore: { getUserProfileDetailsResponse }
      } = this.props
      console.log(getUserProfileDetailsResponse)
      const userDetails = {
         name: 'Loharika',
         email: 'loharikapatnam74@gmail.com',
         gender: 'Female',
         jobRole: 'none',
         department: 'none'
      }
      return (
         <UserProfileDashboard>
            <UserProfileView>
               <UserImage
                  src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                  alt='user-profile'
               />
               <NameEmailGender>
                  <UserDetail>
                     <UserDetailLabel>{strings.name}:</UserDetailLabel>{' '}
                     <UserDetailElement
                        value={userDetails.name}
                        type='text'
                        onChange={() => {}}
                     />
                  </UserDetail>
                  <UserDetail>
                     <UserDetailLabel>{strings.email}:</UserDetailLabel>{' '}
                     <UserDetailElement
                        value={userDetails.email}
                        type='text'
                        onChange={() => {}}
                     />
                  </UserDetail>
                  <UserDetail>
                     <UserDetailLabel>{strings.gender}:</UserDetailLabel>{' '}
                     <UserDetailElement
                        value={userDetails.gender}
                        type='text'
                        onChange={() => {}}
                     />
                  </UserDetail>
               </NameEmailGender>
               <JobDepartment>
                  <UserDetail>
                     <UserDetailLabel>{strings.jobRole}:</UserDetailLabel>
                     <UserDetailElement
                        value={userDetails.jobRole}
                        type='text'
                        onChange={() => {}}
                     />
                  </UserDetail>
                  <UserDetail>
                     <UserDetailLabel>{strings.department}:</UserDetailLabel>{' '}
                     <UserDetailElement
                        value={userDetails.department}
                        type='text'
                        onChange={() => {}}
                     />
                  </UserDetail>
               </JobDepartment>
            </UserProfileView>
         </UserProfileDashboard>
      )
   }
}
export default withRouter(withHeader(UserProfile))
