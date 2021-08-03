import styled from '@emotion/styled'
import colors from '../../../Common/Theme/Colors'
import {
   Typo18BrightBlueRobotoRegular,
   Typo14SteelHKGroteSkRegular
} from '../../styleGuides/StyleGuides.js'
export const Requests = styled.div`
   padding: 5px;

   border-radius: 5px;
   margin: 5px;
`
export const Shares = styled.div`
   padding: 5px;

   border-radius: 5px;
   margin: 5px;
`
export const HeaderStyle = styled.div`
   width: 100%;
   position: -webkit-sticky;
   position: sticky;
   top: 0px;
   height: auto;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: ${colors.white};
   flex-wrap: wrap;
   z-index: 20;
   border-bottom: 2px solid ${colors.lightBlueGrey};
`
export const RiderInfo = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
`
export const UserProfileIconElement = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 50%;
   margin: 5px 30px;
`
export const LogoImageContainer = styled.div`
   margin: 5px 30px;
`
export {
   Typo18BrightBlueRobotoRegular as ButtonText,
   Typo14SteelHKGroteSkRegular as Request
}
export const SignOutButton = styled.button`
   padding: 5px 10px;
   color: white;
   background-color: ${colors.brightBlue};
   border-radius: 5px;
`
export const ProfileAndSignOut = styled.div`
   display: flex;
   justify-content: start;
   align-items: center;
   width: 100px;
   margin-top: -10px;
`
export const UserProfile = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 20px;
   align-self: center;
`
export const HomePage = styled.button`
   padding: 5px 10px;
   border-radius: 5px;
`
