import React from 'react'
import { UserProfileIconElement } from './styledComponents.js'

function UserProfileIcon(props) {
   const profileIcon =
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
   return (
      <UserProfileIconElement
         src={profileIcon}
         onClick={props.onClickUserProfile}
         alt='user-profile-icon'
      />
   )
}
export { UserProfileIcon }
