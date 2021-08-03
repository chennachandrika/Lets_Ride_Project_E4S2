import styled from '@emotion/styled'
import colors from '../../../Common/Theme/Colors.json'
import {
   Typo32DarkBlueGreyRubikRegular,
   Typo14DarkBlueGreyHKGroteskRegular,
   Logo,
   LogoImageContainer
} from '../../styleGuides/StyleGuides.js'
const FormType = styled.form`
   width: 350px;
   height: 400px;
   border-radius: 8px;
   background-color: ${colors.white};
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: start;
   box-shadow: 0 4px 40px 0 rgba(23, 31, 70, 0.16);
   padding: 40px;
`
const FormDashBoard = styled.div`
   width: 100vw;
   height: 100vh;
   background-color: ${colors['ice blue']};
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   align-items: center;
   background-color: ${colors.Gray98};
`
const LogInPageLink = styled.a`
   color: ${colors.brightBlue};
`
const SignUpPageLink = styled.a`
   color: ${colors.brightBlue};
`
const LogInDetailsAlert = styled.span`
   color: ${colors.neonRed};
   width: 100%;
   text-align: center;
   font-size: 13px;
`
export {
   FormType,
   FormDashBoard,
   Typo32DarkBlueGreyRubikRegular as FormHeading,
   LogoImageContainer,
   Logo,
   Typo14DarkBlueGreyHKGroteskRegular as LoginLink,
   LogInPageLink,
   SignUpPageLink,
   LogInDetailsAlert
}
//536
//687
